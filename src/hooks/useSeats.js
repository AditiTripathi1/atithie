import { useEffect, useState } from "react";
import { getBookedSeats } from "../services/bookingService";
import { MAX_SEATS } from "../utils/constants";

export function useSeats(date) {
  const [seatsLeft, setSeatsLeft] = useState(MAX_SEATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeats() {
      try {
        const bookedSeats = await getBookedSeats(date);
        setSeatsLeft(MAX_SEATS - bookedSeats);
      } catch (error) {
        console.error("Error fetching seats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSeats();
  }, [date]);

  return { seatsLeft, loading };
}