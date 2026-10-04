package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.OrderResponseDTO;
import com.franconnect.fooddelivery.dto.PlaceOrderRequestDTO;
import com.franconnect.fooddelivery.entity.*;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.repository.*;
import com.franconnect.fooddelivery.service.impl.OrderServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * OrderServiceTest
 * Unit tests verifying order checkout calculations, delivery fee thresholds,
 * snapshotting, and automatic cart flushing.
 */
@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private OrderItemRepository orderItemRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private CouponService couponService;

    @Mock
    private CartService cartService;

    @InjectMocks
    private OrderServiceImpl orderService;

    private Customer testCustomer;
    private Cart testCart;
    private Food testFood;
    private CartItem testCartItem;

    @BeforeEach
    void setUp() {
        testCustomer = new Customer("Deepa", "deepa@example.com", "9876543210", "Indiranagar, Bangalore");
        testCustomer.setId(1L);

        testCart = new Cart(testCustomer);
        testCart.setId(10L);

        testFood = new Food("Veg Biryani", "Spiced rice", new BigDecimal("300.00"), null, null);
        testFood.setId(100L);

        testCartItem = new CartItem(testCart, testFood, 2, new BigDecimal("300.00")); // Subtotal = 600 (Free delivery)
        testCartItem.setId(50L);
    }

    @Test
    @DisplayName("Place Order - Subtotal >= 500: Free Delivery Fee (0) and Clears Cart")
    void testPlaceOrder_FreeDelivery() {
        PlaceOrderRequestDTO request = new PlaceOrderRequestDTO(1L, "Indiranagar, Bangalore", null);

        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));
        when(cartRepository.findByCustomerId(1L)).thenReturn(Optional.of(testCart));
        when(cartItemRepository.findByCartId(10L)).thenReturn(List.of(testCartItem));

        Order savedOrder = new Order("ORD-12345", testCustomer, new BigDecimal("600.00"),
                BigDecimal.ZERO, BigDecimal.ZERO, new BigDecimal("600.00"), null, "CONFIRMED", "Indiranagar, Bangalore");
        savedOrder.setId(1L);
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(new OrderItem(savedOrder, testFood, 2, new BigDecimal("300.00"), new BigDecimal("600.00")));
        doNothing().when(cartService).clearCart(1L);

        OrderResponseDTO response = orderService.placeOrder(request);

        assertNotNull(response);
        assertEquals(new BigDecimal("600.00"), response.getSubtotal());
        assertEquals(BigDecimal.ZERO, response.getDeliveryFee());
        assertEquals(new BigDecimal("600.00"), response.getTotalAmount());
        assertEquals("CONFIRMED", response.getStatus());

        verify(cartService, times(1)).clearCart(1L);
    }

    @Test
    @DisplayName("Place Order - Subtotal < 500: Standard Delivery Fee (40)")
    void testPlaceOrder_StandardDeliveryFee() {
        // 1 item @ 300 -> subtotal = 300 (< 500)
        CartItem singleItem = new CartItem(testCart, testFood, 1, new BigDecimal("300.00"));
        PlaceOrderRequestDTO request = new PlaceOrderRequestDTO(1L, "Indiranagar, Bangalore", null);

        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));
        when(cartRepository.findByCustomerId(1L)).thenReturn(Optional.of(testCart));
        when(cartItemRepository.findByCartId(10L)).thenReturn(List.of(singleItem));

        Order savedOrder = new Order("ORD-12345", testCustomer, new BigDecimal("300.00"),
                BigDecimal.ZERO, new BigDecimal("40.00"), new BigDecimal("340.00"), null, "CONFIRMED", "Indiranagar, Bangalore");
        savedOrder.setId(1L);
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(new OrderItem(savedOrder, testFood, 1, new BigDecimal("300.00"), new BigDecimal("300.00")));
        doNothing().when(cartService).clearCart(1L);

        OrderResponseDTO response = orderService.placeOrder(request);

        assertNotNull(response);
        assertEquals(new BigDecimal("300.00"), response.getSubtotal());
        assertEquals(new BigDecimal("40.00"), response.getDeliveryFee());
        assertEquals(new BigDecimal("340.00"), response.getTotalAmount());

        verify(cartService, times(1)).clearCart(1L);
    }

    @Test
    @DisplayName("Place Order - Empty Cart: Throws BadRequestException")
    void testPlaceOrder_EmptyCart_ThrowsException() {
        PlaceOrderRequestDTO request = new PlaceOrderRequestDTO(1L, "Indiranagar, Bangalore", null);

        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));
        when(cartRepository.findByCustomerId(1L)).thenReturn(Optional.of(testCart));
        when(cartItemRepository.findByCartId(10L)).thenReturn(List.of());

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            orderService.placeOrder(request);
        });

        assertTrue(ex.getMessage().contains("empty cart"));
        verify(orderRepository, never()).save(any(Order.class));
        verify(cartService, never()).clearCart(anyLong());
    }

    @Test
    @DisplayName("Update Order Status - Success")
    void testUpdateOrderStatus_Success() {
        Order existingOrder = new Order("ORD-12345", testCustomer, new BigDecimal("600.00"),
                BigDecimal.ZERO, BigDecimal.ZERO, new BigDecimal("600.00"), null, "CONFIRMED", "Indiranagar");
        existingOrder.setId(1L);

        when(orderRepository.findById(1L)).thenReturn(Optional.of(existingOrder));
        when(orderRepository.save(any(Order.class))).thenReturn(existingOrder);
        when(orderItemRepository.findByOrderId(1L)).thenReturn(List.of());

        OrderResponseDTO response = orderService.updateOrderStatus(1L, "OUT_FOR_DELIVERY");

        assertNotNull(response);
        assertEquals("OUT_FOR_DELIVERY", response.getStatus());
    }
}
