package com.franconnect.fooddelivery.strategy;

import com.franconnect.fooddelivery.entity.CartItem;
import com.franconnect.fooddelivery.entity.Coupon;
import com.franconnect.fooddelivery.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * TotalAmountDiscountStrategy
 * Calculates discount on total cart amount (e.g. COUPON-10, COUPON-25, COUPON-30).
 */
@Component
public class TotalAmountDiscountStrategy implements DiscountStrategy {

    @Override
    public BigDecimal calculateDiscount(Coupon coupon, List<CartItem> cartItems, Long customerId) {
        // Calculate cart subtotal
        BigDecimal subtotal = cartItems.stream()
                .map(item -> item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (subtotal.compareTo(BigDecimal.ZERO) == 0) {
            throw new BadRequestException("Cannot apply coupon to an empty cart.");
        }

        // Validate minimum order amount
        if (coupon.getMinOrderAmount() != null && subtotal.compareTo(coupon.getMinOrderAmount()) < 0) {
            throw new BadRequestException("Minimum order value of ₹" + coupon.getMinOrderAmount() +
                    " required to use coupon '" + coupon.getCode() + "'. Current subtotal: ₹" + subtotal);
        }

        BigDecimal discount = BigDecimal.ZERO;

        // 1. Percentage-based calculation (e.g. 10%, 25%, 30%)
        if (coupon.getDiscountPercentage() != null && coupon.getDiscountPercentage().compareTo(BigDecimal.ZERO) > 0) {
            discount = subtotal.multiply(coupon.getDiscountPercentage())
                    .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        } else if (coupon.getDiscountAmount() != null && coupon.getDiscountAmount().compareTo(BigDecimal.ZERO) > 0) {
            // 2. Flat fixed amount discount
            discount = coupon.getDiscountAmount();
        }

        // Cap at max discount if configured
        if (coupon.getMaxDiscountAmount() != null && discount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
            discount = coupon.getMaxDiscountAmount();
        }

        // Discount cannot exceed subtotal
        if (discount.compareTo(subtotal) > 0) {
            discount = subtotal;
        }

        return discount;
    }

    @Override
    public String getSupportedCouponType() {
        return "TOTAL_AMOUNT";
    }
}
