import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [size, setSize] = useState("Medium");
const handleAddToCart = () => {

  const item = {
    id: product.id,
    name: product.name,
    price: finalPrice,
    quantity: quantity,
    size: size
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  navigate("/cart");   // go to cart page
};

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) return <h2>Loading...</h2>;
  let finalPrice = product.price;

  if (size === "Small") {
    finalPrice = product.price - 300;
  } else if (size === "Large") {
    finalPrice = product.price + 500;
  }

  return (
    <div className="product-detail-page">

      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

      <div className="product-detail-container">

        {/* LEFT IMAGE */}
        <div className="product-image">
          <img
            src={`http://localhost:8080/uploads/${product.imageUrl}`}
            alt={product.name}
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="product-info">

          <h1>{product.name}</h1>

          <p className="desc">{product.description}</p>

          <h2 className="price">₹{finalPrice}</h2>

          {/* SIZE (OPTIONAL) */}
          <select
            className="size-dropdown"
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          {/* BUTTONS */}
   <div className="cart-section">

     <div className="quantity-box">

       <button
         className="qty-btn"
         onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
       >
         −
       </button>

       <span className="qty-number">{quantity}</span>

       <button
         className="qty-btn"
         onClick={() => setQuantity(quantity + 1)}
       >
         +
       </button>

     </div>

    <button className="add-cart" onClick={handleAddToCart}>
      Add ₹{finalPrice * quantity}
    </button>

   </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;