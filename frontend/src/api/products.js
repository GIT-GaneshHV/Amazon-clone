export const fetchProducts = async (skip = 0, take = 20) => {
  const res = await fetch(
    `http://localhost:5000/api/products?skip=${skip}&take=${take}`
  );

  if (!res.ok) {
    console.error("Failed to fetch products:", res.status);
    return [];
  }

  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`);
  return res.json();
};

export const searchProducts = async (query) => {
  const res = await fetch(
    `http://localhost:5000/api/products/search/${query}`
  );
  return res.json();
};
