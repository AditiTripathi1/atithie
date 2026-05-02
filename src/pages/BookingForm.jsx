import { useState } from "react";
import { handleStripeCheckout } from "../services/paymentService";
import { MEAL_PRICE } from "../utils/constants";

const KIDS_PRICE = 30;

export default function BookingForm({ selectedDate, seatsLeft, loading }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    kidsAttending: null,
    adults: 1,
    kids: 0,
    kidsConfirmed: false,
    groupNames: "",
    dietaryRequirements: "",
    cuisineRelationship: "",
    consent: false,
    cancellationPolicy: false,
  });

  const totalSeats = Number(form.adults) + Number(form.kids);
  const totalAmount = Number(form.adults) * MEAL_PRICE + Number(form.kids) * KIDS_PRICE;

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validateForm() {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert("Please enter your first and last name.");
      return false;
    }

    if (!form.email.trim()) {
      alert("Please enter your email.");
      return false;
    }

    if (!form.mobile.trim()) {
      alert("Please enter your mobile number.");
      return false;
    }

    if (form.kidsAttending === null) {
  alert("Please select if kids are attending.");
  return false;
}

    if (!form.dietaryRequirements.trim()) {
      alert("Please share dietary requirements or write 'None'.");
      return false;
    }

    if (Number(form.kids) > 0 && !form.kidsConfirmed) {
      alert("Please confirm kids are under 10 years old.");
      return false;
    }

    if (!form.consent || !form.cancellationPolicy) {
      alert("Please accept the consent and cancellation policy.");
      return false;
    }

    if (totalSeats <= 0) {
      alert("Please select at least 1 attendee.");
      return false;
    }

    if (totalSeats > seatsLeft) {
      alert(`Only ${seatsLeft} seats left for this date.`);
      return false;
    }

//     if (form.kidsAttending === false && form.kids > 0) {
//   updateField("kids", 0);
// }

    return true;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    handleStripeCheckout({
      date: selectedDate,
      adults: Number(form.adults),
      kids: Number(form.kids),
      totalSeats,
      customer: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
      },
      groupNames: form.groupNames,
      dietaryRequirements: form.dietaryRequirements,
      cuisineRelationship: form.cuisineRelationship,
      kidsConfirmed: form.kidsConfirmed,
      consent: form.consent,
      cancellationPolicy: form.cancellationPolicy,
    });
  }

  return (
    <div className="booking-form">
      <p className="tag">Experience of this Supper Club</p>
      <h2>Sohala</h2>

      <p className="description">
        A festive feast inspired by traditional Maharashtrian celebrations,
        full of warmth, rituals, and indulgence.
      </p>

      <div className="form-grid">
        <input
          placeholder="First name"
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
        />

        <input
          placeholder="Last name"
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
        />
      </div>

      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => updateField("email", e.target.value)}
      />

      <input
        placeholder="Mobile"
        value={form.mobile}
        onChange={(e) => updateField("mobile", e.target.value)}
      />

      <label className="label">
  Are you attending with kids under 10 years old? *
</label>

<div className="radio-group">
  <label>
    <input
      type="radio"
      name="kidsAttending"
      checked={form.kidsAttending === true}
      onChange={() => updateField("kidsAttending", true)}
    />
    Yes
  </label>

  <label>
    <input
      type="radio"
      name="kidsAttending"
      checked={form.kidsAttending === false}
      onChange={() => {updateField("kidsAttending", false);
        updateField("kids", 0);
      }}
    />
    No
  </label>
</div>

      <textarea
        placeholder="Will you be attending with someone? Mention names here."
        value={form.groupNames}
        onChange={(e) => updateField("groupNames", e.target.value)}
      />

      <textarea
        placeholder="Dietary requirements / allergies. If none, write 'None'."
        value={form.dietaryRequirements}
        onChange={(e) => updateField("dietaryRequirements", e.target.value)}
      />

      <textarea
        placeholder="Your relationship with Maharashtrian cuisine (optional)"
        value={form.cuisineRelationship}
        onChange={(e) => updateField("cuisineRelationship", e.target.value)}
      />

          <label className="label">Booking for adults</label>
      <select
        className="date-select"
        value={form.adults}
        onChange={(e) => updateField("adults", Number(e.target.value))}
        disabled={loading}
      >
        {Array.from({ length: seatsLeft || 1 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num} adult{num > 1 ? "s" : ""} — ${num * MEAL_PRICE}
          </option>
        ))}
      </select>

        {form.kidsAttending && (
            <>
      <label className="label">Booking for kids under 10</label>
      <select
        className="date-select"
        value={form.kids}
        onChange={(e) => updateField("kids", Number(e.target.value))}
        disabled={loading}
      >
        {Array.from(
          { length: Math.max((seatsLeft || 0) - Number(form.adults), 0) + 1 },
          (_, i) => i
        ).map((num) => (
          <option key={num} value={num}>
            {num} kid{num !== 1 ? "s" : ""} — ${num * KIDS_PRICE}
          </option>
        ))}
      </select>
      </>
        )}

      {Number(form.kids) > 0 && (
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={form.kidsConfirmed}
            onChange={(e) => updateField("kidsConfirmed", e.target.checked)}
          />
          Kids are under 10 years old and host has been informed.
        </label>
      )}

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => updateField("consent", e.target.checked)}
        />
        I understand this is a home-hosted supper club experience.
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.cancellationPolicy}
          onChange={(e) => updateField("cancellationPolicy", e.target.checked)}
        />
        I agree to the confirmation and cancellation policy.
      </label>

      <div className="details">
        <div>
          <span>Total seats</span>
          <strong>{totalSeats}</strong>
        </div>

        <div>
          <span>Total</span>
          <strong>${totalAmount}</strong>
        </div>
      </div>

      

      <button
        className="pay-button"
        onClick={handleSubmit}
        disabled={loading || seatsLeft <= 0}
      >
        {seatsLeft <= 0 ? "Sold Out" : "Checkout"}
      </button>
    </div>
  );
}