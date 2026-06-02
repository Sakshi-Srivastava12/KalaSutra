package com.sakshi.kala.controller;

import com.sakshi.kala.entity.CartItem;
import com.sakshi.kala.repository.CartRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")   // React frontend ke liye important
public class CartController {

    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // ✅ Add item to cart
    @PostMapping
    public CartItem addToCart(@RequestBody CartItem cartItem) {
        return cartRepository.save(cartItem);
    }

    // ✅ Get all cart items
    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartRepository.findAll();
    }

    // ✅ Get cart items by userId
    @GetMapping("/{userId}")
    public List<CartItem> getUserCart(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // ✅ Update quantity
    @PutMapping("/{id}")
    public CartItem updateCartItem(@PathVariable Long id,
                                   @RequestBody CartItem updatedItem) {

        CartItem cartItem = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItem.setQuantity(updatedItem.getQuantity());

        return cartRepository.save(cartItem);
    }

    // ✅ Delete item from cart
    @DeleteMapping("/{id}")
    public String deleteCartItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
        return "Item removed from cart successfully!";
    }
}