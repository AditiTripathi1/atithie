import Stripe from "stripe";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handler = async (event) => {
  try {
    const signature = event.headers["stripe-signature"];

    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
if (stripeEvent.type === "checkout.session.completed") {
  const session = stripeEvent.data.object;

  const adults = Number(session.metadata?.adults || 0);
  const kids = Number(session.metadata?.kids || 0);
  const totalSeats = Number(session.metadata?.totalSeats || adults + kids || 1);
  const dinnerDate = session.metadata?.dinnerDate;

  await addDoc(collection(db, "bookings"), {
    experience: session.metadata?.experience || "Sohala",

    name: `${session.metadata?.firstName || ""} ${
      session.metadata?.lastName || ""
    }`.trim(),

    firstName: session.metadata?.firstName || "",
    lastName: session.metadata?.lastName || "",
    email: session.customer_details?.email || session.customer_email || "",
    mobile: session.metadata?.mobile || "",
    kidsAttending: session.metadata?.kidsAttending === "true",

    date: dinnerDate,

    adults,
    kids,
    totalSeats,

    groupNames: session.metadata?.groupNames || "",
    dietaryRequirements: session.metadata?.dietaryRequirements || "",
    cuisineRelationship: session.metadata?.cuisineRelationship || "",

    kidsConfirmed: session.metadata?.kidsConfirmed === "true",
    consent: session.metadata?.consent === "true",
    cancellationPolicy: session.metadata?.cancellationPolicy === "true",

    status: "paid",
    paymentMethod: "stripe",
    stripeSessionId: session.id,
    amountTotal: session.amount_total,
    currency: session.currency,
    createdAt: Timestamp.now(),
  });
}

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error("Webhook error:", error.message);

    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};