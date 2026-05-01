import Stripe from "stripe";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

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
      date:  session.metadata?.dinnerDate,
      status: "paid",
      paymentMethod: "stripe",
      createdAt: new Date(),
    });

    // 📧 SEND EMAIL HERE
  await resend.emails.send({
    from: "Atithie Sydney <onboarding@resend.dev>",
    to: [session.customer_details?.email],
    subject: "Your dinner booking is confirmed 🍽️",
    html: `
      <h2>Booking Confirmed 🎉</h2>
      <p>Hi ${session.customer_details?.name || "Guest"},</p>

      <p>Your seat for our Saturday dinner is confirmed.</p>

      <p><strong>Date:</strong> 2026-05-02</p>
      <p><strong>Amount Paid:</strong> $${session.amount_total / 100}</p>

      <p>We can’t wait to host you 💛</p>

      <p>– Atithie Sydney</p>
    `,
  });
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};