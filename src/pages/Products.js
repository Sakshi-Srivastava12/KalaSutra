import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";

function Products() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const addToWishlist = (product) => {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // prevent duplicate
    if (!wishlist.find(p => p.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to Wishlist ❤️");
    } else {
      alert("Already in Wishlist ⚠️");
    }
  };

useEffect(() => {
  fetch("http://localhost:8080/api/products")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    })
    .then(data => {
      console.log("DATA:", data);
      setProducts(data);
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
}, []);

  const categories = [
    "All",
    "Wall Painting",
    "Scrapbook",
    "Sketch",
    "Keyrings",
    "Ceramic Cups",
    "Tote Bags"
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (

    <div className="products-page">

      {/* CATEGORY BUTTONS */}
      <div className="category-buttons">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 className="title">Art Gallery</h2>

      <div className="products-grid">

        {filteredProducts.map(product => {

           console.log(product.name, product.imageUrl);   // ✅ YAHAN SAHI

           return (
             <div
               className="product-card"
               key={product.id}
               onClick={() => navigate(`/product/${product.id}`)}
             >

               <img
                 src={
                   product.imageUrl
                     ? `http://localhost:8080/uploads/${product.imageUrl}`
                     : "https://via.placeholder.com/150"
                 }
                 alt={product.name}
               />

               <h3>{product.name}</h3>
               <p>₹{product.price}</p>

               <div className="product-buttons">

                 <button
                   className="wishlist"
                   onClick={(e) => {
                     e.stopPropagation();   // ⭐ VERY IMPORTANT
                     addToWishlist(product);
                   }}
                 >
                   ❤ Wishlist
                 </button>

                 <button
                   className="cart"
                   onClick={(e) => {
                     e.stopPropagation();

                     const item = {
                       name: product.name,
                       price: product.price,
                       quantity: 1,
                       image: product.imageUrl
                         ? `http://localhost:8080/uploads/${product.imageUrl}`
                         : "https://via.placeholder.com/150"
                     };

                     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

                     existingCart.push(item);

                     localStorage.setItem("cart", JSON.stringify(existingCart));

                     alert("Item added to cart ✅");
                   }}
                 >
                   🛒 Add to Cart
                 </button>

                 <button
                   className="buy"
                   onClick={(e) => {
                     e.stopPropagation();
                     navigate("/checkout", {
                       state: {
                         product: {
                           name: product.name,
                           price: product.price,
                           image: product.imageUrl
                             ? `http://localhost:8080/uploads/${product.imageUrl}`
                             : "https://via.placeholder.com/150"
                         }
                       }
                     });
                   }}
                 >
                   ⚡ Buy Now
                 </button>

               </div>

             </div>
           );
         })}

      </div>

    </div>

  );

}

export default Products;