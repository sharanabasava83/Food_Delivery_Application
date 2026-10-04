package com.franconnect.fooddelivery.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * Coupon Entity
 * Represents the 'coupons' table in our database.
 * 
 * Supports coupon types:
 * - FIRST_ORDER: 50% discount on first order
 * - CATEGORY_DISCOUNT: Discount on foods in a specific category (Max 50%)
 * - TOTAL_AMOUNT: Discount on order subtotal (e.g. Coupon-10, Coupon-25, Coupon-30)
 */
@Entity
@Table(name = "coupons")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(length = 255)
    private String description;

    @Column(name = "coupon_type", nullable = false, length = 50)
    private String couponType;

    @Column(name = "discount_percentage", precision = 5, scale = 2)
    private BigDecimal discountPercentage;

    @Column(name = "discount_amount", precision = 10, scale = 2)
    private BigDecimal discountAmount;

    // Optional category link for category-specific discounts
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "min_order_amount", precision = 10, scale = 2)
    private BigDecimal minOrderAmount;

    @Column(name = "max_discount_amount", precision = 10, scale = 2)
    private BigDecimal maxDiscountAmount;

    // Default No-Args Constructor
    public Coupon() {
    }

    // Parameterized Constructor
    public Coupon(String code, String description, String couponType, BigDecimal discountPercentage,
                  BigDecimal discountAmount, Category category, BigDecimal minOrderAmount, BigDecimal maxDiscountAmount) {
        this.code = code;
        this.description = description;
        this.couponType = couponType;
        this.discountPercentage = discountPercentage;
        this.discountAmount = discountAmount;
        this.category = category;
        this.minOrderAmount = minOrderAmount;
        this.maxDiscountAmount = maxDiscountAmount;
    }

    // Getters and Setters (Encapsulation)
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
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

    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", couponType='" + couponType + '\'' +
                ", discountPercentage=" + discountPercentage +
                ", discountAmount=" + discountAmount +
                ", minOrderAmount=" + minOrderAmount +
                ", maxDiscountAmount=" + maxDiscountAmount +
                '}';
    }
}
