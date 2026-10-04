package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * OrderItemRepository Interface
 * Provides database operations for the 'order_items' table.
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // Retrieve all line items for a given order
    List<OrderItem> findByOrderId(Long orderId);
}
