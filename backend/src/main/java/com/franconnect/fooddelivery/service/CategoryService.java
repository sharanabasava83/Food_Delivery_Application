package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.CategoryRequestDTO;
import com.franconnect.fooddelivery.dto.CategoryResponseDTO;

import java.util.List;

/**
 * CategoryService Interface
 * Defines business operations for Food Category management (OOP Abstraction).
 */
public interface CategoryService {

    CategoryResponseDTO createCategory(CategoryRequestDTO requestDTO);

    CategoryResponseDTO getCategoryById(Long id);

    List<CategoryResponseDTO> getAllCategories();

    CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO requestDTO);

    void deleteCategory(Long id);
}
