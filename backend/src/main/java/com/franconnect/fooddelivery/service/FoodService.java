package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.FoodRequestDTO;
import com.franconnect.fooddelivery.dto.FoodResponseDTO;

import java.util.List;

/**
 * FoodService Interface
 * Defines operations for Food / Product catalog management (OOP Abstraction).
 * Fulfills requirements: view all products, view by category, search specific product.
 */
public interface FoodService {

    FoodResponseDTO createFood(FoodRequestDTO requestDTO);

    FoodResponseDTO getFoodById(Long id);

    List<FoodResponseDTO> getAllFoods();

    List<FoodResponseDTO> getFoodsByCategory(Long categoryId);

    List<FoodResponseDTO> getFoodsByRestaurant(Long restaurantId);

    List<FoodResponseDTO> searchFoods(String keyword);

    FoodResponseDTO updateFood(Long id, FoodRequestDTO requestDTO);

    void deleteFood(Long id);
}
