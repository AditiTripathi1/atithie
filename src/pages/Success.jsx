import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="page">
      <div className="booking-card">
        <h1>🎉 Booking Confirmed</h1>

        <p className="description">
          Your seat has been successfully reserved.
        </p>

        <p>
          A confirmation email has been sent to you with all the details.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Link to="/">
            <button className="pay-button">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}