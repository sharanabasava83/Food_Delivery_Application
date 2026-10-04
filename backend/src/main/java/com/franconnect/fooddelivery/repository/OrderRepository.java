package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * OrderRepository Interface
 * Provides database operations for the 'orders' table.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Retrieve order history for a customer
    List<Order> findByCustomerId(Long customerId);

    // Find order by unique generated order number (e.g. ORD-123456)
    Optional<Order> findByOrderNumber(String orderNumber);

    // Count how many orders a customer has placed (used to validate FIRST50 coupon)
    long countByCustomerId(Long customerId);
}
