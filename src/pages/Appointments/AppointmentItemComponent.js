import React from "react";

class AppointmentItem extends React.Component {
  render() {
    const {
      avatar,
      name,
      provider,
      status,
      statusClass,
      date,
      time,
      duration,
      detailStatus,
      showSolidButton = false,
      noMargin = false,
    } = this.props;

    return (
      <div
        className={`appt-card ${noMargin ? "mb-0" : ""}`}
        style={noMargin ? { marginBottom: 0 } : {}}
      >
        <div className="appt-card-top">
          <span className="appt-avatar2">{avatar}</span>

          <div className="appt-card-info">
            <div className="appt-card-name">{name}</div>
            <div className="appt-card-provider">{provider}</div>
          </div>

          <span className={`status-pill ${statusClass}`}>
            {status}
          </span>
        </div>

        <div className="appt-card-meta">
          <span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>

            {date}
          </span>

          <span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>

            {time} · {duration}
          </span>
        </div>

        {showSolidButton ? (
          <div className="appt-card-btns">
            <a
              href={`client-appointment-detail.html?status=${detailStatus}`}
              className="btn-sm-outline"
            >
              مشاهده جزئیات
            </a>

            <button className="btn-sm-solid">
              رزرو مجدد
            </button>
          </div>
        ) : (
          <a
            href={`client-appointment-detail.html?status=${detailStatus}`}
            className="btn-sm-outline"
            style={{ display: "block" }}
          >
            مشاهده جزئیات
          </a>
        )}
      </div>
    );
  }
}

export default AppointmentItem;