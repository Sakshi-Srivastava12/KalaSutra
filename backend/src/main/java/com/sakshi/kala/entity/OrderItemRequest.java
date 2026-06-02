package com.sakshi.kala.entity;

public class OrderItemRequest {

    private Long productId;
    private int quantity;

    // ✅ GETTER for productId
    public Long getProductId() {
        return productId;
    }

    // ✅ SETTER for productId
    public void setProductId(Long productId) {
        this.productId = productId;
    }

    // ✅ GETTER for quantity
    public int getQuantity() {
        return quantity;
    }

    // ✅ SETTER for quantity
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}