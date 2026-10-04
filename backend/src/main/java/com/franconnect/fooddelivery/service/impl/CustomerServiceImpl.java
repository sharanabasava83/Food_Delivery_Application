package com.franconnect.fooddelivery.service.impl;

import com.franconnect.fooddelivery.dto.CustomerRequestDTO;
import com.franconnect.fooddelivery.dto.CustomerResponseDTO;
import com.franconnect.fooddelivery.dto.CustomerResponse;
import com.franconnect.fooddelivery.dto.LoginRequest;
import com.franconnect.fooddelivery.entity.Cart;
import com.franconnect.fooddelivery.entity.Customer;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.CartRepository;
import com.franconnect.fooddelivery.repository.CustomerRepository;
import com.franconnect.fooddelivery.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * CustomerServiceImpl
 * Implements customer business logic and interacts with CustomerRepository and CartRepository.
 */
@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;

    // Constructor Injection (Best practice over field injection)
    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, CartRepository cartRepository) {
        this.customerRepository = customerRepository;
        this.cartRepository = cartRepository;
    }

    /**
     * Customer Login Authentication
     * 1. Receive email and password.
     * 2. Find customer by email in MySQL database.
     * 3. If email does not exist: throw BadRequestException.
     * 4. Compare entered password with stored password.
     * 5. If password is incorrect: throw BadRequestException.
     * 6. If correct: return CustomerResponse without password.
     */
    @Override
    public CustomerResponse loginCustomer(LoginRequest request) {
        // Step 2 & 3: Find customer by email or throw BadRequestException
        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        // Step 4 & 5: Check password match
        if (customer.getPassword() == null || !customer.getPassword().equals(request.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        // Step 6: Return clean response without password
        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress()
        );
    }

    @Override
    @Transactional
    public CustomerResponseDTO createCustomer(CustomerRequestDTO requestDTO) {
        // Business Rule: Email must be unique
        if (customerRepository.existsByEmail(requestDTO.getEmail())) {
            throw new BadRequestException("Email is already registered: " + requestDTO.getEmail());
        }

        // 1. Convert DTO to Entity
        Customer customer = new Customer();
        customer.setName(requestDTO.getName());
        customer.setEmail(requestDTO.getEmail());
        customer.setPhone(requestDTO.getPhone());
        customer.setPassword(requestDTO.getPassword() != null && !requestDTO.getPassword().isBlank()
                ? requestDTO.getPassword()
                : "password123");
        customer.setAddress(requestDTO.getAddress());

        // 2. Save Customer to DB
        Customer savedCustomer = customerRepository.save(customer);

        // 3. Automatically create an empty shopping cart for the new customer
        Cart cart = new Cart(savedCustomer);
        cartRepository.save(cart);

        // 4. Return Response DTO
        return mapToResponseDTO(savedCustomer);
    }

    @Override
    public CustomerResponseDTO getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
        return mapToResponseDTO(customer);
    }

    @Override
    public List<CustomerResponseDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO requestDTO) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));

        // If email is changing, ensure it's not taken by another customer
        if (!existingCustomer.getEmail().equalsIgnoreCase(requestDTO.getEmail()) &&
                customerRepository.existsByEmail(requestDTO.getEmail())) {
            throw new BadRequestException("Email is already in use by another customer: " + requestDTO.getEmail());
        }

        existingCustomer.setName(requestDTO.getName());
        existingCustomer.setEmail(requestDTO.getEmail());
        existingCustomer.setPhone(requestDTO.getPhone());
        existingCustomer.setAddress(requestDTO.getAddress());

        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return mapToResponseDTO(updatedCustomer);
    }

    @Override
    @Transactional
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Customer not found with id: " + id);
        }
        customerRepository.deleteById(id);
    }

    // Helper mapper: Entity -> ResponseDTO
    private CustomerResponseDTO mapToResponseDTO(Customer customer) {
        return new CustomerResponseDTO(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress()
        );
    }
}
