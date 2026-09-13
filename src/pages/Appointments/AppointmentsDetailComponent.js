import React from "react";
import "./../../css/AppointmentsDet.css";

class AppointmentsDet extends React.Component {
  render() {
    return (
      <>
        <div className="d-header">
          <button
            className="icon-btn"
            aria-label="بازگشت"
            onClick={() => (window.location.href = "client-appointments.html")}
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
          {/* Banner */}
          <div
            className="d-banner"
            id="banner"
            style={{
              background:
                "linear-gradient(135deg,var(--brand),var(--brand-dark))",
            }}
          >
            <div className="d-eyebrow">مراقبت پوست</div>

            <h1 className="d-title">درمان آبرسانی صورت</h1>

            <div className="d-provider">
              <span className="d-avatar">ل‌ا</span>

              <div>
                <div className="d-pname">دکتر لیلا احمدی</div>
                <div className="d-prole">متخصص ارشد زیبایی</div>
              </div>
            </div>
          </div>

          <div className="d-body">
            {/* Status */}
            <div className="status-row">
              <span className="status-pill confirmed">
                تأیید شده
              </span>

              <span className="status-side paid">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>

                بیعانه پرداخت شد · ۲۵۰٬۰۰۰ تومان
              </span>
            </div>

            {/* Date / Time / Duration */}
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
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>

                  تاریخ
                </span>

                <span className="info-r-v">
                  فردا، چهارشنبه ۱۸ شهریور
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>

                  ساعت
                </span>

                <span className="info-r-v">۱۱:۰۰</span>
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>

                  مدت‌زمان
                </span>

                <span className="info-r-v">۶۰ دقیقه</span>
              </div>
            </div>

            {/* Clinic information */}
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
                    <circle cx="12" cy="10" r="3" />
                  </svg>

                  کلینیک
                </span>

                <span className="info-r-v">
                  کلینیک زیبایی لومیر
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
                    <circle cx="12" cy="10" r="3" />
                  </svg>

                  آدرس
                </span>

                <span
                  className="info-r-v"
                  style={{ maxWidth: "60%" }}
                >
                  تهران، خیابان ولیعصر، پلاک ۱۲، طبقه ۳
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

                <span
                  className="info-r-v"
                  style={{ direction: "ltr" }}
                >
                  ۰۲۱-۸۸۷۷۶۶۵۵
                </span>
              </div>
            </div>

            {/* Payment */}
            <div className="pay-card">
              <div className="pay-title">خلاصه پرداخت</div>

              <div className="pay-row">
                <span>جمع خدمت</span>
                <span>۱٬۱۰۰٬۰۰۰ تومان</span>
              </div>

              <div className="pay-row">
                <span>بیعانه پرداخت‌شده</span>
                <span className="neg">
                  −۲۵۰٬۰۰۰ تومان
                </span>
              </div>

              <div className="pay-row total">
                <span>مانده قابل پرداخت</span>
                <span>۸۵۰٬۰۰۰ تومان</span>
              </div>
            </div>

            {/* Actions */}
            <div className="d-actions">
              <button className="act-btn">
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

              <button className="act-btn">
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

              <button className="act-btn danger">
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
          </div>
        </div>
      </>
    );
  }
}

export default AppointmentsDet;