import React from "react";
import "./../../css/Appointments.css";
import AppointmentItem from "./AppointmentItemComponent";
import { Link } from "react-router-dom";

class Appointments extends React.Component {
  state = {
    activeTab: "upcoming",
    appointments: {
      upcoming: [],
      past: [],
      cancelled: [],
    },
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.getAppointments();
  }

  getAppointments = () => {
    fetch("http://localhost:8000/api/appointments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("خطا در دریافت نوبت‌ها");
        }

        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          throw new Error(
            result.message || "نوبت‌ها دریافت نشدند."
          );
        }

        this.setState({
          appointments: result.data,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error(error);

        this.setState({
          loading: false,
          error: error.message,
        });
      });
  };

  handleTabChange = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  getProviderName = (appointment) => {
    const staff = appointment?.assigned_staff;

    if (!staff) {
      return "پزشک / متخصص";
    }

    return (
      staff.name ||
      `${staff.first_name || ""} ${staff.last_name || ""}`.trim() ||
      "پزشک / متخصص"
    );
  };

  getAvatar = (appointment) => {
    const name = this.getProviderName(appointment);

    const parts = name
      .replace("دکتر", "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}‌${parts[1].charAt(0)}`;
    }

    if (parts.length === 1) {
      return parts[0].substring(0, 2);
    }

    return "د";
  };

  getStatus = (appointment) => {
    const statuses = {
      confirmed: {
        text: "تأیید شده",
        className: "confirmed",
      },
      completed: {
        text: "تکمیل‌شده",
        className: "completed",
      },
      cancelled: {
        text: "لغوشده",
        className: "cancelled",
      },
    };

    return (
      statuses[appointment?.status] || {
        text: appointment?.status || "نامشخص",
        className: "completed",
      }
    );
  };

  renderAppointmentItem = (appointment, showSolidButton = false, noMargin = false) => {
    const status = this.getStatus(appointment);

    return (
      <AppointmentItem
        key={appointment.id}
        id={appointment.id}
        avatar={this.getAvatar(appointment)}
        name={
          appointment.service?.name ||
          appointment.service?.title ||
          "خدمت زیبایی"
        }
        provider={this.getProviderName(appointment)}
        status={status.text}
        statusClass={status.className}
        date={appointment.appointment_date_fa}
        time={appointment.appointment_time_fa}
        duration={`${this.formatNumber(
          appointment.duration_minutes
        )} دقیقه`}
        detailStatus={appointment.status}
        showSolidButton={showSolidButton}
        noMargin={noMargin}
      />
    );
  };

  formatNumber = (number) => {
    return new Intl.NumberFormat("fa-IR").format(
      Number(number || 0)
    );
  };

  render() {
    const {
      activeTab,
      appointments,
      loading,
      error,
    } = this.state;

    if (loading) {
      return (
        <div className="scroll-area">
          <div className="tab-panel active">
            <div className="sec-label">
              در حال دریافت نوبت‌ها...
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="scroll-area">
          <div className="tab-panel active">
            <div className="sec-label">
              {error}
            </div>
          </div>
        </div>
      );
    }

    const upcoming = appointments.upcoming || [];
    const past = appointments.past || [];
    const cancelled = appointments.cancelled || [];

    const nextAppointment = upcoming[0];
    const otherUpcoming = upcoming.slice(1);

    return (
      <>
        <header className="appt-header">
          <button
            className="bell-btn"
            aria-label="اعلان‌ها"
          >
            <span className="bell-dot"></span>

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
        </header>

        <div className="tabs-row">
          <button
            className={`tab-btn ${
              activeTab === "upcoming" ? "active" : ""
            }`}
            onClick={() =>
              this.handleTabChange("upcoming")
            }
          >
            پیش‌رو
          </button>

          <button
            className={`tab-btn ${
              activeTab === "past" ? "active" : ""
            }`}
            onClick={() =>
              this.handleTabChange("past")
            }
          >
            گذشته
          </button>

          <button
            className={`tab-btn ${
              activeTab === "cancelled" ? "active" : ""
            }`}
            onClick={() =>
              this.handleTabChange("cancelled")
            }
          >
            لغوشده
          </button>
        </div>

        <div className="scroll-area">
          {activeTab === "upcoming" && (
            <div className="tab-panel active">
              {nextAppointment ? (
                <>
                  <div className="sec-label">
                    نوبت بعدی
                  </div>

                  <div className="next-appt-card">
                    <div className="next-appt-top">
                      <span className="next-appt-eyebrow">
                        {nextAppointment.service?.category ||
                          nextAppointment.service?.category_name ||
                          "خدمات زیبایی"}
                      </span>

                      <span className="status-pill on-dark">
                        {this.getStatus(nextAppointment).text}
                      </span>
                    </div>

                    <div className="next-appt-title">
                      {nextAppointment.service?.name ||
                        nextAppointment.service?.title ||
                        "خدمت زیبایی"}
                    </div>

                    <div className="next-appt-provider">
                      <span className="appt-avatar">
                        {this.getAvatar(nextAppointment)}
                      </span>

                      <div>
                        <div className="next-appt-pname">
                          {this.getProviderName(nextAppointment)}
                        </div>

                        <div className="next-appt-prole">
                          {nextAppointment.assigned_staff?.ability ||
                            "پزشک / متخصص"}
                        </div>
                      </div>
                    </div>

                    <div className="next-appt-datebox">
                      <span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                          />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>

                        {nextAppointment.appointment_date_fa}
                      </span>

                      <span className="sep2"></span>

                      <span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                          />
                          <path d="M12 6v6l4 2" />
                        </svg>

                        {nextAppointment.appointment_time_fa} ·{" "}
                        {this.formatNumber(
                          nextAppointment.duration_minutes
                        )}{" "}
                        دقیقه
                      </span>
                    </div>

                    <div className="next-appt-deposit">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />
                        <path d="m9 12 2 2 4-4" />
                      </svg>

                      {nextAppointment.payment_status === "paid"
                        ? `پرداخت کامل · ${this.formatNumber(
                            nextAppointment.transaction?.paid_amount ||
                              nextAppointment.amount
                          )} تومان`
                        : `بیعانه پرداخت شد · ${this.formatNumber(
                            nextAppointment.transaction?.paid_amount ||
                              nextAppointment.deposit_amount
                          )} تومان`}
                    </div>

                    <div className="next-appt-btns">
                      <Link
                        to={`/appointments/detail/${nextAppointment.id}`}
                        className="btn-white"
                      >
                        مشاهده جزئیات
                      </Link>

                      <button className="btn-ghost-white">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m3 11 19-9-9 19-2-8-8-2z" />
                        </svg>

                        مسیریابی
                      </button>
                    </div>
                  </div>

                  {otherUpcoming.length > 0 && (
                    <>
                      <div className="also-head">
                        <span
                          className="sec-label"
                          style={{ marginBottom: 0 }}
                        >
                          سایر نوبت‌های پیش‌رو
                        </span>

                        <span className="also-more-link">
                          {this.formatNumber(otherUpcoming.length)} مورد دیگر
                        </span>
                      </div>

                      {otherUpcoming.map((appointment) =>
                        this.renderAppointmentItem(
                          appointment
                        )
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="sec-label">
                  نوبت پیش‌رویی وجود ندارد.
                </div>
              )}
            </div>
          )}

          {activeTab === "past" && (
            <div className="tab-panel active">
              <div className="sec-label">
                نوبت‌های گذشته
              </div>

              {past.length > 0 ? (
                past.map((appointment) =>
                  this.renderAppointmentItem(
                    appointment,
                    true,
                    appointment.id === past[past.length - 1]?.id
                  )
                )
              ) : (
                <div className="sec-label">
                  نوبت گذشته‌ای وجود ندارد.
                </div>
              )}
            </div>
          )}

          {activeTab === "cancelled" && (
            <div className="tab-panel active">
              <div className="sec-label">
                نوبت‌های لغوشده
              </div>

              {cancelled.length > 0 ? (
                cancelled.map((appointment) =>
                  this.renderAppointmentItem(
                    appointment,
                    true,
                    appointment.id === cancelled[cancelled.length - 1]?.id
                  )
                )
              ) : (
                <div className="sec-label">
                  نوبت لغوشده‌ای وجود ندارد.
                </div>
              )}
            </div>
          )}

          <a
            href="client-consultation-flow.html"
            className="fab-book"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>

            رزرو جدید
          </a>
        </div>
      </>
    );
  }
}

export default Appointments;