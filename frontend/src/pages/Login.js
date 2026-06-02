import React, { useState } from "react";
import "./login.css";

function Login() {

    const [role, setRole] = useState("customer");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 🔥 LOGIN FUNCTION
    const handleLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.text())
        .then(data => {

            console.log("Response:", data);

            if(data === "User not found"){
                alert("User not registered ❌");
            }
            else if(data === "Invalid password"){
                alert("Wrong password ❌");
            }
            else if(data && data.length > 20){
                alert("Login Successful ✅");

                localStorage.setItem("token", data);
                localStorage.setItem("user", email);

                window.location.href = "/";
            }
            else{
                alert("Login Failed ❌");
            }

        })
        .catch(err => {
            console.error(err);
            alert("Server error ❌");
        });
    };

    // 🔥 REGISTER FUNCTION
    const handleRegister = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: email,       // temporary
                email: email,
                password: password,
                role: role
            })
        })
        .then(res => res.text())
        .then(data => {
            alert(data);
        })
        .catch(err => {
            console.error(err);
            alert("Error during register ❌");
        });
    };

    return (
        <div className="login-page">

            <div className="login-box">

                <h2>KalaKart Login / Register</h2>

                <div className="role-buttons">
                    <button
                        className={role === "customer" ? "active" : ""}
                        onClick={() => setRole("customer")}
                    >
                        Customer
                    </button>

                    <button
                        className={role === "artist" ? "active" : ""}
                        onClick={() => setRole("artist")}
                    >
                        Artist
                    </button>
                </div>

                <form>

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    {/* LOGIN BUTTON */}
                    <button className="login-btn" onClick={handleLogin}>
                        Login
                    </button>

                    {/* REGISTER BUTTON */}
                    <button
                        className="login-btn"
                        style={{ marginTop: "10px", background: "#28a745" }}
                        onClick={handleRegister}
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;