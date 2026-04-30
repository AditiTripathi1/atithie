import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getBookedSeats(date) {
  const bookingsRef = collection(db, "bookings");

  const q = query(
    bookingsRef,
    where("date", "==", date),
    where("status", "in", ["paid", "pending"])
  );

  const snapshot = await getDocs(q);
  return snapshot.size;
}

export async function createBankTransferBooking({ name, email, date }) {
  await addDoc(collection(db, "bookings"), {
    name,
    email,
    date,
    status: "pending",
    paymentMethod: "bank_transfer",
    createdAt: serverTimestamp(),
  });
}