import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export async function getBookedSeats(date) {
  const bookingsRef = collection(db, "bookings");

  const q = query(
    bookingsRef,
    where("date", "==", date),
    where("status", "==", "paid")
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}