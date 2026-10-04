package com.franconnect.fooddelivery.controller;

import com.franconnect.fooddelivery.dto.FoodRequestDTO;
import com.franconnect.fooddelivery.dto.FoodResponseDTO;
import com.franconnect.fooddelivery.service.FoodService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * FoodController
 * REST endpoints for dish/menu CRUD operations, category filtering, and product search.
 */
@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping
    public ResponseEntity<FoodResponseDTO> createFood(@Valid @RequestBody FoodRequestDTO requestDTO) {
        FoodResponseDTO created = foodService.createFood(requestDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodResponseDTO> getFoodById(@PathVariable Long id) {
        FoodResponseDTO food = foodService.getFoodById(id);
        return ResponseEntity.ok(food);
    }

    @GetMapping
    public ResponseEntity<List<FoodResponseDTO>> getAllFoods() {
        List<FoodResponseDTO> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<FoodResponseDTO>> getFoodsByCategory(@PathVariable Long categoryId) {
        List<FoodResponseDTO> foods = foodService.getFoodsByCategory(categoryId);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodResponseDTO>> getFoodsByRestaurant(@PathVariable Long restaurantId) {
        List<FoodResponseDTO> foods = foodService.getFoodsByRestaurant(restaurantId);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoodResponseDTO>> searchFoods(@RequestParam(required = false) String keyword) {
        List<FoodResponseDTO> foods = foodService.searchFoods(keyword);
        return ResponseEntity.ok(foods);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodResponseDTO> updateFood(@PathVariable Long id,
                                                      @Valid @RequestBody FoodRequestDTO requestDTO) {
        FoodResponseDTO updated = foodService.updateFood(id, requestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
