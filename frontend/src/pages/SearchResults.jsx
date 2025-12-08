import { useParams } from "react-router-dom";
import { searchProducts } from "../api/search";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import React from "react";

export default function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchProducts(query).then(setResults);
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search results for: {query}</h2>

      <div className="product-grid">
        {results.length === 0 ? (
          <p>No products found.</p>
        ) : (
          results.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
