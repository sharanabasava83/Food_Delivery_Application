package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.OrderResponseDTO;
import com.franconnect.fooddelivery.dto.PlaceOrderRequestDTO;

import java.util.List;

/**
 * OrderService Interface
 * Defines operations for order placement, tracking, and status lifecycle (OOP Abstraction).
 * Fulfills requirements: user places order with shipping info, order total based on cart, history retrieval.
 */
public interface OrderService {

    OrderResponseDTO placeOrder(PlaceOrderRequestDTO requestDTO);

    OrderResponseDTO getOrderById(Long orderId);

    OrderResponseDTO getOrderByOrderNumber(String orderNumber);

    List<OrderResponseDTO> getOrdersByCustomerId(Long customerId);

    List<OrderResponseDTO> getAllOrders();

    OrderResponseDTO updateOrderStatus(Long orderId, String newStatus);
}
