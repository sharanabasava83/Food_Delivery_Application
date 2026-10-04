package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * CartRepository Interface
 * Provides database operations for the 'carts' table.
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    // Find shopping cart associated with a specific customer
    Optional<Cart> findByCustomerId(Long customerId);
}
