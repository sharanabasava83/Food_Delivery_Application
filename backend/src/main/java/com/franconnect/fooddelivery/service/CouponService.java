package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.CouponRequestDTO;
import com.franconnect.fooddelivery.dto.CouponResponseDTO;
import com.franconnect.fooddelivery.dto.CouponValidationResponseDTO;

import java.util.List;

/**
 * CouponService Interface
 * Defines operations for Coupon management and discount validation (OOP Abstraction).
 */
public interface CouponService {

    CouponResponseDTO createCoupon(CouponRequestDTO requestDTO);

    CouponResponseDTO getCouponById(Long id);

    CouponResponseDTO getCouponByCode(String code);

    List<CouponResponseDTO> getAllCoupons();

    CouponResponseDTO updateCoupon(Long id, CouponRequestDTO requestDTO);

    void deleteCoupon(Long id);

    CouponValidationResponseDTO validateAndApplyCoupon(String couponCode, Long customerId);
}
