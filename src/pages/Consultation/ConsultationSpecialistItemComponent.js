import React from "react";

class ConsultationSpecialistItem extends React.Component {
  render() {
    const {
      specialist,
      selected,
      onSelect,
    } = this.props;

    const name = `${specialist.first_name || ""} ${
      specialist.last_name || ""
    }`.trim();

    const initials = `${(
      specialist.first_name || ""
    ).charAt(0)}‌${(
      specialist.last_name || ""
    ).charAt(0)}`;

    return (
      <button
        type="button"
        className={`mini-spec-card ${
          selected ? "selected" : ""
        }`}
        onClick={() => onSelect(specialist)}
      >
        <span className="mini-spec-avatar">
          {initials}
        </span>

        <span className="mini-spec-info">
          <span className="mini-spec-name mini-spec-name-block">
            {name}
          </span>

          <span className="mini-spec-role">
            {specialist.ability || "پزشک متخصص"}
          </span>

          <span className="mini-spec-rate">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>

            {specialist.rating || 0}

            <span>
              ({specialist.rating_count || 0} نظر)
            </span>

            <span>
              · {specialist.experience
                ? `${specialist.experience} سال سابقه`
                : "سابقه ثبت نشده"}
            </span>
          </span>
        </span>
      </button>
    );
  }
}

export default ConsultationSpecialistItem;