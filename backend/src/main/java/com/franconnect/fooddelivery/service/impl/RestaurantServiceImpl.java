package com.franconnect.fooddelivery.service.impl;

import com.franconnect.fooddelivery.dto.RestaurantRequestDTO;
import com.franconnect.fooddelivery.dto.RestaurantResponseDTO;
import com.franconnect.fooddelivery.entity.Restaurant;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.RestaurantRepository;
import com.franconnect.fooddelivery.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * RestaurantServiceImpl
 * Implements business operations for onboarding, managing, and discovering restaurants.
 */
@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    @Transactional
    public RestaurantResponseDTO createRestaurant(RestaurantRequestDTO requestDTO) {
        // Business Rule: Restaurant name must be unique (case-insensitive)
        if (restaurantRepository.existsByNameIgnoreCase(requestDTO.getName().trim())) {
            throw new BadRequestException("Restaurant with name '" + requestDTO.getName().trim() + "' already exists.");
        }

        Restaurant restaurant = new Restaurant();
        restaurant.setName(requestDTO.getName().trim());
        restaurant.setDescription(requestDTO.getDescription());
        restaurant.setAddress(requestDTO.getAddress().trim());
        restaurant.setPhone(requestDTO.getPhone().trim());

        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return mapToResponseDTO(savedRestaurant);
    }

    @Override
    public RestaurantResponseDTO getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
        return mapToResponseDTO(restaurant);
    }

    @Override
    public List<RestaurantResponseDTO> getAllRestaurants() {
        return restaurantRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RestaurantResponseDTO updateRestaurant(Long id, RestaurantRequestDTO requestDTO) {
        Restaurant existingRestaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        String trimmedName = requestDTO.getName().trim();
        // If name is changing, ensure new name is not already taken
        if (!existingRestaurant.getName().equalsIgnoreCase(trimmedName) &&
                restaurantRepository.existsByNameIgnoreCase(trimmedName)) {
            throw new BadRequestException("Restaurant with name '" + trimmedName + "' already exists.");
        }

        existingRestaurant.setName(trimmedName);
        existingRestaurant.setDescription(requestDTO.getDescription());
        existingRestaurant.setAddress(requestDTO.getAddress().trim());
        existingRestaurant.setPhone(requestDTO.getPhone().trim());

        Restaurant updatedRestaurant = restaurantRepository.save(existingRestaurant);
        return mapToResponseDTO(updatedRestaurant);
    }

    @Override
    @Transactional
    public void deleteRestaurant(Long id) {
        if (!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Restaurant not found with id: " + id);
        }
        restaurantRepository.deleteById(id);
    }

    @Override
    public List<RestaurantResponseDTO> searchRestaurants(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllRestaurants();
        }
        String trimmed = keyword.trim();
        List<Restaurant> results = restaurantRepository.findByNameContainingIgnoreCase(trimmed);
        if (results.isEmpty()) {
            results = restaurantRepository.findByAddressContainingIgnoreCase(trimmed);
        }
        return results.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // Mapper helper
    private RestaurantResponseDTO mapToResponseDTO(Restaurant restaurant) {
        return new RestaurantResponseDTO(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getAddress(),
                restaurant.getPhone()
        );
    }
}
