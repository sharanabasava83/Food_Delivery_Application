package com.franconnect.fooddelivery.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * PlaceOrderRequestDTO
 * Incoming request payload when a customer checks out and places an order.
 */
public class PlaceOrderRequestDTO {

    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @NotBlank(message = "Shipping address is required")
    @Size(max = 255, message = "Shipping address cannot exceed 255 characters")
    private String shippingAddress;

    private String couponCode;

    public PlaceOrderRequestDTO() {
    }

    public PlaceOrderRequestDTO(Long customerId, String shippingAddress, String couponCode) {
        this.customerId = customerId;
        this.shippingAddress = shippingAddress;
        this.couponCode = couponCode;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }
}
