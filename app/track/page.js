
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "./track.module.css";

export default function TrackBooking() {
  const [trackingCode, setTrackingCode] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleTrack(e) {
    e.preventDefault();

    setLoading(true);
    setBooking(null);
    setErrorMessage("");

    const { data, error } = await supabase.rpc(
      "track_booking",
      {
        p_tracking_code: trackingCode.trim().toUpperCase(),
      }
    );

    setLoading(false);

    if (error) {
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    if (!data || data.length === 0) {
      setErrorMessage("Invalid Tracking ID. Please check and try again.");
      return;
    }

    setBooking(data[0]);
  }

  const status = booking?.status || "Pending";

  const steps = ["Pending", "In Progress", "Completed"];

  const statusIndex = steps.indexOf(status);

  return (
    <main className={styles.trackPage}>
      <div className={styles.trackCard}>

        <a href="/" className={styles.backLink}>
          ← Back to Home
        </a>

        <p className={styles.tag}>POWER SUPPLY SERVICES</p>

        <h1>Track Your Booking</h1>

        <p className={styles.subtitle}>
          Enter your Tracking ID to check your repair service status.
        </p>

        <form onSubmit={handleTrack}>

          <label>Enter Tracking ID</label>

          <input
            type="text"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Example: PS-A82F91BC"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Track Booking"}
          </button>

        </form>

        {errorMessage && (
          <p className={styles.errorMessage}>
            {errorMessage}
          </p>
        )}

        {booking && (
          <div className={styles.resultBox}>

            <h2>Booking Details</h2>

            <p>
              <strong>Tracking ID:</strong>{" "}
              {booking.tracking_code}
            </p>

            <p>
              <strong>Appliance:</strong>{" "}
              {booking.appliance}
            </p>

            <p>
              <strong>Booking Date:</strong>{" "}
              {new Date(booking.created_at).toLocaleDateString("en-IN")}
            </p>

            <h3>Current Status</h3>

            <span className={`${styles.status} ${
              status === "Completed"
                ? styles.completed
                : status === "In Progress"
                ? styles.inProgress
                : status === "Cancelled"
                ? styles.cancelled
                : styles.pending
            }`}>
              {status}
            </span>

            {status === "Cancelled" ? (
              <p className={styles.statusMessage}>
                This booking has been cancelled. Please contact our team for assistance.
              </p>
            ) : (
              <div className={styles.progressSteps}>
                {steps.map((step, index) => (
                  <div className={styles.progressStep} key={step}>
                    <div className={`${styles.stepCircle} ${
                      statusIndex >= index ? styles.activeStep : ""
                    }`}>
                      {statusIndex >= index ? "✓" : index + 1}
                    </div>

                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}

            <p className={styles.statusMessage}>
              {status === "Completed"
                ? "Your repair service has been completed!"
                : status === "In Progress"
                ? "Our team has started working on your repair."
                : status === "Cancelled"
                ? ""
                : "Your booking has been received. Our team will contact you soon."}
            </p>

          </div>
        )}

      </div>
    </main>
  );
}
