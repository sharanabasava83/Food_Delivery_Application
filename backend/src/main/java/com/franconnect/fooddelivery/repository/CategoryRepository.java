package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * CategoryRepository Interface
 * Provides database operations for the 'categories' table.
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Find category by name
    Optional<Category> findByNameIgnoreCase(String name);

    // Check if category name exists
    boolean existsByNameIgnoreCase(String name);
}
