import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { store } from "../redux/store";
import React from "react";

console.log("NAVBAR STORE:", store.getState());
console.log("STATE FROM CHECKOUT:", window.store?.getState());


const Navbar = () => {
  const dispatch = useDispatch();

  // Get user from redux
  const cartCount = useSelector((state) => state.cart.items.length);
  const user = useSelector((state) => state.auth?.user);
  const [search, setSearch] = useState("");


  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const handleSearch = () => {
    if (search.trim() === "") return;
    window.location.href = `/search/${search}`;
  };

  return (
    <nav
      style={{
        width: "100%",
        height: "60px",
        background: "#131921",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 10px",
        overflow: "hidden",
        boxSizing: "border-box",
        flexWrap: "wrap", // ⭐ allows items to go to next line if needed
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{ color: "white", textDecoration: "none", fontSize: 22 }}
      >
        Amazon Clone
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>


        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "5px",
            width: "200px",
            maxWidth: "40vw",  // ⭐ responsive width
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleSearch}
          style={{ padding: "5px 10px", background: "orange", border: "none", cursor: "pointer" }}
        >
          Search
        </button>

        {/* Cart Icon */}
        <Link
          to="/cart"
          style={{ color: "white", textDecoration: "none", position: "relative" }}
        >
          🛒 Cart
          <span
            style={{
              position: "absolute",
              top: -8,
              right: -12,
              background: "orange",
              color: "black",
              padding: "2px 6px",
              borderRadius: "50%",
              fontSize: 12,
            }}
          >
            {cartCount}
          </span>
        </Link>

        {/* User */}
        {user ? (
          <>
            <span>Hello, {user.name}</span>

            <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "orange",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span>Hello, Guest</span>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>

            <Link to="/admin/add-product" style={{ color: "white" }}>
              Add Product
            </Link>
          </>
        )}
      </div>
    </nav>

  );
};

export default Navbar;
