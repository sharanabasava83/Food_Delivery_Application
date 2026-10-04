package com.franconnect.fooddelivery.entity;

import jakarta.persistence.*;

/**
 * Cart Entity
 * Represents the 'carts' table in our database.
 * Each customer has one shopping cart (@OneToOne relationship).
 */
@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Each customer has exactly one shopping cart
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false, unique = true)
    private Customer customer;

    // Default No-Args Constructor
    public Cart() {
    }

    // Parameterized Constructor
    public Cart(Customer customer) {
        this.customer = customer;
    }

    // Getters and Setters (Encapsulation)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", customerId=" + (customer != null ? customer.getId() : null) +
                '}';
    }
}
