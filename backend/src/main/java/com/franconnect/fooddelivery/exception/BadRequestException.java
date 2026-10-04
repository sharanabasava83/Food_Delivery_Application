package com.franconnect.fooddelivery.exception;

/**
 * Custom exception thrown when client input fails business rules or constraints
 * (e.g. duplicate email, invalid coupon parameters).
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
