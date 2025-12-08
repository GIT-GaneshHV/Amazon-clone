import React,{ useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const newProducts = await fetchProducts(skip, 20);
    setProducts((prev) => [...prev, ...newProducts]);
    setSkip(skip + 20);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <div style={{ width: "100%", padding: "20px" }}>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={loadMore}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "orange",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Home;
