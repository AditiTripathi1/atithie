import { useState } from "react";
import { useSeats } from "../hooks/useSeats";
import { createBankTransferBooking } from "../services/bookingService";
import { DINNER_DATE, MEAL_PRICE } from "../utils/constants";
import { handleStripeCheckout } from "../services/paymentService";

export default function Home() {
  const { seatsLeft, loading } = useSeats(DINNER_DATE);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleBankTransfer() {
    if (!name || !email) {
      setMessage("Please enter your name and email.");
      return;
    }

    if (seatsLeft <= 0) {
      setMessage("Sorry, this dinner is sold out.");
      return;
    }

    await createBankTransferBooking({
      name,
      email,
      date: DINNER_DATE,
    });

    setMessage(
      "Seat reserved. Please transfer $65 to confirm your booking. Use your name as payment reference.",
    );

    setName("");
    setEmail("");
  }

  return (
    <div className="page">
      <h1>🍽 Saturday Dinner</h1>
      <p>Date: {DINNER_DATE}</p>
      <p>Price: ${MEAL_PRICE}</p>

      {loading ? <p>Loading seats...</p> : <p>Seats left: {seatsLeft}</p>}

      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <button
        onClick={handleStripeCheckout}
        disabled={loading || seatsLeft <= 0}
      >
        Pay Now
      </button>

      <button onClick={handleBankTransfer} disabled={loading || seatsLeft <= 0}>
        Reserve via Bank Transfer
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
