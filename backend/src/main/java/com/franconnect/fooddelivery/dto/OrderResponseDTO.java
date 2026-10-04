package com.franconnect.fooddelivery.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * OrderResponseDTO
 * Complete order response returning orderNumber, breakdown totals, coupon savings, and line items.
 */
public class OrderResponseDTO {

    private Long id;
    private String orderNumber;
    private Long customerId;
    private String customerName;
    private BigDecimal subtotal;
    private BigDecimal discountAmount;
    private BigDecimal deliveryFee;
    private BigDecimal totalAmount;
    private String couponCode;
    private String status;
    private String shippingAddress;
    private List<OrderItemResponseDTO> items;

    public OrderResponseDTO() {
    }

    public OrderResponseDTO(Long id, String orderNumber, Long customerId, String customerName,
                            BigDecimal subtotal, BigDecimal discountAmount, BigDecimal deliveryFee,
                            BigDecimal totalAmount, String couponCode, String status,
                            String shippingAddress, List<OrderItemResponseDTO> items) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.customerId = customerId;
        this.customerName = customerName;
        this.subtotal = subtotal;
        this.discountAmount = discountAmount;
        this.deliveryFee = deliveryFee;
        this.totalAmount = totalAmount;
        this.couponCode = couponCode;
        this.status = status;
        this.shippingAddress = shippingAddress;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public BigDecimal getDeliveryFee() {
        return deliveryFee;
    }

    public void setDeliveryFee(BigDecimal deliveryFee) {
        this.deliveryFee = deliveryFee;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public List<OrderItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponseDTO> items) {
        this.items = items;
    }
}
