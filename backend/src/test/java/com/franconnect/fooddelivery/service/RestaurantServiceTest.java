package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.RestaurantRequestDTO;
import com.franconnect.fooddelivery.dto.RestaurantResponseDTO;
import com.franconnect.fooddelivery.entity.Restaurant;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.RestaurantRepository;
import com.franconnect.fooddelivery.service.impl.RestaurantServiceImpl;
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
 * RestaurantServiceTest
 * Unit tests verifying restaurant onboarding, uniqueness constraints, and search.
 */
@ExtendWith(MockitoExtension.class)
public class RestaurantServiceTest {

    @Mock
    private RestaurantRepository restaurantRepository;

    @InjectMocks
    private RestaurantServiceImpl restaurantService;

    private Restaurant testRestaurant;
    private RestaurantRequestDTO restaurantRequest;

    @BeforeEach
    void setUp() {
        testRestaurant = new Restaurant("Paradise Biryani", "Authentic Hyderabadi Dum Biryani", "Indiranagar, Bangalore", "9876500001");
        testRestaurant.setId(1L);

        restaurantRequest = new RestaurantRequestDTO("Paradise Biryani", "Authentic Hyderabadi Dum Biryani", "Indiranagar, Bangalore", "9876500001");
    }

    @Test
    @DisplayName("Create Restaurant - Success")
    void testCreateRestaurant_Success() {
        when(restaurantRepository.existsByNameIgnoreCase("Paradise Biryani")).thenReturn(false);
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(testRestaurant);

        RestaurantResponseDTO response = restaurantService.createRestaurant(restaurantRequest);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Paradise Biryani", response.getName());
        verify(restaurantRepository, times(1)).save(any(Restaurant.class));
    }

    @Test
    @DisplayName("Create Restaurant - Duplicate Name: Throws BadRequestException")
    void testCreateRestaurant_Duplicate_ThrowsException() {
        when(restaurantRepository.existsByNameIgnoreCase("Paradise Biryani")).thenReturn(true);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            restaurantService.createRestaurant(restaurantRequest);
        });

        assertTrue(ex.getMessage().contains("already exists"));
        verify(restaurantRepository, never()).save(any(Restaurant.class));
    }

    @Test
    @DisplayName("Get Restaurant By ID - Not Found: Throws ResourceNotFoundException")
    void testGetRestaurantById_NotFound() {
        when(restaurantRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            restaurantService.getRestaurantById(999L);
        });
    }

    @Test
    @DisplayName("Search Restaurants - By Keyword")
    void testSearchRestaurants() {
        when(restaurantRepository.findByNameContainingIgnoreCase("Biryani")).thenReturn(List.of(testRestaurant));

        List<RestaurantResponseDTO> results = restaurantService.searchRestaurants("Biryani");

        assertEquals(1, results.size());
        assertEquals("Paradise Biryani", results.get(0).getName());
    }
}
