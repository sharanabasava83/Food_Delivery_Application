package com.franconnect.fooddelivery.entity;

import jakarta.persistence.*;

/**
 * Category Entity
 * Represents the 'categories' table in our database.
 * Used to classify food items (e.g., Biryani, Pizza, Beverages, Desserts).
 */
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    // Default No-Args Constructor (Required by JPA)
    public Category() {
    }

    // Parameterized Constructor
    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters and Setters (Encapsulation)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
