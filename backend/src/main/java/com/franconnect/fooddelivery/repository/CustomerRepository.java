package com.franconnect.fooddelivery.repository;

import com.franconnect.fooddelivery.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * CustomerRepository Interface
 * Provides database operations for the 'customers' table.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Derived Query Method to find customer by unique email
    Optional<Customer> findByEmail(String email);

    // Check if an email is already registered
    boolean existsByEmail(String email);
}
