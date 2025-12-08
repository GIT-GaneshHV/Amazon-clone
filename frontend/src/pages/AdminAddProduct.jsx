import React,{ useState } from "react";
const AdminAddProduct = () => {
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const CLOUD_NAME = "dvvhryzfh";
  const UPLOAD_PRESET = "amazon_clone_unsigned";

  // Upload image to Cloudinary
  const uploadImage = async () => {
    if (!image) return alert("Please select an image");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImgUrl(data.secure_url);
    setLoading(false);

    alert("Image uploaded successfully!");
  };

  // Submit product
  const handleSubmit = async () => {
    if (!imgUrl) return alert("Please upload the image first!");

    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        description,
        stock: Number(stock),
        image: imgUrl,
      }),
    });

    const data = await res.json();
    console.log(data);

    alert("Product added successfully!");
  };

  return (
    <div style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    }}>
      <h2>Add New Product (Admin Only)</h2>

      <label>Product Image:</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={uploadImage} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {imgUrl && (
        <img
          src={imgUrl}
          alt="uploaded"
          style={{ width: 150, marginTop: 10 }}
        />
      )}

      <br /><br />

      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Stock:</label>
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        style={{ marginTop: 20, padding: 10, background: "orange" }}
      >
        Save Product
      </button>
    </div>
  );
};

export default AdminAddProduct;
