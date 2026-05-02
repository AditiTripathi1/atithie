import { useState, useEffect } from "react";
import { useSeats } from "../hooks/useSeats";
//import { handleStripeCheckout } from "../services/paymentService";
import { DINNER_DATES } from "../utils/constants";
import BookingForm from "./BookingForm";
import { getActiveEvents } from "../services/eventService";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(DINNER_DATES[0]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [seatCount, setSeatCount] = useState(1);
  const { seatsLeft, loading } = useSeats(selectedEvent?.date);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getActiveEvents();
      console.log("events from Firebase:", data);
      setEvents(data);
      setSelectedEvent(data[0]); // default select first
    }

    fetchEvents();
  }, []);

  //   function handlePayment() {
  //     if (seatsLeft <= 0) {
  //       alert("Sorry, this dinner is sold out.");
  //       return;
  //     }

  //     if (seatCount > seatsLeft) {
  //       alert(`Only ${seatsLeft} seats left for this date.`);
  //       return;
  //     }

  //     handleStripeCheckout(selectedDate, seatCount);
  //   }

  return (
    <>
    <header className="navbar">
  <div className="brand-header">
    <img src="/logo.png" alt="Atithie" className="logo-nav" />

    <div>
        <h2>Atithie</h2>
      <p className="brand-kicker">A Soulful Maharashtrian Supper Club</p>
      
    </div>
  </div>
</header>
    <main className="landing-page">
      <section className="hero">
        <div className="hero-content">
            {/* <img src="/logo.png" alt="Atithie Supper Club" className="logo" />
          

          <h1>Atithie</h1>
          <p className="eyebrow">A Soulful Maharashtrian Supper Club</p> */}

          {/* <p className="quote">अतिथिदेवो भव — The guest is God</p> */}

          <p className="hero-subtitle">
            A small, intimate, home-hosted dining experience celebrating
            Maharashtrian food, stories, traditions, and warmth.
          </p>

          <div className="hero-pills">
            <span>🍽️ 5 curated courses</span>
            <span>✨ Only 10 guests</span>
            <span>📍 Marsden Park</span>
          </div>

          <div className="hero-details">
            <div>
              <span>⏰ Time</span>
              <strong>5:30 PM – 9:00 PM</strong>
            </div>

            <div>
              <span>💰 Contribution</span>
              <strong>$65 / adult • $30 / kid</strong>
            </div>

            <div>
              <span>👥 Seats</span>
              <strong>Only 10 guests</strong>
            </div>

            <div>
              <span>🍽️ Experience</span>
              <strong>5 curated courses</strong>
            </div>
          </div>

          <div className="about-inline">
            <p className="section-label">About Us</p>

            <h3>What is Atithie?</h3>

            <p>
              Atithie is a small, intimate Maharashtrian home-style supper club
              — a curated dining experience hosted inside our home.
            </p>

            <p>
              It is not a restaurant or commercial dining space, but a cultural
              and culinary experience where food, stories, and traditions come
              together around one shared table.
            </p>

            <p className="highlight">
              Only 10 guests. One table. One experience.
            </p>
          </div>

          <div className="about-inline">
            <p className="section-label">The Concept</p>

            <h3>What is a Supper Club?</h3>

            <p>
              A supper club is a small, private dining experience hosted by
              passionate home cooks. Guests book seats for a themed meal focused
              on one culture, cuisine, and story.
            </p>

            <p>
              It brings people together around one shared table for food,
              conversation, and community.
            </p>
          </div>

          <div className="about-inline">
            <p className="section-label">Our Promise</p>

            <h3>What makes Atithie special?</h3>

            <p>
              Atithie celebrates Maharashtra through regional flavours,
              gharghuti cooking methods, seasonal ingredients, and stories
              behind every dish.
            </p>

            <div className="mini-feature-list">
              <span>5 culinary regions</span>
              <span>Gharghuti methods</span>
              <span>Seasonal ingredients</span>
              <span>Pangat-style warmth</span>
            </div>
          </div>
        </div>

        <div className="booking-card">
          <p className="tag">Book Your Experience</p>

          <h2>Reserve your seat</h2>

          <p className="description">
            Join one shared table for an evening of home-style Maharashtrian
            flavours and storytelling.
          </p>

          <label className="label">Choose your date</label>
          <select
            className="date-select"
            value={selectedEvent?.id || ""}
            onChange={(e) => {
              const event = events.find((ev) => ev.id === e.target.value);
              setSelectedEvent(event);
            }}
          >
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                Saturday, {ev.date}
              </option>
            ))}
          </select>

          {seatsLeft > 0 && seatsLeft <= 8 && (
            <p className="urgency-text">
              🔥 Only {seatsLeft} seats left for this date
            </p>
          )}
            <p className="tag">Experience of this Supper Club</p>
          <h2>{selectedEvent?.experience}</h2>

          {/* <label className="label">Number of seats</label>
          <select
            className="date-select"
            value={seatCount}
            onChange={(e) => setSeatCount(Number(e.target.value))}
            disabled={loading || seatsLeft <= 0}
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              Array.from({ length: seatsLeft }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "seat" : "seats"}
                </option>
              ))
            )}
          </select>

          <div className="details">
            <div>
              <span>Contribution</span>
              <strong>${MEAL_PRICE * seatCount}</strong>
            </div>
            <div>
              <span>Seats left</span>
              <strong>{loading ? "..." : seatsLeft}</strong>
            </div>
          </div>

          <button
            className="pay-button"
            onClick={handlePayment}
            disabled={loading || seatsLeft <= 0}
          >
            {seatsLeft <= 0 ? "Sold Out" : "Book Your Seat"}
          </button>*/}

          <BookingForm
            selectedDate={selectedEvent?.date}
            seatsLeft={seatsLeft}
            loading={loading}
          />
        </div>
      </section>

      {/* <section className="content-section">
        <p className="section-label">About Us</p>
        <h2>What is Atithie?</h2>
        <p>
          Atithie is our small, intimate Maharashtrian home-style supper club —
          a curated dining experience hosted right inside our home.
        </p>

        <div className="simple-list">
          <span>Not a restaurant</span>
          <span>Not commercial dining</span>
          <span>A cultural and culinary experience</span>
          <span>Only 10 guests at a time</span>
        </div>
      </section>

      <section className="content-section">
        <p className="section-label">The Concept</p>
        <h2>What is a Supper Club?</h2>
        <p>
          A supper club is a small, private dining experience hosted by
          passionate home cooks. Guests book seats for a themed meal focused on
          one culture, cuisine, and story.
        </p>

        <div className="experience-grid">
          <div>
            <h3>Guided tasting</h3>
            <p>A curated journey through food, memories, and storytelling.</p>
          </div>
          <div>
            <h3>Seasonal ingredients</h3>
            <p>Local and thoughtful ingredients prepared with care.</p>
          </div>
          <div>
            <h3>Shared table</h3>
            <p>Warm community around one intimate dining table.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <p className="section-label">Our Promise</p>
        <h2>What makes Atithie special?</h2>

        <div className="experience-grid">
          <div>
            <h3>5 Culinary Regions</h3>
            <p>Maharashtra’s full flavour map on one plate.</p>
          </div>
          <div>
            <h3>Gharghuti Methods</h3>
            <p>Village-style and family recipes made with love.</p>
          </div>
          <div>
            <h3>Pangat Seating</h3>
            <p>Sit together, eat together, and feel at home.</p>
          </div>
        </div>
      </section> */}

      {/* <section className="content-section">
        <p className="section-label">Details</p>
        <h2>Timing & Contribution</h2>

        <div className="details-wide">
          <div><strong>3.5 hrs</strong><span>5:30 PM – 9:00 PM</span></div>
          <div><strong>$65</strong><span>per person</span></div>
          <div><strong>10</strong><span>guests only</span></div>
          <div><strong>5</strong><span>curated courses</span></div>
        </div>
      </section> */}
    </main>
    </>
  );

}
