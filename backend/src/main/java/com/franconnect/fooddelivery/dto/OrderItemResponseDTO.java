package com.franconnect.fooddelivery.dto;

import java.math.BigDecimal;

/**
 * OrderItemResponseDTO
 * Represents an individual purchased dish in a completed or tracked order.
 */
public class OrderItemResponseDTO {

    private Long id;
    private Long foodId;
    private String foodName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;

    public OrderItemResponseDTO() {
    }

    public OrderItemResponseDTO(Long id, Long foodId, String foodName, Integer quantity,
                                BigDecimal unitPrice, BigDecimal totalPrice) {
        this.id = id;
        this.foodId = foodId;
        this.foodName = foodName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
