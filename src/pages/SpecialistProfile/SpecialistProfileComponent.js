import React from "react";
import "./../../css/SpecialistProfile.css";
import SpecialtyItem from "./SpecialtyItemComponent";
import ReviewItem from "./ReviewItemComponent";
import CredentialItem from "./CredentialItemComponent";
import withRouter from "../withRouter";

class SpecialistProfile extends React.Component {
  state = {
    doctor: null,
    loading: true,
    error: false
  };

  componentDidMount() {
    const { id } = this.props.params;

    console.log("ROUTE ID:", id);

    this.getDoctor();
  }

  getDoctor = async () => {
    const { id } = this.props.params;

    if (!id) {
      console.error("SPECIALIST PROFILE: ID NOT FOUND");

      this.setState({
        loading: false,
        error: true
      });

      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/specialist-profile/${id}`
      );

      const result = await response.json();

      if (result.success) {
        this.setState({
          doctor: result.data.doctor,
          loading: false
        });
      } else {
        this.setState({
          loading: false,
          error: true
        });
      }
    } catch (error) {
      console.error("SPECIALIST PROFILE ERROR:", error);

      this.setState({
        loading: false,
        error: true
      });
    }
  };

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

  getDoctorName = () => {
    const { doctor } = this.state;

    if (!doctor) {
      return "متخصص";
    }

    return `دکتر ${doctor.first_name || ""} ${
      doctor.last_name || ""
    }`.trim();
  };

  getInitials = (user) => {
    if (!user) {
      return "م";
    }

    const first = user.first_name?.charAt(0) || "";
    const last = user.last_name?.charAt(0) || "";

    return `${first}${last}` || "م";
  };

  formatDate = (date) => {
    if (!date) {
      return "";
    }

    try {
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(new Date(date));
    } catch {
      return "";
    }
  };

  renderStars = (rating) => {
    const value = Number(rating) || 0;

    return (
      <span className="spec-stars-ic">
        {[1, 2, 3, 4, 5].map((item) => (
          <svg
            key={item}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={item <= Math.round(value) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        ))}
      </span>
    );
  };

  render() {
    const {
      doctor,
      loading,
      error
    } = this.state;

    if (loading) {
      return (
        <div className="scroll-area">
          <div
            style={{
              padding: "50px",
              textAlign: "center"
            }}
          >
            در حال دریافت اطلاعات...
          </div>
        </div>
      );
    }

    if (error || !doctor) {
      return (
        <div className="scroll-area">
          <div
            style={{
              padding: "50px",
              textAlign: "center"
            }}
          >
            دریافت اطلاعات متخصص با خطا مواجه شد.
          </div>
        </div>
      );
    }

    const services = doctor.services || [];
    const reviews = doctor.reviews || [];
    const credentials = doctor.credentials || [];

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
              {doctor.avatar ? (
                <img
                  src={doctor.avatar}
                  alt={this.getDoctorName()}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              ) : (
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
              )}
            </div>

            <div className="spec-hero-fade"></div>

            <div className="spec-hero-content">
              <div className="spec-name-row">
                <h2 className="spec-name">
                  {this.getDoctorName()}
                </h2>

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
                {doctor.ability?.name || ""}
              </div>

              <div className="spec-rate-row">
                {this.renderStars(doctor.rating)}

                <span className="spec-rn">
                  {doctor.rating || 0}
                </span>

                <span>
                  · {doctor.rating_count || 0} نظر
                </span>

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

                  {doctor.experience || 0} سال سابقه
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
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="M9.5 13.5 7 21l5-3 5 3-2.5-7.5" />
                  </svg>
                </div>

                <div className="stats-num">
                  {doctor.experience || 0} سال
                </div>

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
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                <div className="stats-num">
                  {doctor.client_count || 0}
                </div>

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
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                </div>

                <div className="stats-num">
                  {doctor.rating || 0}
                </div>

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
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                <div className="stats-num">
                  {doctor.rating_count || 0}
                </div>

                <div className="stats-lbl">نظر</div>
              </div>
            </div>

            <h3 className="detail-h2">درباره</h3>

            <p className="detail-desc">
              {doctor.about}
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
              {services.map((item) => (
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
              {services.map((item) => (
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

                {doctor.rating || 0}

                <span>
                  ({doctor.rating_count || 0})
                </span>
              </div>
            </div>

            <div className="rev-list">
              {reviews.map((item) => (
                <ReviewItem
                  key={item.id}
                  avatar={this.getInitials(item.user)}
                  name={
                    item.user
                      ? `${item.user.first_name || ""} ${
                          item.user.last_name || ""
                        }`.trim()
                      : "مراجع"
                  }
                  stars={"★".repeat(item.staff_rating || 0)}
                  tag={item.service?.name || "خدمت"}
                  date={this.formatDate(item.reviewed_at)}
                  text={item.review}
                />
              ))}
            </div>

            <button className="see-all-btn">
              مشاهده همه {doctor.rating_count || 0} نظر
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
              <button className="date-card active">
                <div className="date-day">امروز</div>
                <div className="date-date">۱۱ شهریور</div>
                <div className="date-slots">۲ نوبت خالی</div>
              </button>

              <button className="date-card">
                <div className="date-day">فردا</div>
                <div className="date-date">۱۲ شهریور</div>
                <div className="date-slots">۳ نوبت خالی</div>
              </button>

              <button className="date-card">
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
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>

                <div>
                  <div className="consult-t2">
                    نمی‌دونید کدوم درمان مناسب شماست؟
                  </div>

                  <p className="consult-s2">
                    برای بررسی گزینه‌هاتون یک مشاوره خصوصی با دکتر
                    درخواست بدید — بدون هیچ تعهدی.
                  </p>
                </div>
              </div>

              <button className="btn-solid">
                دریافت مشاوره
              </button>
            </div>

            <div className="cred-card cred-card-no-margin">
              {credentials.map((item) => (
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

export default withRouter(SpecialistProfile);