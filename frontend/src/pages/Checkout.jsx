import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";



export default function Checkout() {
  const dispatch = useDispatch();

  // Try LOCAL STORAGE cart first
  const stored = localStorage.getItem("checkoutItems");
  const lsItems = stored ? JSON.parse(stored) : [];

  // Try REDUX cart second
  const reduxItems = useSelector((state) => state.cart.items);

  // FINAL: Prefer localStorage checkout items (buy now / proceed)
  const cartItems = lsItems.length > 0 ? lsItems : reduxItems;

  console.log("✔ CHECKOUT CART ITEMS:", cartItems);

  // ADDRESS
  const token = localStorage.getItem("token");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/address/list", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setAddresses);
  }, []);

  const placeOrder = async () => {
    if (!selectedAddress) return alert("Please select an address");

    const res = await fetch("http://localhost:5000/api/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        total: totalAmount,
        addressId: selectedAddress,
      }),
    });

    const data = await res.json();
    console.log("ORDER RESPONSE:", data);

    if (data.order) {
      alert("Order placed successfully!");

      // 🔥 CLEAR CART FIRST
      dispatch(clearCart());
      localStorage.removeItem("checkoutItems");

      // 🔥 THEN REDIRECT
      window.location.href = "/order-success";
    } else {
      alert("Order failed!");
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      <h2>Select Address</h2>
      {addresses.map((a) => (
        <div key={a.id}>
          <input
            type="radio"
            name="address"
            onChange={() => setSelectedAddress(a.id)}
          />
          {a.fullName}, {a.city}, {a.state} - {a.pincode}
        </div>
      ))}

      <h2>Order Summary</h2>
      {cartItems.length === 0 ? (
        <p>No items found.</p>
      ) : (
        cartItems.map((item) => (
          <p key={item.id}>
            {item.title} × {item.quantity} = ₹{item.quantity * item.price}
          </p>
        ))
      )}

      <h2>Total: ₹{totalAmount}</h2>

      <button
        onClick={placeOrder}
        style={{ padding: "10px 20px", background: "orange" }}
      >
        Place Order
      </button>
    </div>
  );
}
