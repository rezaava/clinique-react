import React from "react";
import ServiceCard from "./ServiceCardComponent";
import ArticleCard from "./ArticleCardComponent";
import "./../../css/home.css";
import { Link } from "react-router-dom";


class Home extends React.Component {
  state = {
    services: [],
    doctor: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.getHomeData();
  }


  getHomeData = () => {
    fetch("http://localhost:8000/api/home")
      .then((response) => {
        if (!response.ok) {
          throw new Error("خطا در دریافت اطلاعات صفحه اصلی");
        }

        return response.json();
      })
      .then((result) => {
        this.setState({
          services: result.data?.services || [],
          doctor: result.data?.doctor || null,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Home API Error:", error);

        this.setState({
          error: "دریافت اطلاعات صفحه اصلی با خطا مواجه شد.",
          loading: false,
        });
      });
  };

  render() {
    const {
      services,
      doctor,
      loading,
      error,
    } = this.state;

    return (
      <>
        {/* Header */}
        <header className="top-header">
          <div className="logo-row">
            <div className="logo-mark">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
              </svg>
            </div>

            <div className="logo-text">
              <div className="ln">اوراکلینیک</div>
              <div className="ls">کلینیک زیبایی</div>
            </div>
          </div>

          <div className="head-actions">
            <button className="bell-btn" aria-label="اعلان‌ها">
              <span className="bell-dot"></span>

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
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>

            <button className="login-btn">
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
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
              ورود
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="scroll-area">

          {/* Hero */}
          <div className="hero">
            <h1 className="hero-title">
              به <span>اوراکلینیک</span> خوش آمدید
            </h1>

            <p className="hero-sub">
              امروز چطور می‌توانیم به شما کمک کنیم؟
            </p>
          </div>

          {/* CTA */}
          <div className="cta-grid">
          <Link to="/booking" className="cta-card cta-primary">
            <span className="cta-ic">
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

            <span className="cta-body">
              <span className="cta-t">رزرو نوبت</span>
              <span className="cta-s">
                انتخاب خدمت و زمان مناسب
              </span>
            </span>

            <span className="cta-chev">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </span>
          </Link>

          <Link to="/consultation" className="cta-card cta-secondary">
            <span className="cta-ic">
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>

            <span className="cta-body">
              <span className="cta-t">دریافت مشاوره</span>
              <span className="cta-s">
                مطمئن نیستید؟ اول با متخصص صحبت کنید
              </span>
            </span>

            <span className="cta-chev">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </span>
          </Link>
          </div>

          {/* Promo */}
          <div className="promo-banner">
            <span className="promo-ic">
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
                <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" />
                <path d="M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </span>

            <div className="promo-body">
              <div className="promo-eyebrow">
                ویژه مراجعین جدید
              </div>

              <div className="promo-t">
                ۱۵٪ تخفیف اولین مشاوره
              </div>

              <div className="promo-s">
                با ثبت‌نام همین امروز از تخفیف استفاده کنید
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="sec">
            <div className="sec-head">
              <span className="sec-title">
                کاوش خدمات
              </span>

              <a href="#" className="sec-link">
                مشاهده همه ‹
              </a>
            </div>

            <div className="svc-scroll">

              {loading && (
                <div>
                  در حال دریافت خدمات...
                </div>
              )}

              {error && (
                <div>
                  {error}
                </div>
              )}

              {!loading && !error && services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}

            </div>
          </div>

          {/* Specialist */}
          <div className="sec">
            <div className="sec-head">
              <span className="sec-title">
                با متخصصین ما آشنا شوید
              </span>
            </div>

            {doctor && (
              <div className="spec-card">

                <div className="spec-top">

                  <div className="spec-avatar">
                    {doctor.avatar ? (
                      <img
                        src={doctor.avatar}
                        alt={doctor.first_name}
                      />
                    ) : (
                      <>
                        {doctor.first_name}
                      </>
                    )}
                  </div>

                  <div className="spec-info">

                    <div className="spec-name">
                      {doctor.first_name}
                    </div>

                    <div className="spec-role">
                      {doctor.ability}
                    </div>

                    <div className="spec-rate">

                      <span className="spec-stars">
                        ★★★★★
                      </span>

                      <span className="spec-rn">
                        ۴.۹
                      </span>

                      <span className="spec-rc">
                        · ۱۲۸ نظر
                      </span>

                    </div>

                  </div>

                </div>


                <div className="spec-div"></div>


                <div className="spec-bot">

                  <div>

                    <div className="spec-next-l">
                      اولین نوبت خالی
                    </div>

                    <div className="spec-next-v">
                      فردا، ساعت ۱۴:۰۰
                    </div>

                  </div>
                  <Link
                    to={`/specialist-profile/${doctor.id}`}
                    className="spec-btn"
                  >
                    مشاهده پروفایل
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Steps */}
          <div className="sec">
            <div className="sec-head">
              <span className="sec-title">
                روند دریافت خدمت
              </span>
            </div>

            <div className="steps-card">
              <div className="steps-row">

                <div className="step first">
                  <div className="step-dot">
                    ۱
                  </div>

                  <div className="step-label">
                    مشاوره
                  </div>
                </div>

                <div className="step">
                  <div className="step-dot">
                    ۲
                  </div>

                  <div className="step-label">
                    نوبت‌دهی
                  </div>
                </div>

                <div className="step">
                  <div className="step-dot">
                    ۳
                  </div>

                  <div className="step-label">
                    درمان
                  </div>
                </div>

                <div className="step">
                  <div className="step-dot">
                    ۴
                  </div>

                  <div className="step-label">
                    پیگیری
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="sec">
            <div className="stats-row">

              <div className="stat-box">
                <span className="stat-ic">
                  <svg
                    width="20"
                    height="20"
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
                </span>

                <div className="stat-v">
                  +۵٬۰۰۰
                </div>

                <div className="stat-l">
                  مراجعه موفق
                </div>
              </div>

              <div className="stat-box">
                <span className="stat-ic">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                </span>

                <div className="stat-v">
                  ۱۲ سال
                </div>

                <div className="stat-l">
                  تجربه درمانی
                </div>
              </div>

              <div className="stat-box">
                <span className="stat-ic">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
                  </svg>
                </span>

                <div className="stat-v">
                  ۹۸٪
                </div>

                <div className="stat-l">
                  رضایت مراجعین
                </div>
              </div>

            </div>
          </div>

          {/* Quick Access */}
          <div className="sec">
            <div className="sec-head">
              <span className="sec-title">
                دسترسی سریع
              </span>
            </div>

            <div className="quick-grid">

              <Link
                to="/appointments"
                className="quick-item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span
                  className="quick-ic"
                  style={{
                    background: "var(--brand-soft)",
                    color: "var(--brand)",
                  }}
                >
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

                <span className="quick-label">
                  نوبت‌ها
                </span>
              </Link>

              <Link
                to="/services"
                className="quick-item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span
                  className="quick-ic"
                  style={{
                    background: "var(--gold-soft)",
                    color: "var(--gold)",
                  }}
                >
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
                    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
                  </svg>
                </span>

                <span className="quick-label">
                  خدمات
                </span>
              </Link>

              <Link
                to="/coin"
                className="quick-item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span
                  className="quick-ic"
                  style={{
                    background: "var(--green-soft)",
                    color: "var(--green)",
                  }}
                >
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
                    <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" />
                    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </span>

                <span className="quick-label">
                  امتیازها
                </span>
              </Link>

              <Link
                to="/profile"
                className="quick-item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span
                  className="quick-ic"
                  style={{
                    background: "#eee3d8",
                    color: "#9c7a4e",
                  }}
                >
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>

                <span className="quick-label">
                  پروفایل من
                </span>
              </Link>

            </div>
          </div>

          {/* Articles */}
          <div
            className="sec"
            style={{
              marginBottom: "8px",
            }}
          >
            <div className="sec-head">
              <span className="sec-title">
                مطالب آموزشی
              </span>
            </div>

            <ArticleCard
              eyebrow="مقاله هفته"
              title="۵ نکته برای مراقبت از پوست در فصل تابستان"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M4 16s1.5-2 4-2 4 2 4 2 1.5-2 4-2 4 2 4 2M12 4v3M8 5v2M16 5v2" />
                </svg>
              }
            />

          </div>

        </div>
      </>
    );
  }
}

export default Home;