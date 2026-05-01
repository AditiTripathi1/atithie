import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="page">
      <div className="booking-card">
        <h1>❌ Payment Cancelled</h1>

        <p className="description">
          Your booking was not completed.
        </p>

        <p>
          You can try again or choose another date.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Link to="/">
            <button className="pay-button">Try Again</button>
          </Link>
        </div>
      </div>
    </div>
  );
}