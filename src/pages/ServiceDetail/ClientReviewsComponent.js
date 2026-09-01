import React from "react";

class ClientReviews extends React.Component {

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

  render() {

    const {
      rating = 0,
      reviewCount = 0,
      reviews = [],
    } = this.props;

    return (
      <>
        <div className="detail-divider"></div>

        {/* Header */}

        <div className="rev-head">

          <h3
            className="detail-h2"
            style={{ marginBottom: 0 }}
          >
            نظرات مراجعین
          </h3>

          <div className="rev-overall">

            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>

            {Number(rating || 0).toLocaleString("fa-IR")}

            <span>
              /۵
            </span>

          </div>

        </div>

        {/* Reviews */}

        <div className="rev-list">

          {reviews.length === 0 ? (

            <div className="rev-item">

              <div className="rev-text">
                هنوز نظری برای این خدمت ثبت نشده است.
              </div>

            </div>

          ) : (

            reviews.map((review) => (

              <div
                className="rev-item"
                key={review.id}
              >

                <div className="rev-top">

                  {/* Avatar */}

                  <span className="rev-avatar">

                    {review.avatar ? (

                      <img
                        src={review.avatar}
                        alt={review.name}
                      />

                    ) : (

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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />

                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                        />
                      </svg>

                    )}

                  </span>

                  {/* Name + Date */}

                  <div className="rev-meta">

                    <div className="rev-name">
                      {review.name || "کاربر"}
                    </div>

                    <div className="rev-date">
                      {review.date || ""}
                    </div>

                  </div>

                  {/* Rating */}

                  <span className="rev-stars">

                    {this.renderStars(
                      review.rating
                    )}

                  </span>

                </div>

                {/* Review Text */}

                <p className="rev-text">
                  {review.review}
                </p>

              </div>

            ))

          )}

        </div>

        {/* See All */}

        {reviews.length > 0 && (

          <button className="see-all-btn">

            مشاهده همه{" "}

            {Number(
              reviewCount
            ).toLocaleString("fa-IR")}

            {" "}نظر

          </button>

        )}

      </>
    );
  }
}

export default ClientReviews;