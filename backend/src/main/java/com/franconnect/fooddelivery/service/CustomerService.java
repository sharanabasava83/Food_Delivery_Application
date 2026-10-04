package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.CustomerRequestDTO;
import com.franconnect.fooddelivery.dto.CustomerResponseDTO;
import com.franconnect.fooddelivery.dto.CustomerResponse;
import com.franconnect.fooddelivery.dto.LoginRequest;

import java.util.List;

/**
 * CustomerService Interface
 * Defines business operations for Customer management (OOP Abstraction).
 */
public interface CustomerService {

    CustomerResponse loginCustomer(LoginRequest request);

    CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO);

    CustomerResponseDTO getCustomerById(Long id);

    List<CustomerResponseDTO> getAllCustomers();

    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO requestDTO);

    void deleteCustomer(Long id);
}
