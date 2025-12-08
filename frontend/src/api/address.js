export const addAddress = async (form, token) => {
  const res = await fetch("http://localhost:5000/api/address/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });

  return res.json();
};

export const getAddressList = async (token) => {
  const res = await fetch("http://localhost:5000/api/address/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
