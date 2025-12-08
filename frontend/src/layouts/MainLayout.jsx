import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        {children}
      </div>
    </>
  );
}
