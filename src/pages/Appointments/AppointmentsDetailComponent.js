import React from "react";
import "./../../css/AppointmentsDet.css";
import withRouter from "../withRouter";

class AppointmentsDet extends React.Component {
  state = {
    appointment: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.getAppointment();
  }

  getAppointment = () => {
    const { id } = this.props.params;

    fetch(`http://localhost:8000/api/appointment/det/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("خطا در دریافت اطلاعات نوبت");
        }

        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message || "اطلاعات نوبت دریافت نشد.");
        }

        this.setState({
          appointment: result.data.appointment,
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

  formatNumber = (number) => {
    return new Intl.NumberFormat("fa-IR").format(Number(number || 0));
  };

  formatMoney = (number) => {
    return `${this.formatNumber(number)} تومان`;
  };

  getStatusData = (appointment) => {
    const status = appointment?.status;

    const data = {
      confirmed: {
        className: "confirmed",
        text: "تأیید شده",
        sideClass: "paid",
        sideIcon: (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </>
        ),
        bannerClass: "confirmed-banner",
      },
      completed: {
        className: "completed",
        text: "تکمیل‌شده",
        sideClass: "paid",
        sideIcon: (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </>
        ),
        bannerClass: "completed-banner",
      },
      cancelled: {
        className: "cancelled",
        text: "لغوشده",
        sideClass: "muted",
        sideIcon: null,
        bannerClass: "cancelled-banner",
      },
    };

    return (
      data[status] || {
        className: "completed",
        text: status || "نامشخص",
        sideClass: "muted",
        sideIcon: null,
        bannerClass: "completed-banner",
      }
    );
  };

  getPaymentStatus = (appointment) => {
    if (!appointment) {
      return {
        className: "muted",
        text: "وضعیت پرداخت نامشخص",
        icon: null,
      };
    }

    const transaction = appointment.transaction;

    const paidAmount =
      transaction?.paid_amount !== undefined &&
      transaction?.paid_amount !== null
        ? Number(transaction.paid_amount)
        : Number(appointment.deposit_amount || 0);

    if (appointment.payment_status === "paid") {
      return {
        className: "paid",
        text: `پرداخت کامل · ${this.formatMoney(paidAmount)}`,
        icon: (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </>
        ),
      };
    }

    if (appointment.payment_status === "partial") {
      return {
        className: "paid",
        text: `بیعانه پرداخت شد · ${this.formatMoney(paidAmount)}`,
        icon: (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </>
        ),
      };
    }

    return {
      className: "muted",
      text:
        appointment.status === "cancelled"
          ? "پرداختی انجام نشده"
          : "پرداخت نشده",
      icon: null,
    };
  };

  getRemainingAmount = (appointment) => {
    const transaction = appointment.transaction;

    if (
      transaction?.remaining_amount !== undefined &&
      transaction?.remaining_amount !== null
    ) {
      return Number(transaction.remaining_amount);
    }

    const amount = Number(appointment.amount || 0);
    const paidAmount = Number(appointment.deposit_amount || 0);

    return Math.max(amount - paidAmount, 0);
  };

  renderPayment = (appointment) => {
    const amount = Number(appointment.amount || 0);
    const transaction = appointment.transaction;

    const paidAmount =
      transaction?.paid_amount !== undefined &&
      transaction?.paid_amount !== null
        ? Number(transaction.paid_amount)
        : Number(appointment.deposit_amount || 0);

    const remainingAmount = this.getRemainingAmount(appointment);

    return (
      <div className="pay-card">
        <div className="pay-title">خلاصه پرداخت</div>

        <div className="pay-row">
          <span>جمع خدمت</span>
          <span>{this.formatMoney(amount)}</span>
        </div>

        {paidAmount > 0 && (
          <div className="pay-row">
            <span>
              {appointment.payment_status === "paid"
                ? "پرداخت‌شده"
                : "بیعانه پرداخت‌شده"}
            </span>
            <span className="neg">
              −{this.formatMoney(paidAmount)}
            </span>
          </div>
        )}

        {remainingAmount > 0 && (
          <div className="pay-row total">
            <span>مانده قابل پرداخت</span>
            <span>{this.formatMoney(remainingAmount)}</span>
          </div>
        )}

        {appointment.payment_status === "paid" &&
          remainingAmount === 0 && (
            <div className="pay-row total">
              <span>وضعیت پرداخت</span>
              <span>تسویه کامل</span>
            </div>
          )}

        {appointment.payment_status === "unpaid" && (
          <div className="pay-row total">
            <span>وضعیت پرداخت</span>
            <span>پرداخت نشده</span>
          </div>
        )}
      </div>
    );
  };

  renderActions = (appointment) => {
    if (!appointment || appointment.status !== "confirmed") {
      return null;
    }

    return (
      <div className="d-actions">
        <button
          className="act-btn"
          onClick={() => console.log("تغییر زمان نوبت", appointment.id)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <path d="M21 3v6h-6" />
          </svg>
          تغییر زمان نوبت
        </button>

        <button
          className="act-btn"
          onClick={() => console.log("تماس با کلینیک")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          تماس با کلینیک
        </button>

        <button
          className="act-btn danger"
          onClick={() => console.log("لغو نوبت", appointment.id)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6M9 9l6 6" />
          </svg>
          لغو نوبت
        </button>
      </div>
    );
  };

  render() {
    const { appointment, loading, error } = this.state;

    if (loading) {
      return (
        <div className="scroll-area">
          <div className="d-body">
            <div className="info-card">
              <div className="info-r">
                <span className="info-r-v">
                  در حال دریافت اطلاعات نوبت...
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="scroll-area">
          <div className="d-body">
            <div className="info-card">
              <div className="info-r">
                <span className="info-r-v">{error}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!appointment) {
      return (
        <div className="scroll-area">
          <div className="d-body">
            <div className="info-card">
              <div className="info-r">
                <span className="info-r-v">
                  اطلاعات نوبت پیدا نشد.
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const statusData = this.getStatusData(appointment);
    const paymentData = this.getPaymentStatus(appointment);

    const serviceName =
      appointment.service?.name ||
      appointment.service?.title ||
      "خدمت زیبایی";

    const serviceCategory =
      appointment.service?.category ||
      appointment.service?.category_name ||
      "خدمات زیبایی";

    const staff = appointment.assigned_staff;

    const providerName = staff
      ? staff.name ||
        `${staff.first_name || ""} ${staff.last_name || ""}`.trim() ||
        "پزشک / متخصص"
      : "پزشک / متخصص";

    const providerRole =
      staff?.ability || "پزشک / متخصص";

    const avatarParts = providerName
      .replace("دکتر", "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const avatar =
      avatarParts.length >= 2
        ? `${avatarParts[0].charAt(0)}‌${avatarParts[1].charAt(0)}`
        : avatarParts.length === 1
        ? avatarParts[0].substring(0, 2)
        : "د";

    const clinicName =
      appointment.clinic?.name || "کلینیک زیبایی لومیر";

    const clinicAddress =
      appointment.clinic?.address ||
      "تهران، خیابان ولیعصر، پلاک ۱۲، طبقه ۳";

    const clinicPhone =
      appointment.clinic?.phone || "۰۲۱-۸۸۷۷۶۶۵۵";

    return (
      <>
        <div className="d-header">
          <button
            className="icon-btn"
            aria-label="بازگشت"
            onClick={() => window.history.back()}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="scroll-area">
          <div className={`d-banner ${statusData.bannerClass}`}>
            <div className="d-eyebrow">
              {serviceCategory}
            </div>

            <h1 className="d-title">
              {serviceName}
            </h1>

            <div className="d-provider">
              <span className="d-avatar">
                {avatar}
              </span>

              <div>
                <div className="d-pname">
                  {providerName}
                </div>

                <div className="d-prole">
                  {providerRole}
                </div>
              </div>
            </div>
          </div>

          <div className="d-body">
            <div className="status-row">
              <span
                className={`status-pill ${statusData.className}`}
              >
                {statusData.text}
              </span>

              <span
                className={`status-side ${paymentData.className}`}
              >
                {paymentData.icon && (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {paymentData.icon}
                  </svg>
                )}

                {paymentData.text}
              </span>
            </div>

            <div className="info-card">
              <div className="info-r">
                <span className="info-r-l">
                  <svg
                    width="15"
                    height="15"
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
                  تاریخ
                </span>

                <span className="info-r-v">
                  {appointment.appointment_date_fa}
                </span>
              </div>

              <div className="info-r">
                <span className="info-r-l">
                  <svg
                    width="15"
                    height="15"
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
                  ساعت
                </span>

                <span className="info-r-v">
                  {appointment.appointment_time_fa}
                </span>
              </div>

              <div className="info-r">
                <span className="info-r-l">
                  <svg
                    width="15"
                    height="15"
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
                  مدت‌زمان
                </span>

                <span className="info-r-v">
                  {this.formatNumber(
                    appointment.duration_minutes
                  )}{" "}
                  دقیقه
                </span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-r">
                <span className="info-r-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle
                      cx="12"
                      cy="10"
                      r="3"
                    />
                  </svg>
                  کلینیک
                </span>

                <span className="info-r-v">
                  {clinicName}
                </span>
              </div>

              <div className="info-r">
                <span className="info-r-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle
                      cx="12"
                      cy="10"
                      r="3"
                    />
                  </svg>
                  آدرس
                </span>

                <span className="info-r-v info-address">
                  {clinicAddress}
                </span>
              </div>

              <div className="info-r">
                <span className="info-r-l">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  تلفن
                </span>

                <span className="info-r-v info-phone">
                  {clinicPhone}
                </span>
              </div>
            </div>

            {this.renderPayment(appointment)}

            {this.renderActions(appointment)}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(AppointmentsDet);