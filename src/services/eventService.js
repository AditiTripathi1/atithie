import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getActiveEvents() {
  const snapshot = await getDocs(collection(db, "events"));

  const events = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("raw events:", events);

  return events
    .filter((event) => event.isActive === true)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function createEvent(eventData) {
  await addDoc(collection(db, "events"), {
    ...eventData,
    adultPrice: Number(eventData.adultPrice),
    kidPrice: Number(eventData.kidPrice),
    maxSeats: Number(eventData.maxSeats),
    isActive: true,
    createdAt: serverTimestamp(),
  });
}