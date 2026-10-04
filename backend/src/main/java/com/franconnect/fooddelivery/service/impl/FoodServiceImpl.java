package com.franconnect.fooddelivery.service.impl;

import com.franconnect.fooddelivery.dto.FoodRequestDTO;
import com.franconnect.fooddelivery.dto.FoodResponseDTO;
import com.franconnect.fooddelivery.entity.Category;
import com.franconnect.fooddelivery.entity.Food;
import com.franconnect.fooddelivery.entity.Restaurant;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.CategoryRepository;
import com.franconnect.fooddelivery.repository.FoodRepository;
import com.franconnect.fooddelivery.repository.RestaurantRepository;
import com.franconnect.fooddelivery.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * FoodServiceImpl
 * Implements food catalog business operations, category filtering, and product search.
 */
@Service
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;
    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;

    @Autowired
    public FoodServiceImpl(FoodRepository foodRepository,
                           CategoryRepository categoryRepository,
                           RestaurantRepository restaurantRepository) {
        this.foodRepository = foodRepository;
        this.categoryRepository = categoryRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    @Transactional
    public FoodResponseDTO createFood(FoodRequestDTO requestDTO) {
        // Validate Category exists
        Category category = categoryRepository.findById(requestDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + requestDTO.getCategoryId()));

        // Validate Restaurant exists if provided
        Restaurant restaurant = null;
        if (requestDTO.getRestaurantId() != null) {
            restaurant = restaurantRepository.findById(requestDTO.getRestaurantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + requestDTO.getRestaurantId()));
        }

        Food food = new Food();
        food.setName(requestDTO.getName().trim());
        food.setDescription(requestDTO.getDescription());
        food.setPrice(requestDTO.getPrice());
        food.setCategory(category);
        food.setRestaurant(restaurant);

        Food savedFood = foodRepository.save(food);
        return mapToResponseDTO(savedFood);
    }

    @Override
    public FoodResponseDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + id));
        return mapToResponseDTO(food);
    }

    @Override
    public List<FoodResponseDTO> getAllFoods() {
        return foodRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FoodResponseDTO> getFoodsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }
        return foodRepository.findByCategoryId(categoryId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FoodResponseDTO> getFoodsByRestaurant(Long restaurantId) {
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResourceNotFoundException("Restaurant not found with id: " + restaurantId);
        }
        return foodRepository.findByRestaurantId(restaurantId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<FoodResponseDTO> searchFoods(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllFoods();
        }
        return foodRepository.findByNameContainingIgnoreCase(keyword.trim()).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FoodResponseDTO updateFood(Long id, FoodRequestDTO requestDTO) {
        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + id));

        // Validate Category
        Category category = categoryRepository.findById(requestDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + requestDTO.getCategoryId()));

        // Validate Restaurant if provided
        Restaurant restaurant = null;
        if (requestDTO.getRestaurantId() != null) {
            restaurant = restaurantRepository.findById(requestDTO.getRestaurantId())
                    .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + requestDTO.getRestaurantId()));
        }

        existingFood.setName(requestDTO.getName().trim());
        existingFood.setDescription(requestDTO.getDescription());
        existingFood.setPrice(requestDTO.getPrice());
        existingFood.setCategory(category);
        existingFood.setRestaurant(restaurant);

        Food updatedFood = foodRepository.save(existingFood);
        return mapToResponseDTO(updatedFood);
    }

    @Override
    @Transactional
    public void deleteFood(Long id) {
        if (!foodRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Food item not found with id: " + id);
        }
        foodRepository.deleteById(id);
    }

    // Helper mapper
    private FoodResponseDTO mapToResponseDTO(Food food) {
        return new FoodResponseDTO(
                food.getId(),
                food.getName(),
                food.getDescription(),
                food.getPrice(),
                food.getCategory() != null ? food.getCategory().getId() : null,
                food.getCategory() != null ? food.getCategory().getName() : null,
                food.getRestaurant() != null ? food.getRestaurant().getId() : null,
                food.getRestaurant() != null ? food.getRestaurant().getName() : null
        );
    }
}
