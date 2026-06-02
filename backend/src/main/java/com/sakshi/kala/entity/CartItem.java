package com.sakshi.kala.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    // 🔹 Many cart items belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 🔹 Each cart item has a product
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public CartItem() {}

    public Long getId() {
        return id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // ⭐ IMPORTANT
    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}