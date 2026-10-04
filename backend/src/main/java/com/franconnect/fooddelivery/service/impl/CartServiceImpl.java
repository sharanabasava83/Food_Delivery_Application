package com.franconnect.fooddelivery.service.impl;

import com.franconnect.fooddelivery.dto.AddToCartRequestDTO;
import com.franconnect.fooddelivery.dto.CartItemResponseDTO;
import com.franconnect.fooddelivery.dto.CartResponseDTO;
import com.franconnect.fooddelivery.entity.Cart;
import com.franconnect.fooddelivery.entity.CartItem;
import com.franconnect.fooddelivery.entity.Customer;
import com.franconnect.fooddelivery.entity.Food;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.CartItemRepository;
import com.franconnect.fooddelivery.repository.CartRepository;
import com.franconnect.fooddelivery.repository.CustomerRepository;
import com.franconnect.fooddelivery.repository.FoodRepository;
import com.franconnect.fooddelivery.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * CartServiceImpl
 * Manages customer shopping cart state, quantity updates, and subtotal calculations.
 */
@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final CustomerRepository customerRepository;
    private final FoodRepository foodRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository,
                           CartItemRepository cartItemRepository,
                           CustomerRepository customerRepository,
                           FoodRepository foodRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.customerRepository = customerRepository;
        this.foodRepository = foodRepository;
    }

    @Override
    @Transactional
    public CartResponseDTO getCartByCustomerId(Long customerId) {
        Cart cart = getOrCreateCart(customerId);
        return buildCartResponse(cart);
    }

    @Override
    @Transactional
    public CartResponseDTO addItemToCart(Long customerId, AddToCartRequestDTO requestDTO) {
        if (requestDTO.getQuantity() == null || requestDTO.getQuantity() <= 0) {
            throw new BadRequestException("Quantity must be greater than zero.");
        }

        Cart cart = getOrCreateCart(customerId);

        Food food = foodRepository.findById(requestDTO.getFoodId())
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + requestDTO.getFoodId()));

        Optional<CartItem> existingItemOpt = cartItemRepository.findByCartIdAndFoodId(cart.getId(), food.getId());

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + requestDTO.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem(
                    cart,
                    food,
                    requestDTO.getQuantity(),
                    food.getPrice()
            );
            cartItemRepository.save(newItem);
        }

        return buildCartResponse(cart);
    }

    @Override
    @Transactional
    public CartResponseDTO updateItemQuantity(Long customerId, Long cartItemId, int newQuantity) {
        Cart cart = getOrCreateCart(customerId);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        // Security check: item must belong to customer's active cart
        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Item does not belong to your cart.");
        }

        if (newQuantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(newQuantity);
            cartItemRepository.save(item);
        }

        return buildCartResponse(cart);
    }

    @Override
    @Transactional
    public CartResponseDTO removeItemFromCart(Long customerId, Long cartItemId) {
        Cart cart = getOrCreateCart(customerId);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Item does not belong to your cart.");
        }

        cartItemRepository.delete(item);
        return buildCartResponse(cart);
    }

    @Override
    @Transactional
    public void clearCart(Long customerId) {
        Cart cart = getOrCreateCart(customerId);
        cartItemRepository.deleteByCartId(cart.getId());
    }

    // --- Helper Methods ---

    private Cart getOrCreateCart(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));

        return cartRepository.findByCustomerId(customerId)
                .orElseGet(() -> cartRepository.save(new Cart(customer)));
    }

    private CartResponseDTO buildCartResponse(Cart cart) {
        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());

        List<CartItemResponseDTO> itemDTOs = items.stream()
                .map(this::mapToItemDTO)
                .collect(Collectors.toList());

        int totalCount = items.stream().mapToInt(CartItem::getQuantity).sum();

        BigDecimal subtotal = items.stream()
                .map(item -> item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartResponseDTO(
                cart.getId(),
                cart.getCustomer().getId(),
                cart.getCustomer().getName(),
                itemDTOs,
                totalCount,
                subtotal
        );
    }

    private CartItemResponseDTO mapToItemDTO(CartItem item) {
        BigDecimal total = item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity()));
        Food food = item.getFood();

        return new CartItemResponseDTO(
                item.getId(),
                food.getId(),
                food.getName(),
                item.getPricePerUnit(),
                item.getQuantity(),
                total,
                food.getCategory() != null ? food.getCategory().getId() : null,
                food.getCategory() != null ? food.getCategory().getName() : null,
                food.getRestaurant() != null ? food.getRestaurant().getId() : null,
                food.getRestaurant() != null ? food.getRestaurant().getName() : null
        );
    }
}
