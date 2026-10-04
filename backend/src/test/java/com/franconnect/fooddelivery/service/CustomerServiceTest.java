package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.CustomerRequestDTO;
import com.franconnect.fooddelivery.dto.CustomerResponseDTO;
import com.franconnect.fooddelivery.entity.Cart;
import com.franconnect.fooddelivery.entity.Customer;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.CartRepository;
import com.franconnect.fooddelivery.repository.CustomerRepository;
import com.franconnect.fooddelivery.service.impl.CustomerServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * CustomerServiceTest
 * Unit tests verifying customer CRUD operations, duplicate email validations,
 * and automatic shopping cart provisioning.
 */
@ExtendWith(MockitoExtension.class)
public class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private CartRepository cartRepository;

    @InjectMocks
    private CustomerServiceImpl customerService;

    private Customer testCustomer;
    private CustomerRequestDTO customerRequest;

    @BeforeEach
    void setUp() {
        testCustomer = new Customer("Rahul Sharma", "rahul@example.com", "9876543210", "Koramangala, Bangalore");
        testCustomer.setId(1L);

        customerRequest = new CustomerRequestDTO("Rahul Sharma", "rahul@example.com", "9876543210", "Koramangala, Bangalore");
    }

    @Test
    @DisplayName("Create Customer - Success: Saves customer and provisions an empty cart")
    void testCreateCustomer_Success() {
        when(customerRepository.existsByEmail("rahul@example.com")).thenReturn(false);
        when(customerRepository.save(any(Customer.class))).thenReturn(testCustomer);
        when(cartRepository.save(any(Cart.class))).thenReturn(new Cart(testCustomer));

        CustomerResponseDTO response = customerService.createCustomer(customerRequest);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Rahul Sharma", response.getName());
        assertEquals("rahul@example.com", response.getEmail());

        verify(customerRepository, times(1)).save(any(Customer.class));
        verify(cartRepository, times(1)).save(any(Cart.class));
    }

    @Test
    @DisplayName("Create Customer - Duplicate Email: Throws BadRequestException")
    void testCreateCustomer_DuplicateEmail_ThrowsException() {
        when(customerRepository.existsByEmail("rahul@example.com")).thenReturn(true);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            customerService.createCustomer(customerRequest);
        });

        assertTrue(ex.getMessage().contains("already registered"));
        verify(customerRepository, never()).save(any(Customer.class));
        verify(cartRepository, never()).save(any(Cart.class));
    }

    @Test
    @DisplayName("Get Customer By ID - Success")
    void testGetCustomerById_Success() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));

        CustomerResponseDTO response = customerService.getCustomerById(1L);

        assertNotNull(response);
        assertEquals("Rahul Sharma", response.getName());
        verify(customerRepository, times(1)).findById(1L);
    }

    @Test
    @DisplayName("Get Customer By ID - Not Found: Throws ResourceNotFoundException")
    void testGetCustomerById_NotFound() {
        when(customerRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            customerService.getCustomerById(99L);
        });
    }

    @Test
    @DisplayName("Get All Customers - Returns List")
    void testGetAllCustomers() {
        when(customerRepository.findAll()).thenReturn(List.of(testCustomer));

        List<CustomerResponseDTO> result = customerService.getAllCustomers();

        assertEquals(1, result.size());
        assertEquals("Rahul Sharma", result.get(0).getName());
    }

    @Test
    @DisplayName("Delete Customer - Success")
    void testDeleteCustomer_Success() {
        when(customerRepository.existsById(1L)).thenReturn(true);
        doNothing().when(customerRepository).deleteById(1L);

        assertDoesNotThrow(() -> customerService.deleteCustomer(1L));
        verify(customerRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Login - Success: Valid credentials return CustomerResponse")
    void testLogin_Success() {
        when(customerRepository.findByEmail("rahul@example.com")).thenReturn(Optional.of(testCustomer));

        com.franconnect.fooddelivery.dto.LoginRequest loginReq =
                new com.franconnect.fooddelivery.dto.LoginRequest("rahul@example.com", "password123");

        com.franconnect.fooddelivery.dto.CustomerResponse response = customerService.loginCustomer(loginReq);

        assertNotNull(response);
        assertEquals("Rahul Sharma", response.getName());
        assertEquals("rahul@example.com", response.getEmail());
    }

    @Test
    @DisplayName("Login - User Not Found: Throws BadRequestException")
    void testLogin_UserNotFound_ThrowsException() {
        when(customerRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        com.franconnect.fooddelivery.dto.LoginRequest loginReq =
                new com.franconnect.fooddelivery.dto.LoginRequest("nonexistent@example.com", "password123");

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            customerService.loginCustomer(loginReq);
        });

        assertEquals("Invalid email or password", ex.getMessage());
    }

    @Test
    @DisplayName("Login - Incorrect Password: Throws BadRequestException")
    void testLogin_IncorrectPassword_ThrowsException() {
        when(customerRepository.findByEmail("rahul@example.com")).thenReturn(Optional.of(testCustomer));

        com.franconnect.fooddelivery.dto.LoginRequest loginReq =
                new com.franconnect.fooddelivery.dto.LoginRequest("rahul@example.com", "wrongPassword");

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            customerService.loginCustomer(loginReq);
        });

        assertEquals("Invalid email or password", ex.getMessage());
    }
}
