package com.franconnect.fooddelivery.service;

import com.franconnect.fooddelivery.dto.CouponRequestDTO;
import com.franconnect.fooddelivery.dto.CouponValidationResponseDTO;
import com.franconnect.fooddelivery.entity.*;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.repository.CartItemRepository;
import com.franconnect.fooddelivery.repository.CartRepository;
import com.franconnect.fooddelivery.repository.CategoryRepository;
import com.franconnect.fooddelivery.repository.CouponRepository;
import com.franconnect.fooddelivery.service.impl.CouponServiceImpl;
import com.franconnect.fooddelivery.strategy.DiscountStrategy;
import com.franconnect.fooddelivery.strategy.DiscountStrategyFactory;
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
 * CouponServiceTest
 * Unit tests verifying coupon creation rules (e.g. <= 50% category cap)
 * and cart coupon validation & calculation.
 */
@ExtendWith(MockitoExtension.class)
public class CouponServiceTest {

    @Mock
    private CouponRepository couponRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CartRepository cartRepository;

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private DiscountStrategyFactory discountStrategyFactory;

    @Mock
    private DiscountStrategy discountStrategy;

    @InjectMocks
    private CouponServiceImpl couponService;

    private Category testCategory;
    private Coupon testCoupon;
    private Cart testCart;
    private CartItem testCartItem;
    private Food testFood;

    @BeforeEach
    void setUp() {
        testCategory = new Category("Biryani", "Dum Biryani");
        testCategory.setId(1L);

        testFood = new Food("Chicken Biryani", "Spiced", new BigDecimal("250.00"), testCategory, null);
        testFood.setId(10L);

        Customer customer = new Customer("Anita", "anita@example.com", "9876543210", "HSR Layout");
        customer.setId(2L);

        testCart = new Cart(customer);
        testCart.setId(5L);

        testCartItem = new CartItem(testCart, testFood, 2, new BigDecimal("250.00")); // Subtotal = 500

        testCoupon = new Coupon("FIRST50", "Flat 50% on first order", "FIRST_ORDER",
                new BigDecimal("50.00"), null, null, new BigDecimal("200.00"), new BigDecimal("150.00"));
        testCoupon.setId(1L);
    }

    @Test
    @DisplayName("Create Coupon - Category discount > 50% strictly prohibited: Throws BadRequestException")
    void testCreateCoupon_CategoryDiscountExceeds50Percent_ThrowsException() {
        CouponRequestDTO invalidRequest = new CouponRequestDTO(
                "MEGABIRYANI", "60% discount", "CATEGORY_DISCOUNT",
                new BigDecimal("60.00"), null, 1L, null, null
        );

        when(couponRepository.existsByCodeIgnoreCase("MEGABIRYANI")).thenReturn(false);
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(testCategory));

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            couponService.createCoupon(invalidRequest);
        });

        assertTrue(ex.getMessage().contains("cannot exceed 50%"));
        verify(couponRepository, never()).save(any(Coupon.class));
    }

    @Test
    @DisplayName("Validate and Apply Coupon - Success")
    void testValidateAndApplyCoupon_Success() {
        when(cartRepository.findByCustomerId(2L)).thenReturn(Optional.of(testCart));
        when(cartItemRepository.findByCartId(5L)).thenReturn(List.of(testCartItem));
        when(couponRepository.findByCodeIgnoreCase("FIRST50")).thenReturn(Optional.of(testCoupon));
        when(discountStrategyFactory.getStrategy("FIRST_ORDER")).thenReturn(discountStrategy);
        when(discountStrategy.calculateDiscount(eq(testCoupon), anyList(), eq(2L)))
                .thenReturn(new BigDecimal("150.00"));

        CouponValidationResponseDTO response = couponService.validateAndApplyCoupon("FIRST50", 2L);

        assertNotNull(response);
        assertTrue(response.isValid());
        assertEquals(new BigDecimal("150.00"), response.getDiscountAmount());
        assertEquals(new BigDecimal("500.00"), response.getSubtotal());
        assertEquals(new BigDecimal("350.00"), response.getNewTotal());
    }

    @Test
    @DisplayName("Validate Coupon - Empty Cart: Throws BadRequestException")
    void testValidateCoupon_EmptyCart_ThrowsException() {
        when(cartRepository.findByCustomerId(2L)).thenReturn(Optional.of(testCart));
        when(cartItemRepository.findByCartId(5L)).thenReturn(List.of());

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            couponService.validateAndApplyCoupon("FIRST50", 2L);
        });

        assertTrue(ex.getMessage().contains("cart is empty"));
    }
}
