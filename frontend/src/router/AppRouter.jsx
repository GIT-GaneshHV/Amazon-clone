import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import Address from "../pages/Address";
import OrderSuccess from "../pages/OrderSuccess";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Cart from "../pages/cart";
import ProtectedRoute from "../components/ProtectedRoute";
import MyOrders from "../pages/MyOrders";
import AdminAddProduct from "../pages/AdminAddProduct";
import SearchResults from "../pages/SearchResults";
import React from "react";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/product/:id" element={<Product />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/address"
        element={
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route path="/cart" element={<Cart />} />

      <Route path="/admin/add-product" element={<AdminAddProduct />} />

      {/* ⭐ SEARCH ROUTE MUST EXIST */}
      <Route path="/search/:query" element={<SearchResults />} />
    </Routes>
  );
}
