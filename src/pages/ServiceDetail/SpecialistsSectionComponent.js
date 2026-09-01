import React from "react";

class SpecialistsSection extends React.Component {
  getInitials = (staff) => {
    const firstName = staff.first_name || "";
    const lastName = staff.last_name || "";

    if (!firstName && !lastName) {
      return "?";
    }

    return `${firstName.charAt(0)}‌${lastName.charAt(0)}`;
  };

  getFullName = (staff) => {
    return `${staff.first_name || ""} ${
      staff.last_name || ""
    }`.trim();
  };

  render() {
    const { specialists = [] } = this.props;

    return (
      <>
        <div className="detail-divider"></div>

        <h3 className="detail-h2">
          متخصصین موجود
        </h3>

        <div className="spec-list">

          {specialists.length === 0 ? (
            <div className="spec-empty">
              در حال حاضر متخصصی برای این خدمت ثبت نشده است.
            </div>
          ) : (
            specialists.map((spec) => (
              <div
                className="spec-item"
                key={spec.id}
              >

                <div className="spec-item-top">

                  <div className="spec-item-avatar">
                    {spec.avatar ? (
                      <img
                        src={spec.avatar}
                        alt={this.getFullName(spec)}
                      />
                    ) : (
                      this.getInitials(spec)
                    )}
                  </div>

                  <div className="spec-item-info">

                    <div className="spec-item-name">
                      {this.getFullName(spec)}
                    </div>

                    <div className="spec-item-role">
                      {spec.skill}
                    </div>

                  </div>

                  <button className="spec-view-btn">
                    مشاهده پروفایل
                  </button>

                </div>

                {/* امتیاز متخصص */}
                <div className="spec-item-rate">

                  {/* فقط یک ستاره */}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>

                  {/* امتیاز */}
                  {spec.staff_rating !== null &&
                  spec.staff_rating !== undefined ? (
                    <>
                      <span>
                        {spec.staff_rating}
                      </span>

                      {/* تعداد نظر */}
                      <span
                        style={{
                          color: "var(--ink-3)",
                        }}
                      >
                        (
                        {Number(
                          spec.staff_rating_count || 0
                        ).toLocaleString("fa-IR")}
                        )
                      </span>
                    </>
                  ) : (
                    <span
                      style={{
                        color: "var(--ink-3)",
                      }}
                    >
                      هنوز امتیازی ثبت نشده
                    </span>
                  )}

                </div>

                <div className="spec-item-div"></div>

                {/* نوبت بعدی */}
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

                  نوبت بعدی:

                  {spec.next_appointment ? (
                    <b>
                      {spec.next_appointment.appointment_date}
                    </b>
                  ) : (
                    <b>
                      نوبتی ثبت نشده
                    </b>
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

export default SpecialistsSection;