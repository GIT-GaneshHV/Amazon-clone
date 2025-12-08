export const fetchMyOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/orders/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
