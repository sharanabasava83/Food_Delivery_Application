package com.franconnect.fooddelivery.service.impl;

import com.franconnect.fooddelivery.dto.CouponRequestDTO;
import com.franconnect.fooddelivery.dto.CouponResponseDTO;
import com.franconnect.fooddelivery.dto.CouponValidationResponseDTO;
import com.franconnect.fooddelivery.entity.Cart;
import com.franconnect.fooddelivery.entity.CartItem;
import com.franconnect.fooddelivery.entity.Category;
import com.franconnect.fooddelivery.entity.Coupon;
import com.franconnect.fooddelivery.exception.BadRequestException;
import com.franconnect.fooddelivery.exception.ResourceNotFoundException;
import com.franconnect.fooddelivery.repository.CartItemRepository;
import com.franconnect.fooddelivery.repository.CartRepository;
import com.franconnect.fooddelivery.repository.CategoryRepository;
import com.franconnect.fooddelivery.repository.CouponRepository;
import com.franconnect.fooddelivery.service.CouponService;
import com.franconnect.fooddelivery.strategy.DiscountStrategy;
import com.franconnect.fooddelivery.strategy.DiscountStrategyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * CouponServiceImpl
 * Implements coupon lifecycle and delegates discount logic to DiscountStrategyFactory.
 */
@Service
public class CouponServiceImpl implements CouponService {

    private static final BigDecimal MAX_CATEGORY_DISCOUNT = new BigDecimal("50.00");

    private final CouponRepository couponRepository;
    private final CategoryRepository categoryRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final DiscountStrategyFactory discountStrategyFactory;

    @Autowired
    public CouponServiceImpl(CouponRepository couponRepository,
                             CategoryRepository categoryRepository,
                             CartRepository cartRepository,
                             CartItemRepository cartItemRepository,
                             DiscountStrategyFactory discountStrategyFactory) {
        this.couponRepository = couponRepository;
        this.categoryRepository = categoryRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.discountStrategyFactory = discountStrategyFactory;
    }

    @Override
    @Transactional
    public CouponResponseDTO createCoupon(CouponRequestDTO requestDTO) {
        String code = requestDTO.getCode().trim().toUpperCase();

        if (couponRepository.existsByCodeIgnoreCase(code)) {
            throw new BadRequestException("Coupon code '" + code + "' already exists.");
        }

        Category category = null;
        if ("CATEGORY_DISCOUNT".equalsIgnoreCase(requestDTO.getCouponType())) {
            if (requestDTO.getCategoryId() == null) {
                throw new BadRequestException("Category ID is required for CATEGORY_DISCOUNT coupons.");
            }
            category = categoryRepository.findById(requestDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + requestDTO.getCategoryId()));

            // Requirement: "no category can have a discount more than 50%"
            if (requestDTO.getDiscountPercentage() != null &&
                    requestDTO.getDiscountPercentage().compareTo(MAX_CATEGORY_DISCOUNT) > 0) {
                throw new BadRequestException("Category discount cannot exceed 50%. Specified: "
                        + requestDTO.getDiscountPercentage() + "%");
            }
        }

        Coupon coupon = new Coupon();
        coupon.setCode(code);
        coupon.setDescription(requestDTO.getDescription());
        coupon.setCouponType(requestDTO.getCouponType().toUpperCase());
        coupon.setDiscountPercentage(requestDTO.getDiscountPercentage());
        coupon.setDiscountAmount(requestDTO.getDiscountAmount());
        coupon.setCategory(category);
        coupon.setMinOrderAmount(requestDTO.getMinOrderAmount());
        coupon.setMaxDiscountAmount(requestDTO.getMaxDiscountAmount());

        Coupon savedCoupon = couponRepository.save(coupon);
        return mapToResponseDTO(savedCoupon);
    }

    @Override
    public CouponResponseDTO getCouponById(Long id) {
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coupon not found with id: " + id));
        return mapToResponseDTO(coupon);
    }

    @Override
    public CouponResponseDTO getCouponByCode(String code) {
        Coupon coupon = couponRepository.findByCodeIgnoreCase(code.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Coupon not found with code: " + code));
        return mapToResponseDTO(coupon);
    }

    @Override
    public List<CouponResponseDTO> getAllCoupons() {
        return couponRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CouponResponseDTO updateCoupon(Long id, CouponRequestDTO requestDTO) {
        Coupon existingCoupon = couponRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coupon not found with id: " + id));

        String code = requestDTO.getCode().trim().toUpperCase();
        if (!existingCoupon.getCode().equalsIgnoreCase(code) &&
                couponRepository.existsByCodeIgnoreCase(code)) {
            throw new BadRequestException("Coupon code '" + code + "' already exists.");
        }

        Category category = null;
        if ("CATEGORY_DISCOUNT".equalsIgnoreCase(requestDTO.getCouponType())) {
            if (requestDTO.getCategoryId() == null) {
                throw new BadRequestException("Category ID is required for CATEGORY_DISCOUNT coupons.");
            }
            category = categoryRepository.findById(requestDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + requestDTO.getCategoryId()));

            if (requestDTO.getDiscountPercentage() != null &&
                    requestDTO.getDiscountPercentage().compareTo(MAX_CATEGORY_DISCOUNT) > 0) {
                throw new BadRequestException("Category discount cannot exceed 50%. Specified: "
                        + requestDTO.getDiscountPercentage() + "%");
            }
        }

        existingCoupon.setCode(code);
        existingCoupon.setDescription(requestDTO.getDescription());
        existingCoupon.setCouponType(requestDTO.getCouponType().toUpperCase());
        existingCoupon.setDiscountPercentage(requestDTO.getDiscountPercentage());
        existingCoupon.setDiscountAmount(requestDTO.getDiscountAmount());
        existingCoupon.setCategory(category);
        existingCoupon.setMinOrderAmount(requestDTO.getMinOrderAmount());
        existingCoupon.setMaxDiscountAmount(requestDTO.getMaxDiscountAmount());

        Coupon updatedCoupon = couponRepository.save(existingCoupon);
        return mapToResponseDTO(updatedCoupon);
    }

    @Override
    @Transactional
    public void deleteCoupon(Long id) {
        if (!couponRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Coupon not found with id: " + id);
        }
        couponRepository.deleteById(id);
    }

    @Override
    public CouponValidationResponseDTO validateAndApplyCoupon(String couponCode, Long customerId) {
        if (couponCode == null || couponCode.trim().isEmpty()) {
            throw new BadRequestException("Coupon code cannot be empty.");
        }
        if (customerId == null) {
            throw new BadRequestException("Customer ID is required.");
        }

        // 1. Fetch Cart
        Cart cart = cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for customer id: " + customerId));

        // 2. Fetch Cart Items
        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        if (cartItems.isEmpty()) {
            throw new BadRequestException("Your cart is empty. Add food items before applying a coupon.");
        }

        // 3. Compute Subtotal
        BigDecimal subtotal = cartItems.stream()
                .map(item -> item.getPricePerUnit().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. Fetch Coupon
        Coupon coupon = couponRepository.findByCodeIgnoreCase(couponCode.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid coupon code: " + couponCode));

        // 5. Select Strategy and Calculate Discount
        DiscountStrategy strategy = discountStrategyFactory.getStrategy(coupon.getCouponType());
        BigDecimal discount = strategy.calculateDiscount(coupon, cartItems, customerId);

        BigDecimal newTotal = subtotal.subtract(discount);
        if (newTotal.compareTo(BigDecimal.ZERO) < 0) {
            newTotal = BigDecimal.ZERO;
        }

        String message = String.format("Coupon '%s' applied successfully! You saved ₹%.2f",
                coupon.getCode(), discount);

        return new CouponValidationResponseDTO(
                coupon.getCode(),
                true,
                discount,
                subtotal,
                newTotal,
                message
        );
    }

    private CouponResponseDTO mapToResponseDTO(Coupon coupon) {
        return new CouponResponseDTO(
                coupon.getId(),
                coupon.getCode(),
                coupon.getDescription(),
                coupon.getCouponType(),
                coupon.getDiscountPercentage(),
                coupon.getDiscountAmount(),
                coupon.getCategory() != null ? coupon.getCategory().getId() : null,
                coupon.getCategory() != null ? coupon.getCategory().getName() : null,
                coupon.getMinOrderAmount(),
                coupon.getMaxDiscountAmount()
        );
    }
}
