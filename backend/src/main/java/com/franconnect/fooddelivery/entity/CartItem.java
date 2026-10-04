package com.franconnect.fooddelivery.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * CartItem Entity
 * Represents an individual row in a shopping cart ('cart_items' table).
 * 
 * Relationships:
 * - Many CartItems belong to One Cart (@ManyToOne)
 * - Many CartItems refer to One Food product (@ManyToOne)
 */
@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many CartItems belong to One Cart
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    // Many CartItems reference One Food item
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "price_per_unit", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    // Default No-Args Constructor
    public CartItem() {
    }

    // Parameterized Constructor
    public CartItem(Cart cart, Food food, Integer quantity, BigDecimal pricePerUnit) {
        this.cart = cart;
        this.food = food;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
    }

    // Getters and Setters (Encapsulation)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", food=" + (food != null ? food.getName() : null) +
                ", quantity=" + quantity +
                ", pricePerUnit=" + pricePerUnit +
                '}';
    }
}
