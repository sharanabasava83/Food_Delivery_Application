package com.franconnect.fooddelivery.service.impl;

import com.franconnect.fooddelivery.dto.CategoryRequestDTO;
import com.franconnect.fooddelivery.dto.CategoryResponseDTO;
import com.franconnect.fooddelivery.entity.Category;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.CategoryRepository;
import com.franconnect.fooddelivery.repository.FoodRepository;
import com.franconnect.fooddelivery.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * CategoryServiceImpl
 * Implements category business operations and validation.
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FoodRepository foodRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, FoodRepository foodRepository) {
        this.categoryRepository = categoryRepository;
        this.foodRepository = foodRepository;
    }

    @Override
    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO requestDTO) {
        String trimmedName = requestDTO.getName().trim();

        // Business Rule: Category name must be unique (case-insensitive)
        if (categoryRepository.existsByNameIgnoreCase(trimmedName)) {
            throw new BadRequestException("Category with name '" + trimmedName + "' already exists.");
        }

        Category category = new Category();
        category.setName(trimmedName);
        category.setDescription(requestDTO.getDescription());

        Category savedCategory = categoryRepository.save(category);
        return mapToResponseDTO(savedCategory);
    }

    @Override
    public CategoryResponseDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return mapToResponseDTO(category);
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO requestDTO) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        String trimmedName = requestDTO.getName().trim();
        // If name is changing, ensure uniqueness
        if (!existingCategory.getName().equalsIgnoreCase(trimmedName) &&
                categoryRepository.existsByNameIgnoreCase(trimmedName)) {
            throw new BadRequestException("Category with name '" + trimmedName + "' already exists.");
        }

        existingCategory.setName(trimmedName);
        existingCategory.setDescription(requestDTO.getDescription());

        Category updatedCategory = categoryRepository.save(existingCategory);
        return mapToResponseDTO(updatedCategory);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot delete. Category not found with id: " + id));

        // Business Rule: Cannot delete category if food items are linked to it
        if (!foodRepository.findByCategoryId(id).isEmpty()) {
            throw new BadRequestException("Cannot delete category '" + category.getName() + "' because food items are associated with it.");
        }

        categoryRepository.delete(category);
    }

    private CategoryResponseDTO mapToResponseDTO(Category category) {
        return new CategoryResponseDTO(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }
}
