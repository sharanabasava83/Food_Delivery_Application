package com.franconnect.fooddelivery.controller;

import com.franconnect.fooddelivery.dto.CouponRequestDTO;
import com.franconnect.fooddelivery.dto.CouponResponseDTO;
import com.franconnect.fooddelivery.dto.CouponValidationResponseDTO;
import com.franconnect.fooddelivery.service.CouponService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CouponController
 * REST endpoints for managing discount coupons and validating them against active carts.
 */
@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "*")
public class CouponController {

    private final CouponService couponService;

    @Autowired
    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @PostMapping
    public ResponseEntity<CouponResponseDTO> createCoupon(@Valid @RequestBody CouponRequestDTO requestDTO) {
        CouponResponseDTO created = couponService.createCoupon(requestDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CouponResponseDTO> getCouponById(@PathVariable Long id) {
        CouponResponseDTO coupon = couponService.getCouponById(id);
        return ResponseEntity.ok(coupon);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<CouponResponseDTO> getCouponByCode(@PathVariable String code) {
        CouponResponseDTO coupon = couponService.getCouponByCode(code);
        return ResponseEntity.ok(coupon);
    }

    @GetMapping
    public ResponseEntity<List<CouponResponseDTO>> getAllCoupons() {
        List<CouponResponseDTO> coupons = couponService.getAllCoupons();
        return ResponseEntity.ok(coupons);
    }

    @PostMapping("/validate")
    public ResponseEntity<CouponValidationResponseDTO> validateAndApplyCoupon(@RequestParam String code,
                                                                              @RequestParam Long customerId) {
        CouponValidationResponseDTO result = couponService.validateAndApplyCoupon(code, customerId);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CouponResponseDTO> updateCoupon(@PathVariable Long id,
                                                          @Valid @RequestBody CouponRequestDTO requestDTO) {
        CouponResponseDTO updated = couponService.updateCoupon(id, requestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        couponService.deleteCoupon(id);
        return ResponseEntity.noContent().build();
    }
}
