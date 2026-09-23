import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./../../css/service-detail.css";

import SpecialistsSection from "./SpecialistsSectionComponent";
import ReviewsSection from "./ClientReviewsComponent";
import FaqSection from "./FAQComponent";
import RelatedServicesSection from "./RelatedServicesComponent";

class ServiceDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      service: null,
      loading: true,
      error: null,

      liked: false,
      activeTab: "before",
      openFaq: 0,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;

    fetch(`http://localhost:8000/api/services/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("خطا در دریافت اطلاعات خدمت");
        }

        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          throw new Error(
            result.message || "اطلاعات خدمت دریافت نشد."
          );
        }

        this.setState({
          service: result.data,
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
  }

  handleBack = () => {
    if (this.props.navigate) {
      this.props.navigate("/services");
    }
  };

  handleLike = () => {
    this.setState((prevState) => ({
      liked: !prevState.liked,
    }));
  };

  handleTabChange = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };

  handleFaq = (index) => {
    this.setState((prevState) => ({
      openFaq:
        prevState.openFaq === index ? null : index,
    }));
  };

  formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "";
    }

    return Number(price).toLocaleString("fa-IR");
  };

  renderStars = (rating = 0) => {
    const numericRating = Number(rating);

    return (
      <span className="detail-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={
              star <= Math.round(numericRating)
                ? "currentColor"
                : "none"
            }
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        ))}
      </span>
    );
  };

  renderSuitabilityIcon = (level) => {
    if (Number(level) === 3) {
      return (
        <span className="suit-ic warn">
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
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </span>
      );
    }

    return (
      <span className="suit-ic good">
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
    );
  };

  render() {
    const {
      service,
      loading,
      error,
      liked,
      activeTab,
      openFaq,
    } = this.state;

    if (loading) {
      return (
        <div className="detail-loading">
          در حال دریافت اطلاعات خدمت...
        </div>
      );
    }

    if (error) {
      return (
        <div className="detail-error">
          {error}
        </div>
      );
    }

    if (!service) {
      return (
        <div className="detail-error">
          اطلاعات خدمت پیدا نشد.
        </div>
      );
    }

    const tabs = {
      before: [
        "قبل از درمان پوست خود را با شوینده ملایم تمیز کنید.",
        "حداقل ۲۴ ساعت قبل از درمان از لایه‌بردارهای قوی استفاده نکنید.",
        "در صورت داشتن حساسیت پوستی، قبل از درمان با متخصص مشورت کنید.",
      ],

      during: [
        "در ابتدا پوست پاکسازی و برای درمان آماده می‌شود.",
        "ناخالصی‌ها و آلودگی‌های سطح پوست با دستگاه مخصوص استخراج می‌شوند.",
        "در مرحله پایانی سرم‌های متناسب با نوع پوست استفاده می‌شوند.",
      ],

      after: [
        "ممکن است قرمزی خفیف و موقتی داشته باشید.",
        "تا ۲۴ ساعت از سونا و ورزش سنگین خودداری کنید.",
        "برای محافظت از پوست از ضدآفتاب مناسب استفاده کنید.",
      ],
    };

    return (
      <>
        {/* Header */}
        <header className="page-header">
          <button
            className="icon-btn"
            aria-label="بازگشت"
            onClick={this.handleBack}
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

          <h1 className="page-title">
            {service.name}
          </h1>

          <div className="head-actions">
            <button
              className={`icon-btn ${liked ? "liked" : ""}`}
              id="likeBtn"
              aria-label="علاقه‌مندی"
              onClick={this.handleLike}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
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

        {/* Scroll Area */}
        <div className="scroll-area service-detail-scroll">

          {/* Hero */}
          <div className="detail-hero">
            <div className="detail-hero-bg"></div>

            <div className="detail-hero-swirl">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                opacity=".85"
              >
                <path
                  d="M60 15c24 0 45 21 45 45s-21 45-45 45S15 84 15 60"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                />

                <path
                  d="M60 30c17 0 30 13 30 30S77 90 60 90"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="9"
                  fill="#fff"
                  fillOpacity=".9"
                />
              </svg>
            </div>

            <div className="hero-badge-rate">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>

              {service.rating} ·{" "}
              {Number(
                service.review_count ?? service.reviews ?? 0
              ).toLocaleString("fa-IR")}{" "}
              نظر
            </div>

            <div className="hero-badge-price">
              از {this.formatPrice(service.price)} تومان
            </div>
          </div>

          {/* Body */}
          <div className="detail-body">

            {/* Title */}
            <h2 className="detail-title">
              {service.name}
            </h2>

            {/* Short Description */}
            <p className="detail-desc">
              {service.short_description}
            </p>

            {/* Rating */}
            <div className="detail-rate-row">
              {this.renderStars(service.rating)}

              <span className="detail-rn">
                {service.rating}
              </span>

              <span>
                (
                {Number(
                  service.review_count ?? service.reviews ?? 0
                ).toLocaleString("fa-IR")}
                {" نظر)"}
              </span>

              <span className="detail-sep">
                ·
              </span>

              <span className="detail-dur-inline">
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
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                  />

                  <path d="M12 6v6l4 2" />
                </svg>

                {service.duration_minutes} دقیقه
              </span>
            </div>

            {/* CTA */}
            <div className="cta-row">
              <Link
                to="/consultation"
                className="btn-outline"
              >
                دریافت مشاوره
              </Link>

              <Link
                to="/booking"
                className="btn-solid"
              >
                رزرو نوبت
              </Link>
            </div>

            {/* Info Grid */}
            <div className="info-grid">

              <div className="info-box">
                <span className="info-ic">
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>

                <div>
                  <div className="info-l">
                    مدت‌زمان
                  </div>

                  <div className="info-v">
                    {service.duration_minutes} دقیقه
                  </div>
                </div>
              </div>

              <div className="info-box">
                <span className="info-ic">
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
                    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                    <path d="m3 12 9 5 9-5" />
                  </svg>
                </span>

                <div>
                  <div className="info-l">
                    تعداد جلسات
                  </div>

                  <div className="info-v">
                    ۱ تا ۳ جلسه
                  </div>
                </div>
              </div>

              <div className="info-box">
                <span className="info-ic">
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
                    <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>

                <div>
                  <div className="info-l">
                    دوره نقاهت
                  </div>

                  <div className="info-v">
                    کم، ۲۴-۴۸ ساعت
                  </div>
                </div>
              </div>

              <div className="info-box">
                <span className="info-ic">
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>

                <div>
                  <div className="info-l">
                    مناسب برای
                  </div>

                  <div className="info-v">
                    اکثر انواع پوست
                  </div>
                </div>
              </div>

            </div>

            {/* What is this treatment */}
            <div className="detail-divider"></div>

            <h3 className="detail-h2">
              این درمان چیست؟
            </h3>

            <p
              className="detail-desc"
              style={{ marginBottom: 0 }}
            >
              {service.article_content ||
                service.seo_content ||
                service.short_description}
            </p>

            <a
              href="#!"
              className="read-more"
            >
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

            {/* Suitable */}
            <div className="detail-divider"></div>

            <h3 className="detail-h2">
              آیا این خدمت مناسب شماست؟
            </h3>

            <div className="suit-list">
              {(service.suitabilities || [])
                .sort((a, b) => Number(a.level) - Number(b.level))
                .map((item) => (
                  <div
                    className="suit-item"
                    key={item.id}
                  >
                    {this.renderSuitabilityIcon(item.level)}

                    <span>
                      {item.text}
                    </span>
                  </div>
                ))}
            </div>

            <p className="suit-note">
              این راهنمای کلی است. متخصص شما در جلسه مشاوره،
              تناسب این درمان را برای شما بررسی می‌کند.
            </p>

            {/* How it works */}
            <div className="detail-divider"></div>

            <h3 className="detail-h2">
              روند انجام درمان
            </h3>

            <div className="hiw-row">

              {[
                {
                  title: "مشاوره",
                  icon:
                    "M12 2v4M6 6h12M6 10h12M6 14h8",
                },
                {
                  title: "آماده‌سازی",
                  icon:
                    "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z",
                },
                {
                  title: "درمان",
                  icon:
                    "M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z",
                },
                {
                  title: "مراقبت پس از درمان",
                  icon:
                    "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2",
                },
              ].map((item, index) => (
                <div
                  className="hiw-item"
                  key={index}
                >
                  <span className="hiw-ic">
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
                      <path d={item.icon} />
                    </svg>
                  </span>

                  <span className="hiw-label">
                    {item.title}
                  </span>
                </div>
              ))}

            </div>

            {/* Expectations */}
            <div className="detail-divider"></div>

            <h3 className="detail-h2">
              چه انتظاری باید داشته باشید؟
            </h3>

            <div className="wte-tabs">

              <button
                className={`wte-tab ${
                  activeTab === "before"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  this.handleTabChange("before")
                }
              >
                قبل از درمان
              </button>

              <button
                className={`wte-tab ${
                  activeTab === "during"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  this.handleTabChange("during")
                }
              >
                حین درمان
              </button>

              <button
                className={`wte-tab ${
                  activeTab === "after"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  this.handleTabChange("after")
                }
              >
                بعد از درمان
              </button>

            </div>

            <div className="wte-list">
              {tabs[activeTab].map((item, index) => (
                <div
                  className="suit-item"
                  key={index}
                >
                  <span className="suit-ic good">
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

                  {item}
                </div>
              ))}
            </div>

            {/* After care */}
            <div className="detail-divider"></div>

            <h3 className="detail-h2">
              مراقبت‌های پس از درمان
            </h3>

            <div className="suit-list">

              {[
                "حداقل به مدت ۵ روز، هر روز صبح ضدآفتاب SPF ۳۰+ بزنید",
                "از مرطوب‌کننده ملایم و بدون عطر استفاده کنید",
                "تا ۲۴ ساعت از سونا و ورزش سنگین خودداری کنید",
                "استفاده از رتینول یا اسیدها را ۳ تا ۵ روز به تعویق بیندازید",
              ].map((text, index) => (
                <div
                  className="suit-item"
                  key={index}
                >
                  <span
                    className="suit-ic"
                    style={{
                      color: "var(--brand)",
                    }}
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>

                  {text}
                </div>
              ))}

            </div>

            <div className="after-note">
              متخصص شما بر اساس نوع پوست و نتیجه درمان،
              دستورالعمل‌های مراقبتی اختصاصی ارائه خواهد داد.
            </div>

            {/* Specialists */}
            <SpecialistsSection
              specialists={service.staff || []}
            />

            {/* Reviews */}
            <ReviewsSection
              rating={service.rating}
              reviewCount={service.reviews}
              reviews={service.reviews_list}
            />

            {/* FAQ */}
            <FaqSection
              faqs={service.faqs || []}
              openFaq={openFaq}
              handleFaq={this.handleFaq}
            />

            {/* Related Services */}
            <RelatedServicesSection
              services={service.related_services}
            />

            {/* Not Sure */}
            <div className="notsure-card">

              <div className="notsure-ic">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              <div className="notsure-t">
                هنوز مطمئن نیستید؟
              </div>

              <p className="notsure-s">
                قبل از تصمیم‌گیری با یک متخصص صحبت کنید.
                بدون هیچ تعهدی.
              </p>

              <div className="notsure-btns">

                <Link
                  to="/consultation"
                  className="btn-solid"
                >
                  دریافت مشاوره
                </Link>

                <Link
                  to="/booking"
                  className="btn-outline"
                >
                  رزرو نوبت
                </Link>

              </div>
            </div>

          </div>
        </div>

        {/* Sticky CTA */}
        <div className="sticky-cta">

          <Link
            to="/consultation"
            className="btn-outline"
          >
            دریافت مشاوره
          </Link>

          <Link
            to="/booking"
            className="btn-solid"
          >
            رزرو نوبت
          </Link>

        </div>
      </>
    );
  }
}

function ServiceDetailWithRouter(props) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <ServiceDetail
      {...props}
      params={params}
      navigate={navigate}
    />
  );
}

export default ServiceDetailWithRouter;