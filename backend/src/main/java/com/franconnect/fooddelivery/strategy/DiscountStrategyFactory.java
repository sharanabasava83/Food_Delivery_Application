package com.franconnect.fooddelivery.strategy;

import com.franconnect.fooddelivery.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * DiscountStrategyFactory
 * Factory that retrieves the appropriate DiscountStrategy based on couponType.
 */
@Component
public class DiscountStrategyFactory {

    private final Map<String, DiscountStrategy> strategies = new HashMap<>();

    @Autowired
    public DiscountStrategyFactory(List<DiscountStrategy> strategyList) {
        for (DiscountStrategy strategy : strategyList) {
            strategies.put(strategy.getSupportedCouponType().toUpperCase(), strategy);
        }
    }

    public DiscountStrategy getStrategy(String couponType) {
        if (couponType == null) {
            throw new BadRequestException("Coupon type cannot be null.");
        }
        DiscountStrategy strategy = strategies.get(couponType.toUpperCase());
        if (strategy == null) {
            throw new BadRequestException("Unsupported coupon type: " + couponType);
        }
        return strategy;
    }
}
