package com.franconnect.fooddelivery.service.impl;

import com.franconnect.fooddelivery.dto.OrderItemResponseDTO;
import com.franconnect.fooddelivery.dto.OrderResponseDTO;
import com.franconnect.fooddelivery.dto.PlaceOrderRequestDTO;
import com.franconnect.fooddelivery.dto.CouponValidationResponseDTO;
import com.franconnect.fooddelivery.entity.*;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.*;
import com.franconnect.fooddelivery.service.CartService;
import com.franconnect.fooddelivery.service.CouponService;
import com.franconnect.fooddelivery.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * OrderServiceImpl
 * Coordinates checkout flow: cart valuation, coupon validation, order snapshotting, and cart clearing.
 */
@Service
public class OrderServiceImpl implements OrderService {

    private static final BigDecimal FREE_DELIVERY_THRESHOLD = new BigDecimal("500.00");
    private static final BigDecimal STANDARD_DELIVERY_FEE = new BigDecimal("40.00");

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CouponService couponService;
    private final CartService cartService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderItemRepository orderItemRepository,
                            CustomerRepository customerRepository,
                            CartRepository cartRepository,
                            CartItemRepository cartItemRepository,
                            CouponService couponService,
                            CartService cartService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.couponService = couponService;
        this.cartService = cartService;
    }

    @Override
    @Transactional
    public OrderResponseDTO placeOrder(PlaceOrderRequestDTO requestDTO) {
        // 1. Validate Customer
        Customer customer = customerRepository.findById(requestDTO.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + requestDTO.getCustomerId()));

        // 2. Validate Cart and Items
        Cart cart = cartRepository.findByCustomerId(customer.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for customer id: " + customer.getId()));

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cannot place order with an empty cart. Please add items first.");
        }

        // 3. Compute Subtotal
        BigDecimal subtotal = cartItems.stream()
                .map(item -> item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. Validate and Apply Coupon if provided
        BigDecimal discountAmount = BigDecimal.ZERO;
        String appliedCouponCode = null;

        if (requestDTO.getCouponCode() != null && !requestDTO.getCouponCode().trim().isEmpty()) {
            appliedCouponCode = requestDTO.getCouponCode().trim().toUpperCase();
            CouponValidationResponseDTO couponResult = couponService.validateAndApplyCoupon(appliedCouponCode, customer.getId());
            if (couponResult.isValid()) {
                discountAmount = couponResult.getDiscountAmount();
            }
        }

        // 5. Calculate Delivery Fee (Free above ₹500, else ₹40)
        BigDecimal deliveryFee = (subtotal.compareTo(FREE_DELIVERY_THRESHOLD) >= 0) ?
                BigDecimal.ZERO : STANDARD_DELIVERY_FEE;

        // 6. Compute Final Total
        BigDecimal totalAmount = subtotal.subtract(discountAmount).add(deliveryFee);
        if (totalAmount.compareTo(BigDecimal.ZERO) < 0) {
            totalAmount = BigDecimal.ZERO;
        }

        // 7. Generate Unique Order Number (e.g. ORD-1718000000000-542)
        String orderNumber = "ORD-" + System.currentTimeMillis() + "-" + (int)(Math.random() * 900 + 100);

        // 8. Create and Save Order
        Order order = new Order(
                orderNumber,
                customer,
                subtotal,
                discountAmount,
                deliveryFee,
                totalAmount,
                appliedCouponCode,
                "CONFIRMED",
                requestDTO.getShippingAddress().trim()
        );
        Order savedOrder = orderRepository.save(order);

        // 9. Snapshot Order Items from Cart Items
        List<OrderItem> savedOrderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            BigDecimal lineTotal = cartItem.getPricePerUnit().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            OrderItem orderItem = new OrderItem(
                    savedOrder,
                    cartItem.getFood(),
                    cartItem.getQuantity(),
                    cartItem.getPricePerUnit(),
                    lineTotal
            );
            savedOrderItems.add(orderItemRepository.save(orderItem));
        }

        // 10. Automatically Clear Customer Cart after order placement
        cartService.clearCart(customer.getId());

        // 11. Return Response DTO
        return mapToOrderResponseDTO(savedOrder, savedOrderItems);
    }

    @Override
    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
        return mapToOrderResponseDTO(order, items);
    }

    @Override
    public OrderResponseDTO getOrderByOrderNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with order number: " + orderNumber));
        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
        return mapToOrderResponseDTO(order, items);
    }

    @Override
    public List<OrderResponseDTO> getOrdersByCustomerId(Long customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new ResourceNotFoundException("Customer not found with id: " + customerId);
        }
        return orderRepository.findByCustomerId(customerId).stream()
                .map(order -> {
                    List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
                    return mapToOrderResponseDTO(order, items);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(order -> {
                    List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
                    return mapToOrderResponseDTO(order, items);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderResponseDTO updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (newStatus == null || newStatus.trim().isEmpty()) {
            throw new BadRequestException("Order status cannot be empty.");
        }

        order.setStatus(newStatus.trim().toUpperCase());
        Order updated = orderRepository.save(order);
        List<OrderItem> items = orderItemRepository.findByOrderId(updated.getId());
        return mapToOrderResponseDTO(updated, items);
    }

    // Helper mapper
    private OrderResponseDTO mapToOrderResponseDTO(Order order, List<OrderItem> items) {
        List<OrderItemResponseDTO> itemDTOs = items.stream()
                .map(item -> new OrderItemResponseDTO(
                        item.getId(),
                        item.getFood() != null ? item.getFood().getId() : null,
                        item.getFood() != null ? item.getFood().getName() : "Unknown Dish",
                        item.getQuantity(),
                        item.getUnitPrice(),
                        item.getTotalPrice()
                ))
                .collect(Collectors.toList());

        return new OrderResponseDTO(
                order.getId(),
                order.getOrderNumber(),
                order.getCustomer().getId(),
                order.getCustomer().getName(),
                order.getSubtotal(),
                order.getDiscountAmount(),
                order.getDeliveryFee(),
                order.getTotalAmount(),
                order.getCouponCode(),
                order.getStatus(),
                order.getShippingAddress(),
                itemDTOs
        );
    }
}
