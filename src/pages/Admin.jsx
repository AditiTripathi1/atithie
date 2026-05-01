import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Admin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
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
  }, []);

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