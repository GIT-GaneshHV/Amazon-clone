export const searchProducts = async (query) => {
  const res = await fetch(`http://localhost:5000/api/products/search/${query}`);

  if (!res.ok) {
    console.error("Search API Error:", res.status);
    return [];
  }

  return res.json();
};
