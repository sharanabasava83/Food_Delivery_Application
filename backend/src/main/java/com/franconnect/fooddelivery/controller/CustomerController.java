package com.franconnect.fooddelivery.controller;

import com.franconnect.fooddelivery.dto.CustomerRequestDTO;
import com.franconnect.fooddelivery.dto.CustomerResponseDTO;
import com.franconnect.fooddelivery.dto.CustomerResponse;
import com.franconnect.fooddelivery.dto.LoginRequest;
import com.franconnect.fooddelivery.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CustomerController
 * REST endpoints for customer onboarding, authentication, profile retrieval, updates, and deletion.
 */
@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    /**
     * Customer Login Endpoint
     * POST /api/customers/login
     */
    @PostMapping("/login")
    public ResponseEntity<CustomerResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        CustomerResponse response = customerService.loginCustomer(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(@Valid @RequestBody CustomerRequestDTO requestDTO) {
        CustomerResponseDTO created = customerService.createCustomer(requestDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long id) {
        CustomerResponseDTO customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers() {
        List<CustomerResponseDTO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> updateCustomer(@PathVariable Long id,
                                                              @Valid @RequestBody CustomerRequestDTO requestDTO) {
        CustomerResponseDTO updated = customerService.updateCustomer(id, requestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}
