export default function OrderSuccess() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Your items will be delivered soon.</p>

      <button
        onClick={() => (window.location.href = "/orders")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "orange",
          border: "none",
          cursor: "pointer",
        }}
      >
        View My Orders
      </button>
    </div>
  );
}
