import React from "react";
import { Link } from "react-router-dom";

class ServiceItem extends React.Component {
  render() {
    const {
      service,
      background,
      icon,
    } = this.props;

    const {
      id,
      name,
      short_description,
      duration_minutes,
      price,
      rating,
      reviews,
    } = service;

    const formattedPrice =
      Number(price || 0).toLocaleString("fa-IR");

    const formattedRating =
      rating !== null && rating !== undefined
        ? Number(rating).toLocaleString("fa-IR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })
        : "—";

    const formattedReviews =
      Number(reviews || 0).toLocaleString("fa-IR");

    return (
      <Link
        to={`/service-detail/${id}`}
        className="svc-item"
      >
        <div
          className="svc-thumb"
          style={{
            background: background,
          }}
        >
          {icon}
        </div>

        <div className="svc-info">
          <div className="svc-item-name">
            {name}
          </div>

          <div className="svc-item-desc">
            {short_description}
          </div>

          <div className="svc-meta">
            {/* Duration */}
            <span className="svc-dur">
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

              {Number(
                duration_minutes || 0
              ).toLocaleString("fa-IR")}{" "}
              دقیقه
            </span>

            {/* Price */}
            <span className="svc-price">
              از {formattedPrice} تومان
            </span>

            {/* Rating */}
            <span className="svc-rate">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>

              {formattedRating}

              <span className="svc-rc">
                ({formattedReviews})
              </span>
            </span>
          </div>
        </div>

        {/* Arrow */}
        <span className="svc-chev">
          <svg
            width="17"
            height="17"
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
    );
  }
}

export default ServiceItem;