import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "Order",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_m4qqpuj",
      "template_0xul4se",
      form,
      "qB8ymJX8LzhD5wtTw"
    )
    .then(() => {
      alert("Message sent successfully ✅");
      setForm({ name: "", email: "", category: "Order", message: "" });
    })
    .catch(() => {
      alert("Failed to send ❌");
    });
  };

  return (
    <div className="contact-page">

      <h2 className="contact-title">Get in Touch ✉️</h2>

      <form className="contact-form" onSubmit={sendEmail}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select name="category" value={form.category} onChange={handleChange}>
          <option>Order</option>
          <option>Shipment</option>
          <option>Quality</option>
          <option>Payment</option>
          <option>Other</option>
        </select>

        <textarea
          name="message"
          placeholder="Write your message..."
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>

      </form>
    </div>
  );
}

export default Contact;