package com.franconnect.fooddelivery.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * CartResponseDTO
 * Complete shopping cart response with items list, total counts, and subtotal.
 */
public class CartResponseDTO {

    private Long cartId;
    private Long customerId;
    private String customerName;
    private List<CartItemResponseDTO> items;
    private int totalItemCount;
    private BigDecimal subtotal;

    public CartResponseDTO() {
    }

    public CartResponseDTO(Long cartId, Long customerId, String customerName,
                           List<CartItemResponseDTO> items, int totalItemCount, BigDecimal subtotal) {
        this.cartId = cartId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.items = items;
        this.totalItemCount = totalItemCount;
        this.subtotal = subtotal;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
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

    public List<CartItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemResponseDTO> items) {
        this.items = items;
    }

    public int getTotalItemCount() {
        return totalItemCount;
    }

    public void setTotalItemCount(int totalItemCount) {
        this.totalItemCount = totalItemCount;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}
