import React, { useState } from "react";

export default function Address() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = await addAddress(form, token);

    if (data.address) {
      alert("Address added!");
      window.location.href = "/checkout";
    } else {
      alert("Failed to add address");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Address</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            required={key !== "line2"}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
        ))}

        <button
          type="submit"
          style={{ padding: "10px 15px", width: "100%" }}
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
