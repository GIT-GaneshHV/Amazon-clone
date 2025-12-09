import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/products.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductById(id).then((data) => {
      console.log("Product fetched:", data);
      setProduct(data);
    });
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const handleAdd = () => {
    const normalizedProduct = {
      ...product,
      id: Number(product.id),
    };

    console.log("Adding to cart:", normalizedProduct);
    dispatch(addToCart(normalizedProduct));
  };

  // ⭐ FIXED BUY NOW — uses checkoutItems array
  const handleBuyNow = (product) => {
    const items = [
      {
        productId: product.id,
        title: product.title,
        price: Number(product.price),
        quantity: 1,
      },
    ];

    // clear old values
    localStorage.removeItem("checkoutItem");
    localStorage.setItem("checkoutItems", JSON.stringify(items));

    window.location.href = "/checkout";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <h2>₹{product.price}</h2>

      <p>{product.description}</p>

      <button
        onClick={handleAdd}
        style={{
          marginTop: "20px",
          background: "orange",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>

      <button
        onClick={() => handleBuyNow(product)}
        className="buy-now-btn"
        style={{
          marginLeft: "10px",
          background: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default Product;
