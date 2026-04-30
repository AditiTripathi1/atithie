import Stripe from "stripe";

export const handler = async () => {
  
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items: [
    {
      price_data: {
        currency: "aud",
        product_data: { name: "Saturday Dinner" },
        unit_amount: 6500,
      },
      quantity: 1,
    },
  ],
  mode: "payment",
  success_url: "http://atithiesydney.netlify.app/success",
  cancel_url: "http://atithiesydney.netlify.app/cancel",
});

return {
  statusCode: 200,
  body: JSON.stringify({ url: session.url }),
};
};