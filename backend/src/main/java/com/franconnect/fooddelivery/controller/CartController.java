package com.franconnect.fooddelivery.controller;

import com.franconnect.fooddelivery.dto.AddToCartRequestDTO;
import com.franconnect.fooddelivery.dto.CartResponseDTO;
import com.franconnect.fooddelivery.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * CartController
 * REST endpoints for managing the customer's active shopping cart and quantities.
 */
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CartResponseDTO> getCartByCustomerId(@PathVariable Long customerId) {
        CartResponseDTO cart = cartService.getCartByCustomerId(customerId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{customerId}/items")
    public ResponseEntity<CartResponseDTO> addItemToCart(@PathVariable Long customerId,
                                                         @Valid @RequestBody AddToCartRequestDTO requestDTO) {
        CartResponseDTO cart = cartService.addItemToCart(customerId, requestDTO);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/{customerId}/items/{cartItemId}")
    public ResponseEntity<CartResponseDTO> updateItemQuantity(@PathVariable Long customerId,
                                                              @PathVariable Long cartItemId,
                                                              @RequestParam int quantity) {
        CartResponseDTO cart = cartService.updateItemQuantity(customerId, cartItemId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{customerId}/items/{cartItemId}")
    public ResponseEntity<CartResponseDTO> removeItemFromCart(@PathVariable Long customerId,
                                                              @PathVariable Long cartItemId) {
        CartResponseDTO cart = cartService.removeItemFromCart(customerId, cartItemId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long customerId) {
        cartService.clearCart(customerId);
        return ResponseEntity.noContent().build();
    }
}
