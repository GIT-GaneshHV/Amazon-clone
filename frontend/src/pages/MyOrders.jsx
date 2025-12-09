import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all orders
  const loadOrders = () => {
    fetch("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("MY ORDERS:", data);
        setOrders(data);
      })
      .catch((err) => console.error("ORDER FETCH ERROR:", err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    const res = await fetch(
      `http://localhost:5000/api/orders/cancel/${orderId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("CANCEL RESPONSE:", data);

    if (data.order) {
      alert("Order cancelled successfully!");
      loadOrders(); // refresh orders
    } else {
      alert("Failed to cancel order!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <h3>Order #{order.id}</h3>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color:
                  order.status === "CANCELLED"
                    ? "red"
                    : order.status === "DELIVERED"
                    ? "green"
                    : "orange",
              }}
            >
              {order.status}
            </span>
          </p>

          <p>
            <b>Total:</b> ₹{order.total}
          </p>

          <h4>Items:</h4>
          {order.items.map((item) => (
            <p key={item.id}>
              {item.title} × {item.quantity}
            </p>
          ))}

          {/* CANCEL BUTTON — only if not cancelled/delivered */}
          {order.status === "PENDING" && (
            <button
              onClick={() => cancelOrder(order.id)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
