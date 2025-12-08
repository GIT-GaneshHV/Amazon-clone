import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  console.log("CART REDUX ITEMS:", cartItems);

  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  const goToCheckout = () => {
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
        style={{ padding: "10px 20px", background: "orange", cursor: "pointer" }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
