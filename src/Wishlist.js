import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // 🔥 LOAD DATA
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  // 🛒 ADD TO CART
  const addToCart = (item) => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart 🛒");
  };

  // ❌ REMOVE FROM WISHLIST
  const removeFromWishlist = (index) => {

    const updated = [...wishlist];
    updated.splice(index, 1);

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // ⚡ BUY NOW
  const buyNow = (item) => {
    navigate("/checkout", {
      state: { product: item }
    });
  };

  return (
    <div className="wishlist-page">

      <h2>Your Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="wishlist-grid">

          {wishlist.map((item, index) => (
            <div className="wishlist-card" key={index}>

              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <div className="wishlist-buttons">

                <button onClick={() => addToCart(item)}>
                  🛒 Add to Cart
                </button>

                <button onClick={() => buyNow(item)}>
                  ⚡ Buy Now
                </button>

                <button onClick={() => removeFromWishlist(index)}>
                  ❌ Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;