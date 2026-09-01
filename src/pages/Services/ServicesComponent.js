import React from "react";
import "./../../css/services.css";
import ServiceItem from "./ServiceItemComponent";

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePill: "all",
      services: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const html = document.documentElement;

    if (
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
    ) {
      html.setAttribute("data-theme", "dark");
    }

    this.fetchServices();
  }

  fetchServices = async () => {
    try {
      this.setState({
        loading: true,
        error: null,
      });

      const response = await fetch(
        "http://127.0.0.1:8000/api/services"
      );

      if (!response.ok) {
        throw new Error(
          "دریافت خدمات با خطا مواجه شد."
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message ||
            "دریافت خدمات ناموفق بود."
        );
      }

      this.setState({
        services: result.data || [],
        loading: false,
      });

    } catch (error) {
      console.error(
        "Services API Error:",
        error
      );

      this.setState({
        loading: false,
        error:
          error.message ||
          "خطا در دریافت خدمات.",
      });
    }
  };

  handlePillClick = (pill) => {
    this.setState({
      activePill: pill,
    });
  };

  handleBack = () => {
    window.history.back();
  };

  handleServiceClick = (service) => {
    console.log(
      "Selected service:",
      service
    );

    /*
     * بعداً می‌توانیم اینجا صفحه جزئیات
     * خدمت را باز کنیم.
     *
     * مثال:
     *
     * window.location.href =
     *   `/services/${service.slug}`;
     */
  };

  getServiceBackground = (index) => {
    const backgrounds = [
      "linear-gradient(135deg,var(--rose),#d98fae)",
      "linear-gradient(135deg,var(--peach),#eda869)",
      "linear-gradient(135deg,var(--sky),#6fa8d6)",
      "linear-gradient(135deg,var(--sage),#7fbb78)",
    ];

    return backgrounds[
      index % backgrounds.length
    ];
  };

  getServiceIcon = (index) => {
    const icons = [

      // Botox
      <svg
        key="icon-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 2 4 4M17 7l3-3M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5M9 11l4 4M6 14l4 4" />
      </svg>,

      // Filler
      <svg
        key="icon-2"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
      </svg>,

      // Laser
      <svg
        key="icon-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>,

      // Skin
      <svg
        key="icon-4"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>,
    ];

    return icons[
      index % icons.length
    ];
  };

  getFilteredServices = () => {
    const {
      services,
      activePill,
    } = this.state;

    /*
     * فعلاً چون Service مدل شما category
     * ندارد، همه خدمات را برمی‌گردانیم.
     *
     * وقتی category به Service اضافه شود،
     * فیلترهای skin / hair / inj / laser
     * را اینجا فعال می‌کنیم.
     */

    if (activePill === "all") {
      return services;
    }

    return services;
  };

  render() {
    const {
      activePill,
      loading,
      error,
      services,
    } = this.state;

    const filteredServices =
      this.getFilteredServices();

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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <h1 className="page-title">
            خدمات
          </h1>

          <div className="head-actions">

            <button
              className="icon-btn"
              aria-label="جستجو"
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
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

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

          </div>
        </header>

        <div className="scroll-area">

          {/* Pills */}

          <div
            className="pill-scroll"
            id="pillScroll"
          >

            <button
              className={`pill ${
                activePill === "all"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                this.handlePillClick("all")
              }
            >
              همه
            </button>

            <button
              className={`pill ${
                activePill === "skin"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                this.handlePillClick("skin")
              }
            >
              پوست
            </button>

            <button
              className={`pill ${
                activePill === "hair"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                this.handlePillClick("hair")
              }
            >
              مو
            </button>

            <button
              className={`pill ${
                activePill === "inj"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                this.handlePillClick("inj")
              }
            >
              تزریقات
            </button>

            <button
              className={`pill ${
                activePill === "laser"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                this.handlePillClick("laser")
              }
            >
              لیزر
            </button>

          </div>

          {/* Recommended */}

          <div className="sec">

            <div className="reco-eyebrow">

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l1.9 5.5L19.5 9l-5.6 1.5L12 16l-1.9-5.5L4.5 9l5.6-1.5z" />
              </svg>

              پیشنهاد شده برای شما

            </div>

            <div className="reco-grid">

              {services
                .slice(0, 2)
                .map((service, index) => (

                  <div
                    className="reco-card"
                    key={service.id}
                    onClick={() =>
                      this.handleServiceClick(
                        service
                      )
                    }
                  >

                    <div
                      className="reco-img"
                      style={{
                        background:
                          this.getServiceBackground(
                            index
                          ),
                      }}
                    >
                      {this.getServiceIcon(
                        index
                      )}
                    </div>

                    <div className="reco-body">

                      <div className="reco-t">
                        {service.name}
                      </div>

                      <div className="reco-p">
                        از{" "}
                        {Number(
                          service.price || 0
                        ).toLocaleString(
                          "fa-IR"
                        )}{" "}
                        تومان
                      </div>

                    </div>

                  </div>

                ))}

            </div>

          </div>

          {/* Available Services */}

          <div className="sec">

            <div className="avail-label">

              {loading
                ? "در حال دریافت خدمات..."
                : `${filteredServices.length.toLocaleString(
                    "fa-IR"
                  )} خدمت موجود`}

            </div>

            {/* Loading */}

            {loading && (
              <div className="services-loading">
                در حال بارگذاری خدمات...
              </div>
            )}

            {/* Error */}

            {!loading && error && (
              <div className="services-error">

                <div>
                  {error}
                </div>

                <button
                  type="button"
                  onClick={
                    this.fetchServices
                  }
                >
                  تلاش مجدد
                </button>

              </div>
            )}

            {/* Empty */}

            {!loading &&
              !error &&
              filteredServices.length === 0 && (
                <div className="services-empty">
                  خدمتی برای نمایش وجود ندارد.
                </div>
              )}

            {/* Services */}

            {!loading &&
              !error &&
              filteredServices.length > 0 && (

                <div className="svc-list">

                  {filteredServices.map(
                    (service, index) => (

                      <ServiceItem
                        key={service.id}
                        service={service}
                        background={this.getServiceBackground(
                          index
                        )}
                        icon={this.getServiceIcon(
                          index
                        )}
                        onClick={
                          this.handleServiceClick
                        }
                      />

                    )
                  )}

                </div>

              )}

          </div>

          {/* Consultation */}

          <div className="consult-card">

            <div className="consult-t">
              مطمئن نیستید کدام خدمت مناسب شماست؟
            </div>

            <div className="consult-s">
              قبل از تصمیم‌گیری، با یکی از متخصصین
              ما مشورت کنید.
            </div>

            <button
              className="consult-btn"
              type="button"
            >
              دریافت مشاوره
            </button>

          </div>

        </div>
      </>
    );
  }
}

export default Services;