package com.franconnect.fooddelivery.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

/**
 * CouponRequestDTO
 * Represents incoming payload when creating or updating a coupon.
 */
public class CouponRequestDTO {

    @NotBlank(message = "Coupon code is required")
    @Size(min = 2, max = 50, message = "Coupon code must be between 2 and 50 characters")
    private String code;

    @Size(max = 255, message = "Description cannot exceed 255 characters")
    private String description;

    @NotBlank(message = "Coupon type is required (e.g. FIRST_ORDER, CATEGORY_DISCOUNT, TOTAL_AMOUNT)")
    private String couponType;

    @DecimalMin(value = "0.00", message = "Discount percentage cannot be negative")
    @DecimalMax(value = "100.00", message = "Discount percentage cannot exceed 100%")
    private BigDecimal discountPercentage;

    @DecimalMin(value = "0.00", message = "Discount amount cannot be negative")
    private BigDecimal discountAmount;

    private Long categoryId;

    @DecimalMin(value = "0.00", message = "Minimum order amount cannot be negative")
    private BigDecimal minOrderAmount;

    @DecimalMin(value = "0.00", message = "Maximum discount amount cannot be negative")
    private BigDecimal maxDiscountAmount;

    public CouponRequestDTO() {
    }

    public CouponRequestDTO(String code, String description, String couponType,
                            BigDecimal discountPercentage, BigDecimal discountAmount,
                            Long categoryId, BigDecimal minOrderAmount, BigDecimal maxDiscountAmount) {
        this.code = code;
        this.description = description;
        this.couponType = couponType;
        this.discountPercentage = discountPercentage;
        this.discountAmount = discountAmount;
        this.categoryId = categoryId;
        this.minOrderAmount = minOrderAmount;
        this.maxDiscountAmount = maxDiscountAmount;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCouponType() {
        return couponType;
    }

    public void setCouponType(String couponType) {
        this.couponType = couponType;
    }

    public BigDecimal getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(BigDecimal discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public BigDecimal getMinOrderAmount() {
        return minOrderAmount;
    }

    public void setMinOrderAmount(BigDecimal minOrderAmount) {
        this.minOrderAmount = minOrderAmount;
    }

    public BigDecimal getMaxDiscountAmount() {
        return maxDiscountAmount;
    }

    public void setMaxDiscountAmount(BigDecimal maxDiscountAmount) {
        this.maxDiscountAmount = maxDiscountAmount;
    }
}
