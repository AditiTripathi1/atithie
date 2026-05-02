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

//   return snapshot.docs.reduce((total, doc) => {
//     return total + (doc.data().seats || 1);
//   }, 0);

return snapshot.docs.reduce((total, doc) => {
  const booking = doc.data();
  return total + Number(booking.totalSeats || booking.seats || 1);
}, 0);


}