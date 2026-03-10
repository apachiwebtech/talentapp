import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import Loader from "./Loader";
import "bootstrap-icons/font/bootstrap-icons.css";
import Avatar from "@mui/material/Avatar";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const getInitials = (name) => {
    if (!name) return "E";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const getEventDetail = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/event_detail`, {
        event_id: id,
      });

      if (res.data.status === "success") {
        setEvent(res.data.data);
        setIsRegistered(res.data.data.is_registered || false);
        setQrCode(res.data.data.qr_code || "");
      } else {
        setEvent(null);
      }
    } catch (err) {
      console.log(err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventDetail();
  }, [id]);

  const registerMember = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/register_event_member`, {
        event_id: id,
      });

      if (res.data.success) {
        setIsRegistered(true);
        setQrCode(res.data.qr_code);
        localStorage.setItem("events_updated", Date.now());
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <Loader />;

  if (!event) {
    return (
      <div className="container py-5 text-center">
        <h5>Event not found</h5>
        <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const initials = getInitials(event.event_title);

  return (
    <div style={{ background: "#f6f8fb", minHeight: "100vh", padding:"55px 0px 5rem 0px"  }}>
      {/* 🔥 HERO */}
      <div style={{ position: "relative" }}>
        {event.event_image ? (
          <img
            src={`${IMG_URL}/events/${event.event_image}`}
            alt={event.event_title}
            className="w-100"
            style={{ height: 260, objectFit: "cover" }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-secondary text-white"
            style={{ height: 260 }}
          >
            <Avatar sx={{ width: 70, height: 70, fontSize: 28 }}>
              {initials}
            </Avatar>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1))",
          }}
        />

        {/* 💰 price */}
        <span
          className="fw-bold"
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            background: "#0d6efd",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 14,
          }}
        >
          ₹{event.event_fee || "0"}
        </span>

        {/* title on hero */}
        <div
          style={{
            position: "absolute",
            bottom: 15,
            left: 20,
            right: 20,
            color: "#fff",
          }}
        >
          
        </div>
      </div>

      {/* 📦 CONTENT */}
      <div className="container pb-5" style={{ marginTop: -30 }}>
        <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
          <div className="card-body p-4">
            <h4 className="fw-bold mb-1">{event.event_title}</h4>
          <div style={{ fontSize: 13 }}>
            <i className="bi bi-calendar3 me-2"></i>
            {formatDate(event.event_date)}
            <span className="mx-2">•</span>
            <i className="bi bi-geo-alt me-2"></i>
            {event.city || "-"}
          </div>

            {/* 📊 INFO GRID */}
            <div className="row g-3 mt-1">
              <InfoItem icon="bi-person-check" label="Registration" value={event.registration_type} />
              <InfoItem icon="bi-people" label="Capacity" value={event.venue_capacity} />
              <InfoItem icon="bi-building" label="Venue" value={event.venue} />
              <InfoItem icon="bi-geo" label="State" value={event.state} />
              <InfoItem icon="bi-mailbox" label="Pincode" value={event.pincode} />
            </div>

            <Section icon="bi-card-text" title="Event Information" text={event.event_info} />
            <Section icon="bi-list-check" title="Event Agenda" text={event.event_agenda} />

            {event.venue_address && (
              <Section icon="bi-geo-alt" title="Venue Address" text={event.venue_address} />
            )}

            {/* 🎟 register */}
            {!isRegistered ? (
              <button
                className="btn w-100 fw-bold mb-1 text-white"
                style={{
                  background: "linear-gradient(135deg,#ff7a18,#ffb347)",
                  height: 48,
                  borderRadius: 12,
                }}
                onClick={registerMember}
              >
                <i className="bi bi-ticket-perforated me-2"></i>
                Register Now
              </button>
            ) : (
              <div className="text-center mb-3">
                <div className="text-success fw-bold mb-2">
                  <i className="bi bi-check-circle me-2"></i>
                  You are registered
                </div>
                {qrCode && (
                  <img
                    src={qrCode}
                    alt="QR"
                    style={{
                      width: 170,
                      borderRadius: 12,
                      boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🔹 components */

const InfoItem = ({ icon, label, value }) => (
  <div className="col-6">
    <div
      className="p-3 h-100"
      style={{ background: "#f1f4f9", borderRadius: 12, fontSize: 13 }}
    >
      <div className="text-muted mb-1">
        <i className={`bi ${icon} me-2`}></i>
        {label}
      </div>
      <div className="fw-semibold">{value || "-"}</div>
    </div>
  </div>
);

const Section = ({ icon, title, text }) => (
  <>
    <h6 className="fw-bold mt-4">
      <i className={`bi ${icon} me-2 text-primary`}></i>
      {title}
    </h6>
    <p className="text-muted small">
      {text || "No information available"}
    </p>
  </>
);

export default EventDetail;