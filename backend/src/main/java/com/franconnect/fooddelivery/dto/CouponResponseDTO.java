package com.franconnect.fooddelivery.dto;

import java.math.BigDecimal;

/**
 * CouponResponseDTO
 * Represents outgoing coupon details returned to clients.
 */
public class CouponResponseDTO {

    private Long id;
    private String code;
    private String description;
    private String couponType;
    private BigDecimal discountPercentage;
    private BigDecimal discountAmount;
    private Long categoryId;
    private String categoryName;
    private BigDecimal minOrderAmount;
    private BigDecimal maxDiscountAmount;

    public CouponResponseDTO() {
    }

    public CouponResponseDTO(Long id, String code, String description, String couponType,
                             BigDecimal discountPercentage, BigDecimal discountAmount,
                             Long categoryId, String categoryName,
                             BigDecimal minOrderAmount, BigDecimal maxDiscountAmount) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.couponType = couponType;
        this.discountPercentage = discountPercentage;
        this.discountAmount = discountAmount;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.minOrderAmount = minOrderAmount;
        this.maxDiscountAmount = maxDiscountAmount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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
