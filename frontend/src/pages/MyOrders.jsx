import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}
        >
          <h3>Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>

          <h4>Items:</h4>
          {order.items.map((item) => (
            <p key={item.id}>
              {item.product.title} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
