import { useState } from "react";
import { useSeats } from "../hooks/useSeats";
import { handleStripeCheckout } from "../services/paymentService";
import { DINNER_DATES, MEAL_PRICE } from "../utils/constants";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(DINNER_DATES[0]);
  const { seatsLeft, loading } = useSeats(selectedDate);

  function handlePayment() {
    if (seatsLeft <= 0) {
      alert("Sorry, this dinner is sold out.");
      return;
    }

    handleStripeCheckout(selectedDate);
  }

  return (
    <div className="page">
      <div className="booking-card">
        <p className="tag">Limited Saturday Dinner</p>
        <h1>Atithie Sydney</h1>

        <p className="description">
          A warm, home-style Indian dinner experience with limited seats.
        </p>

        <label>Select dinner date</label>

        <select
          className="date-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          {DINNER_DATES.map((date) => (
            <option key={date} value={date}>
              Saturday, {date}
            </option>
          ))}
        </select>

        <div className="details">
          <p>
            <strong>Date:</strong> {selectedDate}
          </p>
          <p>
            <strong>Price:</strong> ${MEAL_PRICE}
          </p>
          <p>
            <strong>Seats left:</strong> {loading ? "Loading..." : seatsLeft}
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
