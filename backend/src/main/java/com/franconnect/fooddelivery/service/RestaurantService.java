package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.RestaurantRequestDTO;
import com.franconnect.fooddelivery.dto.RestaurantResponseDTO;

import java.util.List;

/**
 * RestaurantService Interface
 * Defines business operations for Restaurant partner management (OOP Abstraction).
 */
public interface RestaurantService {

    RestaurantResponseDTO createRestaurant(RestaurantRequestDTO requestDTO);

    RestaurantResponseDTO getRestaurantById(Long id);

    List<RestaurantResponseDTO> getAllRestaurants();

    RestaurantResponseDTO updateRestaurant(Long id, RestaurantRequestDTO requestDTO);

    void deleteRestaurant(Long id);

    List<RestaurantResponseDTO> searchRestaurants(String keyword);
}
