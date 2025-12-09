import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import React from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (!cartItems || cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const goToCheckout = () => {
    // Convert cart to checkoutItems format
    const items = cartItems.map(item => ({
      productId: item.id,
      title: item.title,
      price: Number(item.price),
      quantity: item.quantity,
    }));

    // clear any old "checkoutItem"
    localStorage.removeItem("checkoutItem");

    // save proper array
    localStorage.setItem("checkoutItems", JSON.stringify(items));

    window.location.href = "/checkout";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
          <h3>{item.title}</h3>
          <p>Qty: {item.quantity}</p>
          <p>₹{item.price}</p>

          <button
            style={{
              background: "red",
              color: "white",
              padding: "8px 20px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>

          <hr />
        </div>
      ))}

      <button
        onClick={goToCheckout}
        className="checkout-btn"
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "orange",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
