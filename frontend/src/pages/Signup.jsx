import React,{ useState } from "react";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful! Please login.");
      window.location.href = "/login";
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 8, marginTop: 10 }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 8, marginTop: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 8, marginTop: 10 }}
      />

      <button
        onClick={handleSignup}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 20,
          background: "orange",
          border: "none",
          cursor: "pointer",
        }}
      >
        Create Your Account
      </button>

      <p style={{ marginTop: 20 }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "blue" }}>
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
