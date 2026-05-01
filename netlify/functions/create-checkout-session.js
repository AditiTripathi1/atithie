import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const { date } = JSON.parse(event.body || "{}");

    if (!date) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Dinner date is required." }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_creation: "always",
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: `Saturday Dinner - ${date}`,
            },
            unit_amount: 6500,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        dinnerDate: date,
      },
      success_url: "https://atithiesydney.netlify.app/success",
      cancel_url: "https://atithiesydney.netlify.app/cancel",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};