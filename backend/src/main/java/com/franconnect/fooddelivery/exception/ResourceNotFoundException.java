package com.franconnect.fooddelivery.exception;

/**
 * Custom exception thrown when a requested resource (Customer, Food, Category, etc.)
 * is not found in the database.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
