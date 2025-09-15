import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  // ------------------- Form State -------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [error, setError] = useState("");

  // ------------------- Input Change -------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ------------------- Submit -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset previous error

    const url =
      mode === "login"
        ? "http://localhost:3001/api/auth/login"
        : "http://localhost:3001/api/auth/signup";

    try {
      const res = await axios.post(url, form);

      // Save JWT in localStorage
      localStorage.setItem("token", res.data.token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // ------------------- Google OAuth -------------------
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/api/auth/google";
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>{mode === "login" ? "Login" : "Signup"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        {mode === "signup" && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: 10 }}>
          {mode === "login" ? "Login" : "Signup"}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {mode === "login" ? "Signup" : "Login"}
        </span>
      </p>

      <hr />
      <button onClick={handleGoogleLogin}>Login with Google</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Auth;
