import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [password, setPassword] = useState("");
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
        if (!isAllowed) return;

    async function fetchBookings() {
      const q = query(
        collection(db, "bookings"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(data);
    }

    fetchBookings();
  }, [isAllowed]);

   if (!isAllowed) {
  return (
    <div className="page">
      <div className="booking-card">
        <h1>Admin Login</h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="pay-button"
          onClick={() => {
            if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
              setIsAllowed(true);
            } else {
              alert("Wrong password");
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <p><strong>Name:</strong> {b.name}</p>
          <p><strong>Email:</strong> {b.email}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Status:</strong> {b.status}</p>
        </div>
      ))}
    </div>
  );
}