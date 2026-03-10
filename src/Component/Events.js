import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { BASE_URL, IMG_URL } from "./BaseUrl";
import Loader from "./Loader";
import "bootstrap-icons/font/bootstrap-icons.css";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch events
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/events_list`, {});
      if (res?.data?.status === "success") {
        setEvents(res.data.data || []);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.log(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // 📅 format date
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="container-fluid mt-3 pb-5">
      {/* PAGE TITLE */}
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-calendar-event fs-3 text-primary me-2"></i>
        <h5 className="fw-bold mb-0">Upcoming Events</h5>
      </div>

      {/* EMPTY */}
      {events.length === 0 && (
        <div className="text-center text-muted my-5">
          <i className="bi bi-calendar-x fs-1 d-block mb-2"></i>
          No events available
        </div>
      )}

      {/* EVENTS GRID */}
      <div className="row g-3">
        {events.map((item) => {
          const isVideo =
            item?.event_image &&
            item.event_image.toLowerCase().endsWith(".mp4");

          return (
            <div key={item.id} className="col-12">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ borderRadius: 16, overflow: "hidden" }}
              >
                {/* EVENT BANNER */}
                <div style={{ background: "#000" }}>
                  {item.event_image ? (
                    isVideo ? (
                      <ReactPlayer
                        url={`${IMG_URL}/events/${item.event_image}`}
                        width="100%"
                        height="200px"
                        controls
                      />
                    ) : (
                      <img
                        src={`${IMG_URL}/events/${item.event_image}`}
                        alt={item.event_title}
                        className="w-100"
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    )
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center text-muted"
                      style={{ height: 200, background: "#f5f5f5" }}
                    >
                      <i className="bi bi-image fs-1"></i>
                    </div>
                  )}
                </div>

                {/* EVENT BODY */}
                <div className="card-body">
                  {/* TITLE */}
                  <h6 className="fw-bold mb-2">{item.event_title}</h6>

                  {/* DATE + LOCATION */}
                  <div className="text-muted small mb-2">
                    <div>
                      <i className="bi bi-calendar3 me-2 text-primary"></i>
                      {formatDate(item.event_date)}
                    </div>
                    <div>
                      <i className="bi bi-geo-alt me-2 text-danger"></i>
                      {item.city || "--"}
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-muted small mb-3">
                    {item.event_info
                      ? item.event_info.length > 100
                        ? item.event_info.substring(0, 100) + "..."
                        : item.event_info
                      : "No description available"}
                  </p>

                  {/* FOOTER */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success">
                      ₹{item.event_fee || "0"}
                    </span>

                    <button
                      className="btn btn-sm fw-bold text-white"
                      style={{ backgroundColor: "#F37731" }}
                      onClick={() => navigate(`/event/${item.id}`)}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;