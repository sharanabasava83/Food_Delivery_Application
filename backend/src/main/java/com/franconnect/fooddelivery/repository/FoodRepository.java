package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * FoodRepository Interface
 * Provides database operations for the 'foods' table.
 */
@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    // Requirement: View foods by category
    List<Food> findByCategoryId(Long categoryId);

    // Requirement: Search specific product by keyword
    List<Food> findByNameContainingIgnoreCase(String keyword);

    // Find foods by restaurant
    List<Food> findByRestaurantId(Long restaurantId);
}
