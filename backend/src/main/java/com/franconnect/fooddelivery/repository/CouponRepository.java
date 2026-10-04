package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * CouponRepository Interface
 * Provides database operations for the 'coupons' table.
 */
@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    // Find coupon by unique code (e.g. FIRST50, COUPON-10) ignoring uppercase/lowercase
    Optional<Coupon> findByCodeIgnoreCase(String code);

    // Check if a coupon code already exists
    boolean existsByCodeIgnoreCase(String code);
}
