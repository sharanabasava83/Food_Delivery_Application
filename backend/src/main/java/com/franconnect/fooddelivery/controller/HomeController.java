package com.franconnect.fooddelivery.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Root Controller
 * Provides API health and directory information when accessing http://localhost:8080/
 */
@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("message", "Food Delivery API is running successfully!");
        
        Map<String, String> endpoints = new LinkedHashMap<>();
        endpoints.put("restaurants", "/api/restaurants");
        endpoints.put("categories", "/api/categories");
        endpoints.put("foods", "/api/foods");
        endpoints.put("customers", "/api/customers");
        endpoints.put("cart", "/api/cart");
        endpoints.put("orders", "/api/orders");
        endpoints.put("coupons", "/api/coupons");
        
        response.put("endpoints", endpoints);
        return ResponseEntity.ok(response);
    }
}
