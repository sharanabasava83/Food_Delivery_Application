package com.franconnect.fooddelivery.strategy;

import com.franconnect.fooddelivery.entity.CartItem;
import com.franconnect.fooddelivery.entity.Coupon;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * FirstOrderDiscountStrategy
 * Implements First Order discount logic (Flat 50%).
 * Strictly validates that the customer has never placed a prior order.
 */
@Component
public class FirstOrderDiscountStrategy implements DiscountStrategy {

    private final OrderRepository orderRepository;

    @Autowired
    public FirstOrderDiscountStrategy(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public BigDecimal calculateDiscount(Coupon coupon, List<CartItem> cartItems, Long customerId) {
        if (customerId == null) {
            throw new BadRequestException("Customer ID is required to validate first order coupon.");
        }

        // Rule: Only customers with 0 orders qualify
        long previousOrders = orderRepository.countByCustomerId(customerId);
        if (previousOrders > 0) {
            throw new BadRequestException("Coupon '" + coupon.getCode() + "' is valid only for your first order.");
        }

        // Calculate cart subtotal
        BigDecimal subtotal = cartItems.stream()
                .map(item -> item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (coupon.getMinOrderAmount() != null && subtotal.compareTo(coupon.getMinOrderAmount()) < 0) {
            throw new BadRequestException("Minimum order amount of ₹" + coupon.getMinOrderAmount() + " required for this coupon.");
        }

        // Default to 50% flat discount if not specified
        BigDecimal percentage = coupon.getDiscountPercentage() != null ?
                coupon.getDiscountPercentage() : new BigDecimal("50.00");

        BigDecimal discount = subtotal.multiply(percentage)
                .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);

        // Cap discount if maxDiscountAmount configured
        if (coupon.getMaxDiscountAmount() != null && discount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
            discount = coupon.getMaxDiscountAmount();
        }

        return discount;
    }

    @Override
    public String getSupportedCouponType() {
        return "FIRST_ORDER";
    }
}
