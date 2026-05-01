//import { loadStripe } from "@stripe/stripe-js";

//const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

 
export async function handleStripeCheckout(date) {
  const res = await fetch("/.netlify/functions/create-checkout-session", {
    method: "POST",
    body: JSON.stringify({ date }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    alert(data.error || "Something went wrong");
    return;
  }

  window.location.href = data.url;
}