package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * CartItemRepository Interface
 * Provides database operations for the 'cart_items' table.
 */
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // Get all items in a specific cart
    List<CartItem> findByCartId(Long cartId);

    // Find if a specific food already exists in the customer's cart
    Optional<CartItem> findByCartIdAndFoodId(Long cartId, Long foodId);

    // Clear all items in a cart (used after order checkout)
    void deleteByCartId(Long cartId);
}
