package com.franconnect.fooddelivery.strategy;

import com.franconnect.fooddelivery.entity.CartItem;
import com.franconnect.fooddelivery.entity.Coupon;
import com.franconnect.fooddelivery.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * CategoryDiscountStrategy
 * Calculates discounts exclusively on foods within a specific category.
 * Strictly enforces that no category discount may exceed 50%.
 */
@Component
public class CategoryDiscountStrategy implements DiscountStrategy {

    private static final BigDecimal MAX_CATEGORY_DISCOUNT_PERCENT = new BigDecimal("50.00");

    @Override
    public BigDecimal calculateDiscount(Coupon coupon, List<CartItem> cartItems, Long customerId) {
        if (coupon.getCategory() == null) {
            throw new BadRequestException("Coupon configuration error: No category associated with this coupon.");
        }

        Long targetCategoryId = coupon.getCategory().getId();

        // Calculate subtotal of ONLY items belonging to the target category
        BigDecimal eligibleSubtotal = cartItems.stream()
                .filter(item -> item.getFood() != null &&
                        item.getFood().getCategory() != null &&
                        item.getFood().getCategory().getId().equals(targetCategoryId))
                .map(item -> item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (eligibleSubtotal.compareTo(BigDecimal.ZERO) == 0) {
            throw new BadRequestException("Coupon '" + coupon.getCode() + "' is only valid for items in category: "
                    + coupon.getCategory().getName());
        }

        // Enforce the rule: No category discount can be more than 50%
        BigDecimal discountPercent = coupon.getDiscountPercentage() != null ?
                coupon.getDiscountPercentage() : BigDecimal.ZERO;

        if (discountPercent.compareTo(MAX_CATEGORY_DISCOUNT_PERCENT) > 0) {
            throw new BadRequestException("Category discount cannot exceed 50%. Configured: " + discountPercent + "%");
        }

        BigDecimal discount = eligibleSubtotal.multiply(discountPercent)
                .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);

        // Cap at max discount if configured
        if (coupon.getMaxDiscountAmount() != null && discount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
            discount = coupon.getMaxDiscountAmount();
        }

        return discount;
    }

    @Override
    public String getSupportedCouponType() {
        return "CATEGORY_DISCOUNT";
    }
}
