import Stripe from "stripe";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Firebase init (same config as frontend)
const firebaseConfig = {
  apiKey: "AIzaSyAxwDPra-7XWB4rIkU-sYY4DVJF4xpqiso",
  authDomain: "dinner-booking-85218.firebaseapp.com",
  projectId: "dinner-booking-85218",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handler = async (event) => {
  const sig = event.headers["stripe-signature"];

  const stripeEvent = stripe.webhooks.constructEvent(
    event.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    // Save booking as PAID
    await addDoc(collection(db, "bookings"), {
      name: session.customer_details?.name || "Guest",
      email: session.customer_details?.email,
      date: "2026-05-02",
      status: "paid",
      paymentMethod: "stripe",
      createdAt: new Date(),
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};