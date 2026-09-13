import React from "react";
import "./../../css/SpecialistProfile.css";

import SpecialtyItem from "./SpecialtyItemComponent";
import ReviewItem from "./ReviewItemComponent";
import CredentialItem from "./CredentialItemComponent";

class SpecialistProfile extends React.Component {
    tags = [
    {
      id: 1,
      name: "هارمونی صورت"
    },
    {
      id: 2,
      name: "سلامت پوست"
    },
    {
      id: 3,
      name: "غیرجراحی"
    },
    {
      id: 4,
      name: "ضدپیری"
    },
    {
      id: 5,
      name: "کم‌تهاجمی"
    }
  ];
  specialties = [
    {
      id: 1,
      name: "بوتاکس"
    },
    {
      id: 2,
      name: "فیلر"
    },
    {
      id: 3,
      name: "لیزر"
    },
    {
      id: 4,
      name: "جوان‌سازی پوست"
    },
    {
      id: 5,
      name: "مزوتراپی"
    }
  ];

  reviews = [
    {
      id: 1,
      avatar: "س‌م",
      name: "س. محمدی",
      stars: "★★★★★",
      tag: "بوتاکس",
      date: "۲ هفته پیش",
      text: "دکتر مرادی فوق‌العاده حرفه‌ای بود. نتیجه کاملاً طبیعی به نظر می‌رسید و در تمام مدت احساس آرامش کامل داشتم."
    },
    {
      id: 2,
      avatar: "ا‌ر",
      name: "ا. رضوی",
      stars: "★★★★★",
      tag: "فیلر",
      date: "۱ ماه پیش",
      text: "تخصص فوق‌العاده‌ای داشت. به دغدغه‌های من گوش داد و دقیقاً همون چیزی که می‌خواستم رو ارائه داد — نه بیشتر، نه کمتر."
    },
    {
      id: 3,
      avatar: "ل‌ک",
      name: "ل. کریمی",
      stars: "★★★★☆",
      tag: "جوان‌سازی پوست",
      date: "۶ هفته پیش",
      text: "مشاوره خیلی کامل بود. از این‌که هر مرحله رو قبل و حین درمان توضیح می‌داد قدردانی می‌کنم."
    }
  ];

  credentials = [
    {
      id: 1,
      title: "دارای بورد تخصصی",
      text: "پزشکی زیبایی و آرایشی",
      type: "board"
    },
    {
      id: 2,
      title: "فلوشیپ بین‌المللی",
      text: "زیبایی پیشرفته صورت، لندن",
      type: "fellowship"
    },
    {
      id: 3,
      title: "عضو",
      text: "انجمن اروپایی پزشکی زیبایی",
      type: "member"
    }
  ];

  getCredentialIcon = (type) => {
    if (type === "board") {
      return (
        <svg
          width="19"
          height="19"
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
      );
    }

    if (type === "fellowship") {
      return (
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M9.5 13.5 7 21l5-3 5 3-2.5-7.5" />
        </svg>
      );
    }

    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  };

  render() {
    return (
      <>
        <header className="page-header" id="pageHeader">
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

          <h1 className="page-title-sp">متخصص</h1>

          <div className="head-actions">
            <button
              className="icon-btn"
              id="likeBtn"
              aria-label="علاقه‌مندی"
            >
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
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z" />
              </svg>
            </button>

            <button
              className="icon-btn"
              aria-label="اشتراک‌گذاری"
            >
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
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="m8.6 13.5 6.8 3.9M15.4 6.6 8.6 10.5" />
              </svg>
            </button>
          </div>
        </header>

        <div className="scroll-area" id="scrollArea">
          <div className="spec-hero">
            <div className="spec-hero-bg"></div>

            <div className="spec-hero-silhouette">
              <svg
                width="180"
                height="260"
                viewBox="0 0 180 260"
                fill="none"
                opacity=".55"
              >
                <ellipse
                  cx="90"
                  cy="90"
                  rx="52"
                  ry="62"
                  fill="#fff"
                  fillOpacity=".18"
                />
                <path
                  d="M40 260c0-45 22-80 50-80s50 35 50 80"
                  fill="#fff"
                  fillOpacity=".18"
                />
              </svg>
            </div>

            <div className="spec-hero-fade"></div>

            <div className="spec-hero-content">
              <div className="spec-name-row">
                <h2 className="spec-name">دکتر آریانا مرادی</h2>

                <span className="verified-badge">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path
                      d="m8 12.5 2.5 2.5L16 9"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </div>

              <div className="spec-role">
                پزشک زیبایی · متخصص پوست
              </div>

              <div className="spec-rate-row">
                <span className="spec-stars-ic">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>

                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                </span>

                <span className="spec-rn">۴.۹</span>
                <span>· ۳۱۸ نظر</span>

                <span className="spec-sep">|</span>

                <span className="spec-experience">
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

                  ۸ سال سابقه
                </span>
              </div>
            </div>
          </div>

          <div className="detail-body">
            <div className="stats-card">
              <div className="stats-col">
                <div className="stats-ic">
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
                    <circle cx="12" cy="8" r="6" />
                    <path d="M9.5 13.5 7 21l5-3 5 3-2.5-7.5" />
                  </svg>
                </div>

                <div className="stats-num">۸ سال</div>
                <div className="stats-lbl">سابقه</div>
              </div>

              <div className="stats-col">
                <div className="stats-ic">
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                <div className="stats-num">۲٬۴۰۰+</div>
                <div className="stats-lbl">مراجع</div>
              </div>

              <div className="stats-col">
                <div className="stats-ic">
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
                </div>

                <div className="stats-num">۴.۹</div>
                <div className="stats-lbl">امتیاز</div>
              </div>

              <div className="stats-col">
                <div className="stats-ic">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                <div className="stats-num">۳۱۸</div>
                <div className="stats-lbl">نظر</div>
              </div>
            </div>

            <h3 className="detail-h2">درباره</h3>

            <p className="detail-desc">
              دکتر آریانا مرادی پزشک زیبایی دارای بورد تخصصی با بیش از ۸ سال
              سابقه در پزشکی زیبایی غیرجراحی است. ایشان در کلینیک‌های معتبر
              اروپایی آموزش دیده و دارای گواهینامه‌های پیشرفته در زیبایی صورت
              و پوست است.
            </p>

            <a href="#" className="read-more">
              بیشتر بخوانید
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
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>

            <div className="tag-pills">
              {this.tags.map((item) => (
                <span
                  className="tag-pill"
                  key={item.id}
                >
                  {item.name}
                </span>
              ))}
            </div>

            <div className="sec-head-row">
              <h3 className="detail-h2 detail-h2-no-margin">
                تخصص‌ها
              </h3>

              <a href="#" className="view-all-link">
                مشاهده همه
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
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="spty-scroll">
              {this.specialties.map((item) => (
                <SpecialtyItem
                  key={item.id}
                  name={item.name}
                />
              ))}
            </div>

            <div className="sec-head-row">
              <h3 className="detail-h2 detail-h2-no-margin">
                نظرات مراجعین
              </h3>

              <div className="rev-overall2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>

                ۴.۹ <span>(۳۱۸)</span>
              </div>
            </div>

            <div className="rev-list">
              {this.reviews.map((item) => (
                <ReviewItem
                  key={item.id}
                  avatar={item.avatar}
                  name={item.name}
                  stars={item.stars}
                  tag={item.tag}
                  date={item.date}
                  text={item.text}
                />
              ))}
            </div>

            <button className="see-all-btn">
              مشاهده همه ۳۱۸ نظر
            </button>

            <div className="sec-head-row">
              <h3 className="detail-h2 detail-h2-no-margin">
                زمان‌های خالی
              </h3>

              <a href="#" className="view-all-link">
                برنامه کامل
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
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="date-scroll" id="dateScroll">
              <button className="date-card active" data-d="0">
                <div className="date-day">امروز</div>
                <div className="date-date">۱۱ شهریور</div>
                <div className="date-slots">۲ نوبت خالی</div>
              </button>

              <button className="date-card" data-d="1">
                <div className="date-day">فردا</div>
                <div className="date-date">۱۲ شهریور</div>
                <div className="date-slots">۳ نوبت خالی</div>
              </button>

              <button className="date-card" data-d="2">
                <div className="date-day">چهارشنبه</div>
                <div className="date-date">۱۳ شهریور</div>
                <div className="date-slots">۳ نوبت خالی</div>
              </button>
            </div>

            <div
              className="time-grid time-grid-spacing"
              id="timeGrid"
            >
              <button className="time-btn">۱۴:۰۰</button>
              <button className="time-btn">۱۶:۳۰</button>
            </div>

            <div className="consult-card2">
              <div className="consult-card2-top">
                <span className="consult-ic2">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>

                <div>
                  <div className="consult-t2">
                    نمی‌دونید کدوم درمان مناسب شماست؟
                  </div>

                  <p className="consult-s2">
                    برای بررسی گزینه‌هاتون یک مشاوره خصوصی با دکتر مرادی
                    درخواست بدید — بدون هیچ تعهدی.
                  </p>
                </div>
              </div>

              <button className="btn-solid">
                دریافت مشاوره
              </button>
            </div>

            <div className="cred-card cred-card-no-margin">
              {this.credentials.map((item) => (
                <CredentialItem
                  key={item.id}
                  title={item.title}
                  text={item.text}
                  icon={this.getCredentialIcon(item.type)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sticky-cta">
          <button className="btn-outline">
            دریافت مشاوره
          </button>

          <button className="btn-solid">
            رزرو نوبت
          </button>
        </div>
      </>
    );
  }
}

export default SpecialistProfile;