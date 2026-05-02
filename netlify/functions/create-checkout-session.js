import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handler = async (event) => {
  try {
    const bookingData = JSON.parse(event.body || "{}");

    const {
      date,
      adults = 1,
      kids = 0,
      totalSeats = 1,
      customer = {},
      groupNames = "",
      dietaryRequirements = "",
      cuisineRelationship = "",
      kidsConfirmed = false,
      consent = false,
      cancellationPolicy = false,
    } = bookingData;

    const siteUrl = process.env.URL || "http://localhost:8888";

    const lineItems = [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: `Adult Reservation - Sohala - ${date}`,
          },
          unit_amount: 6500,
        },
        quantity: Number(adults),
      },
    ];

    if (Number(kids) > 0) {
      lineItems.push({
        price_data: {
          currency: "aud",
          product_data: {
            name: `Kids Reservation - Sohala - ${date}`,
          },
          unit_amount: 3000,
        },
        quantity: Number(kids),
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: customer.email,
      line_items: lineItems,
      mode: "payment",
      metadata: {
        dinnerDate: date,
        experience: "Sohala",
        adults: String(adults),
        kids: String(kids),
        totalSeats: String(totalSeats),
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        mobile: customer.mobile || "",
        kidsAttending: String(bookingData.kidsAttending),
        groupNames,
        dietaryRequirements,
        cuisineRelationship,
        kidsConfirmed: String(kidsConfirmed),
        consent: String(consent),
        cancellationPolicy: String(cancellationPolicy),
      },
      success_url: `${siteUrl}/success?date=${date}`,
      cancel_url: `${siteUrl}/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Checkout error:", err.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};