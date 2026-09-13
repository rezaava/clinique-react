import React from "react";
import "./../../css/Journey.css";

import TreatmentItem from "./TreatmentItemComponent";
import SpecialItem from "./SpecialItemComponent";
import ReminderItem from "./ReminderItemComponent";

class Journey extends React.Component {
  state = {
    progressPhotosOpen: true,

    treatments: [
      {
        id: 1,
        name: "بوتاکس",
        date: "۲۲ اردیبهشت ۱۴۰۴",
        doctor: "دکتر سارا کاویانی",
        status: "تکمیل‌شده",
        description:
          "خطوط پیشانی و بین ابرو. ۲۰ واحد با دقت بالا تزریق شد.",
        afterCare:
          "به مدت ۲۴ ساعت از فعالیت سنگین خودداری کنید. تا ۴ ساعت دراز نکشید. از ماساژ صورت پرهیز کنید.",
        open: true,
      },
      {
        id: 2,
        name: "هیدرافیشیال",
        date: "۵ اسفند ۱۴۰۳",
        doctor: "دکتر سارا کاویانی",
        status: "تکمیل‌شده",
        description:
          "پاکسازی عمقی، لایه‌برداری ملایم و تزریق سرم‌های آبرسان برای شادابی فوری پوست.",
        afterCare:
          "تا ۲۴ ساعت از آرایش سنگین خودداری کنید و ضدآفتاب رو فراموش نکنید.",
        open: false,
      },
      {
        id: 3,
        name: "مشاوره اولیه",
        date: "۲۵ دی ۱۴۰۳",
        doctor: "دکتر لیلا فرهام",
        status: "تکمیل‌شده",
        description:
          "بررسی نوع پوست، دغدغه‌ها و هدف‌گذاری برای برنامه درمانی اختصاصی.",
        afterCare:
          "نیازی به مراقبت خاصی نیست — نتایج مشاوره در پرونده شما ثبت شد.",
        open: false,
      },
    ],

    specialItems: [
      {
        id: 1,
        type: "pink",
        eyebrow: "۴ هفته پس از بوتاکس",
        title: "مشاوره پیگیری",
        description:
          "نتایجتون رو با دکتر سارا بررسی کنید و مرحله بعدی درمان رو برنامه‌ریزی کنید.",
        link: "client-consultation-flow.html",
        iconPath:
          "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z",
      },
      {
        id: 2,
        type: "pink",
        eyebrow: "بر اساس آنالیز پوست شما",
        title: "سرم ویتامین C",
        description:
          "هر روز صبح قبل از ضدآفتاب استفاده کنید تا پوستتون روشن‌تر بشه و نتایج حفظ بشه.",
        link: null,
        iconPath:
          "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z",
      },
      {
        id: 3,
        type: "blue jfy-blue-card",
        eyebrow: "ضروری پس از درمان",
        title: "ضدآفتاب SPF ۵۰ روزانه",
        description:
          "از نواحی تحت درمان محافظت می‌کنه و نتایج بوتاکستون رو ماندگارتر می‌کنه.",
        link: null,
        iconPath:
          "M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z",
      },
    ],

    reminders: [
      {
        id: 1,
        text: "به مدت ۲۴ ساعت پس از تزریق بوتاکس از فعالیت سنگین خودداری کنید",
        iconPath: "M12 6v6l4 2",
        circle: true,
      },
      {
        id: 2,
        text: "روزانه ۸ لیوان آب بنوشید تا روند بهبود پوست تقویت بشه",
        iconPath:
          "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z",
      },
      {
        id: 3,
        text: "هر روز صبح ضدآفتاب SPF ۵۰ بزنید — در صورت بیرون بودن، ظهر دوباره تجدید کنید",
        iconPath:
          "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
      },
      {
        id: 4,
        text: "تا ۶ ساعت از لمس یا ماساژ نواحی تحت درمان خودداری کنید",
        iconPath:
          "M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z",
        last: true,
      },
    ],
  };

  handleProgressPhotosToggle = () => {
    this.setState((prevState) => ({
      progressPhotosOpen: !prevState.progressPhotosOpen,
    }));
  };

  render() {
    const {
      treatments,
      specialItems,
      reminders,
      progressPhotosOpen,
    } = this.state;

    return (
      <>
        <header className="j-header">
          <button
            className="icon-btn"
            aria-label="بازگشت"
            onClick={() => (window.location.href = "client-home.html")}
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

          <div className="head-actions">
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

            <span className="avatar-chip">آ‌م</span>
          </div>
        </header>

        <div className="scroll-area">
          <div className="j-banner">
            <div className="j-top-row">
              <span className="j-eyebrow">خوش برگشتید</span>
              <span className="j-since">از دی ۱۴۰۳</span>
            </div>

            <div className="j-name">آمینا مرادی</div>

            <div className="j-stat-row">
              <div className="j-stat-box">
                <div className="j-stat-num">۳</div>
                <div className="j-stat-lbl">جلسه درمان</div>
              </div>

              <div className="j-stat-box">
                <div className="j-stat-num">۷ ماه</div>
                <div className="j-stat-lbl">سفر شما</div>
              </div>

              <div className="j-stat-box">
                <div className="j-stat-num">۴/۵</div>
                <div className="j-stat-lbl">مرحله</div>
              </div>
            </div>

            <button className="j-next-row">
              <span className="j-next-dot"></span>

              <span className="j-next-txt">
                <div className="j-next-eyebrow">قدم بعدی شما</div>
                <div className="j-next-title">مشاوره پیگیری</div>
              </span>

              <span className="j-next-chev">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </span>
            </button>
          </div>

          <h2 className="sec-h">سفر زیبایی شما</h2>
          <p className="sec-s">شما در مرحله پیگیری هستید</p>

          <div className="timeline-card">
            <div className="tl-item">
              <div className="tl-line"></div>

              <span className="tl-dot">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>

              <div className="tl-body">
                <div>
                  <div className="tl-name">مشاوره اولیه</div>
                  <div className="tl-date">۲۵ دی</div>
                </div>

                <span className="tl-status">انجام‌شده</span>
              </div>
            </div>

            <div className="tl-item">
              <div className="tl-line"></div>

              <span className="tl-dot">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>

              <div className="tl-body">
                <div>
                  <div className="tl-name">نوبت‌دهی</div>
                  <div className="tl-date">۱۴ بهمن</div>
                </div>

                <span className="tl-status">انجام‌شده</span>
              </div>
            </div>

            <div className="tl-item">
              <div className="tl-line"></div>

              <span className="tl-dot">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>

              <div className="tl-body">
                <div>
                  <div className="tl-name">درمان</div>
                  <div className="tl-date">۲۲ اردیبهشت</div>
                </div>

                <span className="tl-status">انجام‌شده</span>
              </div>
            </div>

            <div className="tl-item">
              <div className="tl-line"></div>

              <span className="tl-dot active-dot">
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
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z" />
                </svg>
              </span>

              <div className="tl-body">
                <div>
                  <div className="tl-name">پیگیری</div>
                  <div className="tl-date">در حال انجام</div>
                </div>

                <span className="tl-status pill-active">فعال</span>
              </div>
            </div>

            <div className="tl-item">
              <span className="tl-dot upcoming">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              </span>

              <div className="tl-body">
                <div>
                  <div className="tl-name muted">ویزیت بعدی</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="sec-h">درمان‌های شما</h2>

          <p className="sec-s">
            برای مشاهده جزئیات روی کارت ضربه بزنید
          </p>

          <div id="treatmentsList">
            {treatments.map((treatment) => (
              <TreatmentItem
                key={treatment.id}
                treatment={treatment}
              />
            ))}
          </div>

          <h2 className="sec-h next-section-title">
            مرحله بعدی چیست؟
          </h2>

          <div className="next-section-space"></div>

          <div className="next-card">
            <div className="next-top">
              <span className="next-ic-box">
                <svg
                  width="22"
                  height="22"
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
              </span>

              <div>
                <div className="next-title2">مشاوره پیگیری</div>

                <div className="next-sub2">
                  توصیه‌شده ظرف ۲ هفته آینده
                </div>

                <div className="next-doc">
                  دکتر سارا کاویانی · کلینیک زیبایی لومیر
                </div>
              </div>
            </div>

            <div className="next-steps">
              <div className="next-step-row">
                <span className="next-step-num">۱</span>
                بررسی نتایج بوتاکس با دکتر سارا
              </div>

              <div className="next-step-row">
                <span className="next-step-num">۲</span>
                بحث درباره اصلاحات یا تزریق تکمیلی در صورت نیاز
              </div>

              <div className="next-step-row">
                <span className="next-step-num">۳</span>
                برنامه‌ریزی برای مرحله بعدی سفر زیباییتون
              </div>
            </div>

            <a
              href="client-consultation-flow.html"
              className="btn-solid-full"
            >
              رزرو نوبت
            </a>
          </div>

          <h2 className="sec-h">مخصوص شما</h2>

          <p className="sec-s">بر اساس آخرین درمانتون</p>

          <div>
            {specialItems.map((item) => (
              <SpecialItem
                key={item.id}
                item={item}
              />
            ))}
          </div>

          <div className={`pp-wrap ${progressPhotosOpen ? "open" : ""}`}>
            <button
              className="pp-head"
              onClick={this.handleProgressPhotosToggle}
              type="button"
            >
              <span className="pp-ic">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 2-1.5 2h-3A1.5 1.5 0 0 0 3 5.5v12A1.5 1.5 0 0 0 4.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 19.5 4h-3L15 2Z" />
                  <circle cx="12" cy="11" r="4" />
                </svg>
              </span>

              <span className="pp-title">
                عکس‌های روند پیشرفت
              </span>

              <span className="pp-chev">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            {progressPhotosOpen && (
              <div className="pp-body">
                <div className="pp-body-in">
                  <div className="pp-caption">
                    روند پیشرفت از دی ۱۴۰۳ · ۴ ماه درمان
                  </div>

                  <div className="pp-grid">
                    <div className="pp-photo">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9Z" />
                        <circle cx="12" cy="13" r="3.5" />
                      </svg>

                      <div className="pp-label">
                        <div className="pp-label-t">قبل</div>
                        <div className="pp-label-d">
                          دی ۱۴۰۳
                        </div>
                      </div>
                    </div>

                    <div className="pp-photo">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9Z" />
                        <circle cx="12" cy="13" r="3.5" />
                      </svg>

                      <div className="pp-label">
                        <div className="pp-label-t">بعد</div>

                        <div className="pp-label-d">
                          اردیبهشت ۱۴۰۴
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pp-privacy">
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
                      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
                    </svg>

                    خصوصی — فقط برای شما و متخصصتون قابل مشاهده‌ست
                  </div>
                </div>
              </div>
            )}
          </div>

          <h2 className="sec-h">یادآوری‌های مراقبتی</h2>

          <p className="sec-s">
            از طرف دکتر سارا کاویانی
          </p>

          <div>
            {reminders.map((reminder) => (
              <ReminderItem
                key={reminder.id}
                reminder={reminder}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Journey;