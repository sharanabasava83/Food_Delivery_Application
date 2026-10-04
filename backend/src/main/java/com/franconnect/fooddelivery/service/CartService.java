package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.AddToCartRequestDTO;
import com.franconnect.fooddelivery.dto.CartResponseDTO;

/**
 * CartService Interface
 * Defines shopping cart operations (OOP Abstraction).
 * Fulfills requirements: add food items to cart, view cart, adjust quantity, remove items.
 */
public interface CartService {

    CartResponseDTO getCartByCustomerId(Long customerId);

    CartResponseDTO addItemToCart(Long customerId, AddToCartRequestDTO requestDTO);

    CartResponseDTO updateItemQuantity(Long customerId, Long cartItemId, int newQuantity);

    CartResponseDTO removeItemFromCart(Long customerId, Long cartItemId);

    void clearCart(Long customerId);
}
