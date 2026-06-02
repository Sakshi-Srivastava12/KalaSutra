package com.sakshi.kala.controller;

import com.sakshi.kala.entity.*;
import com.sakshi.kala.repository.*;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;   // ✅ ADD

    public OrderController(OrderRepository orderRepository,
                           UserRepository userRepository,
                           CartItemRepository cartItemRepository,
                           OrderItemRepository orderItemRepository,
                           ProductRepository productRepository) {   // ✅ ADD

        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;   // ✅ ADD
    }

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request){

        // 🔥 TEMP USER FIX (no login needed)
        User user = userRepository.findAll().get(0);

        // 📦 ITEMS CHECK
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("No items in request");
        }

        // 💳 PAYMENT CHECK
        if (request.getPaymentMethod() == null || request.getPaymentMethod().isEmpty()) {
            throw new RuntimeException("Payment method required");
        }

        // 🧾 CREATE ORDER
        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");

        double totalAmount = 0;

        // 🔁 LOOP ITEMS
        for (OrderItemRequest item : request.getItems()) {

            OrderItem orderItem = new OrderItem();

            // 🔥 PRODUCT FETCH FROM DB
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());

            double price = product.getPrice() * item.getQuantity();
            orderItem.setPrice(price);

            totalAmount += price;

            orderItemRepository.save(orderItem);
        }

        order.setTotalAmount(totalAmount);

        // 💾 SAVE ORDER
        Order savedOrder = orderRepository.save(order);

        // 🧹 CLEAR CART
        List<CartItem> cartItems = cartItemRepository.findByUser_Id(user.getId());
        cartItemRepository.deleteAll(cartItems);

        return savedOrder;
    }
    // 📄 GET ALL ORDERS
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 👤 GET USER ORDERS
    @GetMapping("/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }
}