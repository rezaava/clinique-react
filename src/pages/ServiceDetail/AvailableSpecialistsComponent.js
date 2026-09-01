import React from "react";

class AvailableSpecialists extends React.Component {
  render() {
    const specialists = [
      {
        avatar: "س‌م",
        name: "دکتر سارا محمودی",
        role: "پزشکی زیبایی · ۸ سال سابقه",
        rate: "۴.۹",
        reviews: "۱۲۴",
        next: "فردا، ساعت ۱۰:۰۰",
      },
      {
        avatar: "ا‌ک",
        name: "دکتر الناز کلاهی",
        role: "متخصص پوست · ۱۲ سال سابقه",
        rate: "۴.۸",
        reviews: "۹۸",
        next: "پنجشنبه، ساعت ۱۴:۳۰",
      },
      {
        avatar: "ل‌ح",
        name: "لیلا حسینی",
        role: "متخصص زیبایی بالینی · ۵ سال سابقه",
        rate: "۴.۷",
        reviews: "۶۷",
        next: "جمعه، ساعت ۱۱:۰۰",
      },
    ];

    return (
      <>
        <h3 className="detail-h2">متخصصین موجود</h3>

        <div className="spec-list">
          {specialists.map((spec, index) => (
            <div className="spec-item" key={index}>
              <div className="spec-item-top">
                <div className="spec-item-avatar">
                  {spec.avatar}
                </div>

                <div className="spec-item-info">
                  <div className="spec-item-name">
                    {spec.name}
                  </div>

                  <div className="spec-item-role">
                    {spec.role}
                  </div>
                </div>

                <button className="spec-view-btn">
                  مشاهده پروفایل
                </button>
              </div>

              <div className="spec-item-rate">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>

                {spec.rate}

                <span style={{ color: "var(--ink-3)" }}>
                  ({spec.reviews})
                </span>
              </div>

              <div className="spec-item-div"></div>

              <div className="spec-item-next">
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

                نوبت بعدی: <b>{spec.next}</b>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default AvailableSpecialists;