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
    <main className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Sydney Supper Club</p>

          <h1>Atithie Sydney</h1>

          <p className="hero-subtitle">
            A cosy Indian dinner experience — homemade flavours, warm hosting,
            and only 10 seats per Saturday.
          </p>

          <div className="hero-pills">
            <span>🍽️ Home-style Indian food</span>
            <span>✨ Limited seats</span>
            <span>📍 Sydney</span>
          </div>
        </div>

        <div className="booking-card">
          <p className="tag">Saturday Dinner</p>

          <h2>Reserve your seat</h2>

          <p className="description">
            Join us for an intimate dinner table with comforting Indian food and
            good company.
          </p>

          <label className="label">Choose your date</label>

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
            <div>
              <span>Price</span>
              <strong>${MEAL_PRICE}</strong>
            </div>

            <div>
              <span>Seats left</span>
              <strong>{loading ? "..." : seatsLeft}</strong>
            </div>
          </div>

          {!loading && seatsLeft <= 3 && seatsLeft > 0 && (
            <p className="urgency">Only {seatsLeft} seats left for this date</p>
          )}

          <button
            className="pay-button"
            onClick={handlePayment}
            disabled={loading || seatsLeft <= 0}
          >
            {seatsLeft <= 0 ? "Sold Out" : "Book Your Seat"}
          </button>

          <p className="small-note">
            Secure payment powered by Stripe. Confirmation email will be sent
            after booking.
          </p>
        </div>
      </section>

      <section className="experience-section">
        <h2>What to expect</h2>

        <div className="experience-grid">
          <div>
            <h3>🍛 Comfort food</h3>
            <p>Indian flavours made with love, warmth, and nostalgia.</p>
          </div>

          <div>
            <h3>🕯️ Cosy table</h3>
            <p>A small gathering designed to feel personal and welcoming.</p>
          </div>

          <div>
            <h3>💛 Atithie vibe</h3>
            <p>Come as guests, leave feeling like family.</p>
          </div>
        </div>
      </section>
    </main>
  );
}