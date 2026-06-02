import React from "react";
import "./Orders.css";

function Orders() {
  return (
    <div className="orders-page">

      <h2 className="orders-title">My Orders 📦</h2>

      {/* EMPTY STATE */}
      <div className="orders-empty">
        <p>No orders yet 😔</p>
        <p>Start shopping to see your orders here!</p>
      </div>

      {/* SAMPLE ORDER (future ke liye) */}
      {/*
      <div className="order-card">
        <div className="order-header">
          <span>Order #12345</span>
          <span>₹999</span>
        </div>

        <div className="order-items">
          2 x Handmade Painting
        </div>

        <div className="order-status">
          Delivered ✅
        </div>
      </div>
      */}

    </div>
  );
}

export default Orders;