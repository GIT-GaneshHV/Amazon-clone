import { useSelector } from "react-redux";
import { useEffect, useState } from "react";




export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items); // ✅ Correct path
  const token = localStorage.getItem("token");

  console.log("CHECKOUT USESELECTOR:", cartItems);
  console.log("CHECKOUT STOREFULL:", window.store?.getState()); 

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
      .then(setAddresses)
      .catch((err) => console.error("ADDRESS LIST ERROR:", err));
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
    console.log("PLACE ORDER RESPONSE:", data);

    if (data.order) {
      alert("Order placed!");
      window.location.href = "/order-success";
    } else {
      alert("Order failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      {/* ADDRESS SELECT */}
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

      {/* ORDER SUMMARY */}
      <h2>Order Summary</h2>
      {cartItems.map((item) => (
        <p key={item.id}>
          {item.title} × {item.quantity} = ₹{item.price * item.quantity}
        </p>
      ))}

      <h2>Total: ₹{totalAmount}</h2>

      <button
        onClick={placeOrder}
        style={{ padding: "10px 20px", background: "orange", cursor: "pointer" }}
      >
        Place Order
      </button>
    </div>
  );
}
