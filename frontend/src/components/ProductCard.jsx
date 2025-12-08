import { Link } from "react-router-dom";
import "./ProductCard.css";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>

      <h3 className="product-title">{product.title}</h3>

      <p className="product-price">₹{product.price}</p>

      <p className="product-category">{product.category}</p>
    </Link>
  );
};

export default ProductCard;
