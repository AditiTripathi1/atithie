import { useSeats } from "../hooks/useSeats";
import { handleStripeCheckout } from "../services/paymentService";
import { DINNER_DATE, MEAL_PRICE } from "../utils/constants";

export default function Home() {
  const { seatsLeft, loading } = useSeats(DINNER_DATE);

  function handlePayment() {
    if (seatsLeft <= 0) {
      alert("Sorry, this dinner is sold out.");
      return;
    }

    handleStripeCheckout();
  }

  return (
    <div className="page">
      <div className="booking-card">
        <p className="tag">Limited Saturday Dinner</p>

        <h1>Atithie Sydney</h1>

        <p className="description">
          A warm, home-style Indian dinner experience with limited seats.
        </p>

        <div className="details">
          <p><strong>Date:</strong> {DINNER_DATE}</p>
          <p><strong>Price:</strong> ${MEAL_PRICE}</p>
          <p>
            <strong>Seats left:</strong>{" "}
            {loading ? "Loading..." : seatsLeft}
          </p>
        </div>

        <button
          className="pay-button"
          onClick={handlePayment}
          disabled={loading || seatsLeft <= 0}
        >
          {seatsLeft <= 0 ? "Sold Out" : "Book Your Seat"}
        </button>
      </div>
    </div>
  );
}