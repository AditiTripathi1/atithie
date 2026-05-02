import { Link, useSearchParams } from "react-router-dom";

export default function Success() {
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");

  return (
    <div className="page">
      <div className="booking-card">
        <h1>🎉 Booking Confirmed</h1>
        <img src="/logo.png" alt="Atithie" className="logo" />
<h2>Your booking is confirmed 🍽️</h2>

        <p className="description">
          Your seat has been successfully reserved.
        </p>

        {date && (
          <p>
            <strong>Dinner Date:</strong> {date}
          </p>
        )}

        <p>
          A confirmation email will be sent to you with all the details.
        </p>

        <Link to="/">
          <button className="pay-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}