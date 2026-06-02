import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(data);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

 return (
   <div className="cart-page">

     <h1 className="cart-title">🛒 Your Cart</h1>

     {cartItems.length === 0 ? (
       <p className="empty-cart">No items in cart</p>
     ) : (
       cartItems.map((item, index) => (
         <div className="cart-item" key={index}>

           <div className="cart-details">
             <h3>{item.name}</h3>
             <p>Size: {item.size}</p>
             <p>Quantity: {item.quantity}</p>
           </div>

           <div className="cart-right">
             <div className="cart-price">
               ₹{item.price * item.quantity}
             </div>

             <button
               className="remove-btn"
               onClick={() => removeItem(index)}
             >
               ❌ Remove
             </button>
           </div>

         </div>
       ))
     )}

     {/* 👇 ORDER SUMMARY NOW AT BOTTOM */}
     {cartItems.length > 0 && (
       <div className="cart-summary-bottom">

         <h2>Order Summary</h2>

         <p>Total Items: {cartItems.length}</p>
         <p>Delivery: FREE</p>

         <div className="summary-line"></div>

         <h3>₹{total}</h3>

      <button
        className="place-order-btn"
        onClick={() =>
          navigate("/checkout", {
            state: {
              cartItems: cartItems   // ✅ FULL CART PASS
            }
          })
        }
        style={{
          width: "1020px",
          height: "170px",
          fontSize: "92px",
          fontWeight: "900",
          borderRadius: "50px",
          background: "linear-gradient(135deg, #ff4d6d, #ff758c)",
          color: "white",
          border: "none",
          display: "block",
          margin: "30px auto",
          cursor: "pointer"
        }}
      >
        Place Order 🚀
      </button>

       </div>
     )}

   </div>
 );
}

export default Cart;