package com.franconnect.fooddelivery.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * AddToCartRequestDTO
 * Incoming payload when adding an item to the shopping cart.
 */
public class AddToCartRequestDTO {

    @NotNull(message = "Food ID is required")
    private Long foodId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity = 1;

    public AddToCartRequestDTO() {
    }

    public AddToCartRequestDTO(Long foodId, Integer quantity) {
        this.foodId = foodId;
        this.quantity = quantity;
    }

    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
