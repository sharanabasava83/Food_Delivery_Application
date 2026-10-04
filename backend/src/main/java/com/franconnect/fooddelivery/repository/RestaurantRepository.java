package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * RestaurantRepository Interface
 * Provides database operations for the 'restaurants' table.
 */
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    boolean existsByNameIgnoreCase(String name);

    List<Restaurant> findByNameContainingIgnoreCase(String keyword);

    List<Restaurant> findByAddressContainingIgnoreCase(String address);
}
