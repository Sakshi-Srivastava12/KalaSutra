import React, { useState } from "react";
import "./Checkout.css";
import { useLocation } from "react-router-dom";

function Checkout() {

  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleStep1 = () => {
    if (email.trim() === "") {
      alert("⚠️ Email is required!");
      return;
    }
    setStep(2);
  };

  const handleStep2 = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      address.trim() === "" ||
      city.trim() === "" ||
      stateName.trim() === "" ||
      pincode.trim() === ""
    ) {
      alert("⚠️ Please fill all required details!");
      return;
    }
    setStep(3);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ FINAL HANDLE ORDER
  const handleOrder = async () => {

    console.log("clicked");

    if (!selectedPayment) {
      alert("Please select payment method ❌");
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      paymentMethod: selectedPayment
    };

    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.text();
      console.log("backend response:", data);

      // 🔥 PROFILE SAVE (IMPORTANT - ALWAYS RUN)
      const emailKey = localStorage.getItem("user")?.trim();

      const oldProfiles = JSON.parse(localStorage.getItem("profiles")) || {};

      oldProfiles[emailKey] = {
        firstName,
        lastName,
        address,
        city,
        state: stateName,
        pincode
      };

      localStorage.setItem("profiles", JSON.stringify(oldProfiles));

      // 🔥 ORDER SAVE
      const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const newOrder = {
        id: Date.now(),
        items: cartItems,
        total: total,
        status: "Placed"
      };

      localStorage.setItem(
        "orders",
        JSON.stringify([...oldOrders, newOrder])
      );

      // 🔥 CLEAR CART
      localStorage.removeItem("cart");

      // ✅ BACKEND RESPONSE
      if (response.ok) {
        alert("Order Placed Successfully 🎉");
        setStep(5);
      } else {
        alert("Order Failed ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="checkout-page">

      <h1 className="brand">
        <span className="kala">Kala</span>
        <span className="sutra">सूत्र</span>
      </h1>

      <div className="steps">
        <span className={step>=1 ? "active" : ""}>Cart</span>
        <span className={step>=2 ? "active" : ""}>Details</span>
        <span className={step>=3 ? "active" : ""}>Shipping</span>
        <span className={step>=4 ? "active" : ""}>Payment</span>
        <span className={step>=5 ? "active" : ""}>Done</span>
      </div>

      <div className="checkout-container">

        <div className="left">

          {step === 1 && (
            <div>
              <h2>Contact Information</h2>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleStep1}>Continue</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Shipping Address</h2>

              <div className="grid">
                <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>

              <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

              <div className="grid">
                <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <input placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} />
                <input placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
              </div>

              <button onClick={handleStep2}>Continue to Shipping</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Shipping Method</h2>
              <label><input type="radio" name="shipping" /> Free Delivery</label>
              <button onClick={() => setStep(4)}>Continue to Payment</button>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2>Payment</h2>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={selectedPayment === "UPI"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                UPI / GPay / PhonePe
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="CARD"
                  checked={selectedPayment === "CARD"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                Card
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={selectedPayment === "COD"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                Cash on Delivery
              </label>

              <button onClick={handleOrder}>
                Pay Now
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="success">
              🎉 Order Placed Successfully!
            </div>
          )}

        </div>

        <div className="right">
          <div className="summary-box">

            <h3>Order Summary</h3>

            {cartItems.map((item, index) => (
              <div className="item" key={index}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="line"></div>

            <p>Subtotal: ₹{total}</p>
            <p>Shipping: FREE</p>
            <h2>Total: ₹{total}</h2>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;