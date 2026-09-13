import React from "react";
import "./../../css/Appointments.css";

import AppointmentItem from "./AppointmentItemComponent";

class Appointments extends React.Component {
  state = {
    activeTab: "upcoming",
  };

  handleTabChange = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <>
        <header className="appt-header">
          <button className="bell-btn" aria-label="اعلان‌ها">
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

        {/* Tabs */}
        <div className="tabs-row">
          <button
            className={`tab-btn ${
              activeTab === "upcoming" ? "active" : ""
            }`}
            onClick={() => this.handleTabChange("upcoming")}
          >
            پیش‌رو
          </button>

          <button
            className={`tab-btn ${
              activeTab === "past" ? "active" : ""
            }`}
            onClick={() => this.handleTabChange("past")}
          >
            گذشته
          </button>

          <button
            className={`tab-btn ${
              activeTab === "cancelled" ? "active" : ""
            }`}
            onClick={() => this.handleTabChange("cancelled")}
          >
            لغوشده
          </button>
        </div>

        <div className="scroll-area">
          {/* ==================== UPCOMING ==================== */}

          {activeTab === "upcoming" && (
            <div className="tab-panel active">
              <div className="sec-label">
                نوبت بعدی
              </div>

              {/* Next appointment */}
              <div className="next-appt-card">
                <div className="next-appt-top">
                  <span className="next-appt-eyebrow">
                    مراقبت پوست
                  </span>

                  <span className="status-pill on-dark">
                    تأیید شده
                  </span>
                </div>

                <div className="next-appt-title">
                  درمان آبرسانی صورت
                </div>

                <div className="next-appt-provider">
                  <span className="appt-avatar">
                    ل‌ا
                  </span>

                  <div>
                    <div className="next-appt-pname">
                      دکتر لیلا احمدی
                    </div>

                    <div className="next-appt-prole">
                      متخصص ارشد زیبایی
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

                    فردا، چهارشنبه ۱۸ شهریور
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>

                    ۱۱:۰۰ · ۶۰ دقیقه
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>

                  بیعانه پرداخت شد · ۲۵۰٬۰۰۰ تومان
                </div>

                <div className="next-appt-btns">
                  <a
                    href="client-appointment-detail.html?status=confirmed"
                    className="btn-white"
                  >
                    مشاهده جزئیات
                  </a>

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

              {/* Other upcoming appointments */}
              <div className="also-head">
                <span
                  className="sec-label"
                  style={{ marginBottom: 0 }}
                >
                  سایر نوبت‌های پیش‌رو
                </span>

                <span className="also-more-link">
                  ۱ مورد دیگر
                </span>
              </div>

              <AppointmentItem
                avatar="س‌ر"
                name="اصلاح و رنگ ابرو"
                provider="سوگند رسولی"
                status="تأیید شده"
                statusClass="confirmed"
                date="دوشنبه، ۱۸ شهریور"
                time="۱۴:۳۰"
                duration="۴۵ دقیقه"
                detailStatus="confirmed"
              />
            </div>
          )}

          {/* ==================== PAST ==================== */}

          {activeTab === "past" && (
            <div className="tab-panel active">
              <div className="sec-label">
                نوبت‌های گذشته
              </div>

              <AppointmentItem
                avatar="ن‌ک"
                name="ماساژ عمقی پشت"
                provider="نادیا کریمی"
                status="تکمیل‌شده"
                statusClass="completed"
                date="سه‌شنبه، ۱۵ مرداد"
                time="۱۰:۰۰"
                duration="۷۵ دقیقه"
                detailStatus="completed"
                showSolidButton={true}
              />

              <AppointmentItem
                avatar="ل‌ا"
                name="لایه‌برداری شیمیایی سبک"
                provider="دکتر لیلا احمدی"
                status="تکمیل‌شده"
                statusClass="completed"
                date="پنجشنبه، ۲ مرداد"
                time="۱۳:۰۰"
                duration="۵۰ دقیقه"
                detailStatus="completed"
                showSolidButton={true}
              />

              <AppointmentItem
                avatar="س‌ر"
                name="لیفت و رنگ مژه"
                provider="سوگند رسولی"
                status="تکمیل‌شده"
                statusClass="completed"
                date="شنبه، ۲۱ تیر"
                time="۱۵:۳۰"
                duration="۶۰ دقیقه"
                detailStatus="completed"
                showSolidButton={true}
                noMargin={true}
              />
            </div>
          )}

          {/* ==================== CANCELLED ==================== */}

          {activeTab === "cancelled" && (
            <div className="tab-panel active">
              <div className="sec-label">
                نوبت‌های لغوشده
              </div>

              <AppointmentItem
                avatar="ن‌ک"
                name="اسکراب و پک بدن کامل"
                provider="نادیا کریمی"
                status="لغوشده"
                statusClass="cancelled"
                date="پنجشنبه، ۲۴ مرداد"
                time="۱۲:۰۰"
                duration="۹۰ دقیقه"
                detailStatus="cancelled"
                showSolidButton={true}
                noMargin={true}
              />
            </div>
          )}

          {/* New appointment */}
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