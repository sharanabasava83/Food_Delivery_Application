package com.franconnect.fooddelivery.strategy;

import com.franconnect.fooddelivery.entity.CartItem;
import com.franconnect.fooddelivery.entity.Coupon;

import java.math.BigDecimal;
import java.util.List;

/**
 * DiscountStrategy Interface (GoF Strategy Pattern)
 * Encapsulates family of discount algorithms (First Order, Category Discount, Total Amount).
 */
public interface DiscountStrategy {

    BigDecimal calculateDiscount(Coupon coupon, List<CartItem> cartItems, Long customerId);

    String getSupportedCouponType();
}
