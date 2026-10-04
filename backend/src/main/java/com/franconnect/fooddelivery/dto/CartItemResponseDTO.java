package com.franconnect.fooddelivery.dto;

import java.math.BigDecimal;

/**
 * CartItemResponseDTO
 * Represents an individual food line item in the shopping cart.
 */
public class CartItemResponseDTO {

    private Long id;
    private Long foodId;
    private String foodName;
    private BigDecimal pricePerUnit;
    private Integer quantity;
    private BigDecimal itemTotal;
    private Long categoryId;
    private String categoryName;
    private Long restaurantId;
    private String restaurantName;

    public CartItemResponseDTO() {
    }

    public CartItemResponseDTO(Long id, Long foodId, String foodName, BigDecimal pricePerUnit,
                               Integer quantity, BigDecimal itemTotal,
                               Long categoryId, String categoryName,
                               Long restaurantId, String restaurantName) {
        this.id = id;
        this.foodId = foodId;
        this.foodName = foodName;
        this.pricePerUnit = pricePerUnit;
        this.quantity = quantity;
        this.itemTotal = itemTotal;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getItemTotal() {
        return itemTotal;
    }

    public void setItemTotal(BigDecimal itemTotal) {
        this.itemTotal = itemTotal;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
}
