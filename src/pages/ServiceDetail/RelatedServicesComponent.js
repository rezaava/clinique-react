import React from "react";

class RelatedServices extends React.Component {

  formatPrice = (price) => {
    if (
      price === null ||
      price === undefined ||
      price === ""
    ) {
      return "قیمت نامشخص";
    }

    return `از ${Number(price).toLocaleString("fa-IR")} تومان`;
  };

  formatDuration = (minutes) => {
    if (!minutes) {
      return "";
    }

    return `${Number(minutes).toLocaleString("fa-IR")} دقیقه`;
  };

  getCardClass = (index) => {
    const classes = [
      "sky",
      "sage",
      "rose",
    ];

    return classes[index % classes.length];
  };

  render() {

    const {
      services = [],
    } = this.props;

    return (
      <>
        <div className="detail-divider"></div>

        <h3 className="detail-h2">
          خدمات مرتبط
        </h3>

        <div className="rel-scroll">

          {services.length === 0 ? (

            <div className="rel-empty">
              خدمت مرتبطی پیدا نشد.
            </div>

          ) : (

            services.map((service, index) => (

              <div
                className="rel-card"
                key={service.id}
              >

                <div
                  className={`rel-img ${this.getCardClass(
                    index
                  )}`}
                >

                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2" />

                  </svg>

                </div>

                <div className="rel-name">
                  {service.name}
                </div>

                <div className="rel-meta">
                  {this.formatDuration(
                    service.duration_minutes
                  )}
                </div>

                <div className="rel-price">
                  {this.formatPrice(
                    service.price
                  )}
                </div>

              </div>

            ))

          )}

        </div>
      </>
    );
  }
}

export default RelatedServices;