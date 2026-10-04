package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.AddToCartRequestDTO;
import com.franconnect.fooddelivery.dto.CartResponseDTO;
import com.franconnect.fooddelivery.entity.Cart;
import com.franconnect.fooddelivery.entity.CartItem;
import com.franconnect.fooddelivery.entity.Customer;
import com.franconnect.fooddelivery.entity.Food;
import com.franconnect.fooddelivery.repository.CartItemRepository;
import com.franconnect.fooddelivery.repository.CartRepository;
import com.franconnect.fooddelivery.repository.CustomerRepository;
import com.franconnect.fooddelivery.repository.FoodRepository;
import com.franconnect.fooddelivery.service.impl.CartServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * CartServiceTest
 * Unit tests verifying shopping cart items addition, quantity incrementing,
 * removal, and total calculations.
 */
@ExtendWith(MockitoExtension.class)
public class CartServiceTest {

    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private FoodRepository foodRepository;

    @InjectMocks
    private CartServiceImpl cartService;

    private Customer testCustomer;
    private Cart testCart;
    private Food testFood;
    private CartItem testCartItem;

    @BeforeEach
    void setUp() {
        testCustomer = new Customer("Kiran", "kiran@example.com", "9876543210", "Whitefield");
        testCustomer.setId(1L);

        testCart = new Cart(testCustomer);
        testCart.setId(10L);

        testFood = new Food("Cheese Pizza", "Oven baked", new BigDecimal("300.00"), null, null);
        testFood.setId(100L);

        testCartItem = new CartItem(testCart, testFood, 1, new BigDecimal("300.00"));
        testCartItem.setId(50L);
    }

    @Test
    @DisplayName("Add Item to Cart - New Item: Saves new CartItem")
    void testAddItemToCart_NewItem() {
        AddToCartRequestDTO request = new AddToCartRequestDTO(100L, 2);

        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));
        when(cartRepository.findByCustomerId(1L)).thenReturn(Optional.of(testCart));
        when(foodRepository.findById(100L)).thenReturn(Optional.of(testFood));
        when(cartItemRepository.findByCartIdAndFoodId(10L, 100L)).thenReturn(Optional.empty());

        CartItem createdItem = new CartItem(testCart, testFood, 2, new BigDecimal("300.00"));
        when(cartItemRepository.findByCartId(10L)).thenReturn(List.of(createdItem));

        CartResponseDTO response = cartService.addItemToCart(1L, request);

        assertNotNull(response);
        assertEquals(2, response.getTotalItemCount());
        assertEquals(new BigDecimal("600.00"), response.getSubtotal());
        verify(cartItemRepository, times(1)).save(any(CartItem.class));
    }

    @Test
    @DisplayName("Add Item to Cart - Existing Item: Increments Quantity")
    void testAddItemToCart_ExistingItem_IncrementsQuantity() {
        AddToCartRequestDTO request = new AddToCartRequestDTO(100L, 1);

        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));
        when(cartRepository.findByCustomerId(1L)).thenReturn(Optional.of(testCart));
        when(foodRepository.findById(100L)).thenReturn(Optional.of(testFood));
        when(cartItemRepository.findByCartIdAndFoodId(10L, 100L)).thenReturn(Optional.of(testCartItem));

        when(cartItemRepository.findByCartId(10L)).thenReturn(List.of(testCartItem));

        CartResponseDTO response = cartService.addItemToCart(1L, request);

        assertNotNull(response);
        assertEquals(2, testCartItem.getQuantity());
        verify(cartItemRepository, times(1)).save(testCartItem);
    }

    @Test
    @DisplayName("Update Item Quantity - Zero: Automatically deletes item")
    void testUpdateItemQuantity_Zero_DeletesItem() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));
        when(cartRepository.findByCustomerId(1L)).thenReturn(Optional.of(testCart));
        when(cartItemRepository.findById(50L)).thenReturn(Optional.of(testCartItem));
        when(cartItemRepository.findByCartId(10L)).thenReturn(List.of());

        CartResponseDTO response = cartService.updateItemQuantity(1L, 50L, 0);

        assertNotNull(response);
        assertEquals(0, response.getTotalItemCount());
        verify(cartItemRepository, times(1)).delete(testCartItem);
    }

    @Test
    @DisplayName("Clear Cart - Successfully purges all items")
    void testClearCart_Success() {
        when(customerRepository.findById(1L)).thenReturn(Optional.of(testCustomer));
        when(cartRepository.findByCustomerId(1L)).thenReturn(Optional.of(testCart));
        doNothing().when(cartItemRepository).deleteByCartId(10L);

        assertDoesNotThrow(() -> cartService.clearCart(1L));
        verify(cartItemRepository, times(1)).deleteByCartId(10L);
    }
}
