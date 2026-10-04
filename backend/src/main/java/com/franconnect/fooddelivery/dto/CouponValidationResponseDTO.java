package com.franconnect.fooddelivery.dto;

import java.math.BigDecimal;

/**
 * CouponValidationResponseDTO
 * Returns the status and calculated savings when a customer applies a coupon at checkout.
 */
public class CouponValidationResponseDTO {

    private String code;
    private boolean valid;
    private BigDecimal discountAmount;
    private BigDecimal subtotal;
    private BigDecimal newTotal;
    private String message;

    public CouponValidationResponseDTO() {
    }

    public CouponValidationResponseDTO(String code, boolean valid, BigDecimal discountAmount,
                                       BigDecimal subtotal, BigDecimal newTotal, String message) {
        this.code = code;
        this.valid = valid;
        this.discountAmount = discountAmount;
        this.subtotal = subtotal;
        this.newTotal = newTotal;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getNewTotal() {
        return newTotal;
    }

    public void setNewTotal(BigDecimal newTotal) {
        this.newTotal = newTotal;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
