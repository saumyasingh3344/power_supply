
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./dashboard.module.css";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    async function checkAdmin() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace("/admin");
        return;
      }

      await loadBookings();
    }

    checkAdmin();
  }, [router]);

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Booking status updated!");
      await loadBookings();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin");
  }

  const pending = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const inProgress = bookings.filter(
    (b) => b.status === "In Progress"
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Power Supply Admin</h1>

        <div>
          <button onClick={loadBookings} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh Bookings"}
          </button>

          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <h2>Dashboard Overview</h2>

      <div className={styles.stats}>
        <div>
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>

        <div>
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div>
          <h3>{inProgress}</h3>
          <p>In Progress</p>
        </div>

        <div>
          <h3>{completed}</h3>
          <p>Completed</p>
        </div>
      </div>

      <h2>Customer Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.bookingTable}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Appliance</th>
                <th>Problem</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>#{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.appliance}</td>
                  <td>{booking.problem}</td>
                  <td>{booking.address}</td>

                  <td>
                    <select
                      value={booking.status || "Pending"}
                      onChange={(e) =>
                        updateStatus(booking.id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
