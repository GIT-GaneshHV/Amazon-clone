import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      dispatch(loginSuccess(data));        // Save token + user in Redux & localStorage
      alert("Login successful!");
      window.location.href = "/";         // Redirect to homepage
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h2>Login</h2>

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
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 20,
          background: "orange",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
