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
    consentPrivate: false,
consentContribution: false,
consentKitchen: false,
consentAllergy: false,
consentBookingProcess: false,
consentCancellation: false,
consentPayment: false,
consentMedia: false,
consentAll: false,
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

    if (
  !form.consentPrivate ||
  !form.consentContribution ||
  !form.consentKitchen ||
  !form.consentAllergy ||
  !form.consentPayment ||
  !form.consentMedia ||
  !form.consentBookingProcess ||
  !form.consentCancellation ||
  !form.consentAll
) {
  alert("Please accept all required terms and conditions.");
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
      
      {/* <h2>Sohala</h2> */}

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

      <details className="consent-section">
  <summary>Consent & Disclaimer *</summary>
<div className="consent-content">
  <label className="checkbox-row">
    <input
      type="checkbox"
      checked={form.consentPrivate}
      onChange={(e) => updateField("consentPrivate", e.target.checked)}
    />
    I understand this is a private, invitation-based home dining experience
    and not a licensed restaurant or commercial food business.
  </label>

  <label className="checkbox-row">
    <input
      type="checkbox"
      checked={form.consentContribution}
      onChange={(e) => updateField("consentContribution", e.target.checked)}
    />
    I agree that the contribution covers ingredients and utilities only,
    not commercial hospitality services.
  </label>

  <label className="checkbox-row">
    <input
      type="checkbox"
      checked={form.consentKitchen}
      onChange={(e) => updateField("consentKitchen", e.target.checked)}
    />
    I understand food is prepared in a domestic kitchen under NSW
    low-risk home food guidelines.
  </label>

  <label className="checkbox-row">
    <input
      type="checkbox"
      checked={form.consentAllergy}
      onChange={(e) => updateField("consentAllergy", e.target.checked)}
    />
    I will inform the host of any allergies and accept risks of dining
    in a home environment.
  </label>

  <label className="checkbox-row">
    <input
      type="checkbox"
      checked={form.consentPayment}
      onChange={(e) => updateField("consentPayment", e.target.checked)}
    />
    I agree to the $65 per person contribution for this experience.
  </label>

  <label className="checkbox-row">
    <input
      type="checkbox"
      checked={form.consentMedia}
      onChange={(e) => updateField("consentMedia", e.target.checked)}
    />
    I understand photos/videos may be taken and shared. I will inform the
    host if I do not wish to be included.
  </label>

  <label className="checkbox-row">
  <input
    type="checkbox"
    checked={form.consentBookingProcess}
    onChange={(e) =>
      updateField("consentBookingProcess", e.target.checked)
    }
  />
   I understand that submitting this form does not confirm my seat.
  Booking is confirmed only upon advance payment. Bookings are
  non-changeable.
</label>

<label className="checkbox-row">
  <input
    type="checkbox"
    checked={form.consentCancellation}
    onChange={(e) =>
      updateField("consentCancellation", e.target.checked)
    }
  />
   I agree to the cancellation policy: Full refund if cancelled 7 days or
  more before the event, 50% refund if cancelled 4–6 days prior, and no
  refund if cancelled within 72 hours.
</label>

  <label className="checkbox-row highlight-checkbox">
    <input
      type="checkbox"
      checked={form.consentAll}
      onChange={(e) => updateField("consentAll", e.target.checked)}
    />
    On behalf of all attendees, I confirm that we understand and agree to all
    the above terms and conditions.
  </label>
  </div>
</details>

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