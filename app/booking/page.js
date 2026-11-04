
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "./booking.module.css";

export default function Booking() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        appliance: "",
        problem: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        // Customer details temporarily save karna
        const trackingCode =
            "PS-" + crypto.randomUUID().slice(0, 8).toUpperCase();

        const submittedDetails = {
            ...form,
            tracking_code: trackingCode,
        };

        const { error } = await supabase
            .from("bookings")
            .insert([submittedDetails]);
        setLoading(false);

        if (error) {
            setErrorMessage("Booking failed: " + error.message);
            return;
        }

        // Booking successful hone par confirmation show hoga
        setBookingSuccess(submittedDetails);

        setForm({
            name: "",
            phone: "",
            appliance: "",
            problem: "",
            address: "",
        });
    }

    // BOOKING CONFIRMATION SCREEN
    if (bookingSuccess) {
        return (
            <main className={styles.bookingPage}>
                <div className={styles.bookingCard}>

                    <div className={styles.successIcon}>✓</div>

                    <p className={styles.tag}>
                        POWER SUPPLY SERVICES
                    </p>

                    <h1>Booking Confirmed!</h1>

                    <p className={styles.successText}>
                        Thank you, {bookingSuccess.name}!
                        Your repair service booking has been
                        successfully submitted.
                    </p>

                    <div className={styles.confirmationDetails}>
                        <h3>Booking Details</h3>

                        <p>
                            <strong>Tracking ID:</strong>{" "}
                            {bookingSuccess.tracking_code}
                        </p>

                        <p>
                            <strong>Customer Name:</strong>{" "}
                            {bookingSuccess.name}
                        </p>

                        <p>
                            <strong>Mobile Number:</strong>{" "}
                            {bookingSuccess.phone}
                        </p>

                        <p>
                            <strong>Appliance:</strong>{" "}
                            {bookingSuccess.appliance}
                        </p>

                        <p>
                            <strong>Problem:</strong>{" "}
                            {bookingSuccess.problem}
                        </p>

                        <p>
                            <strong>Booking Status:</strong>{" "}
                            <span className={styles.pendingStatus}>
                                Pending
                            </span>
                        </p>
                    </div>

                    <p className={styles.contactMessage}>
                        Our team will contact you shortly on your
                        registered mobile number.
                    </p>

                    <a href="/" className={styles.homeButton}>
                        Back to Home
                    </a>

                    <button
                        type="button"
                        className={styles.anotherButton}
                        onClick={() => setBookingSuccess(null)}
                    >
                        Book Another Service
                    </button>

                </div>
            </main>
        );
    }

    // BOOKING FORM
    return (
        <main className={styles.bookingPage}>
            <div className={styles.bookingCard}>

                <a href="/" className={styles.backLink}>
                    ← Back to Home
                </a>

                <p className={styles.tag}>
                    POWER SUPPLY SERVICES
                </p>

                <h1>Book a Repair Service</h1>

                <p>
                    Fill in your details and our team will contact you.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

                    <label>Mobile Number</label>
                    <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                    />

                    <label>Select Appliance</label>
                    <select
                        name="appliance"
                        value={form.appliance}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choose appliance</option>
                        <option>AC</option>
                        <option>Fridge</option>
                        <option>Washing Machine</option>
                        <option>Microwave</option>
                        <option>RO Water Purifier</option>
                        <option>Geyser</option>
                        <option>TV</option>
                        <option>Chimney</option>
                    </select>

                    <label>Describe Your Problem</label>
                    <textarea
                        name="problem"
                        value={form.problem}
                        onChange={handleChange}
                        placeholder="Describe the problem..."
                        required
                    />

                    <label>Service Address</label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Enter your full address"
                        required
                    />

                    {errorMessage && (
                        <p className={styles.errorMessage}>
                            {errorMessage}
                        </p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Confirm Booking"}
                    </button>

                </form>
            </div>
        </main>
    );
}
