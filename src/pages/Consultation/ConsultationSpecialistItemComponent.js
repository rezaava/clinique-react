import React from "react";

class ConsultationSpecialistItem extends React.Component {
  render() {
    const {
      specialist,
      selected,
      onSelect,
    } = this.props;

    return (
      <button
        type="button"
        className={`mini-spec-card ${
          selected ? "selected" : ""
        }`}
        onClick={() => onSelect(specialist)}
      >
        <span className="mini-spec-avatar">
          {specialist.initials}
        </span>

        <span className="mini-spec-info">
          <span className="mini-spec-name mini-spec-name-block">
            {specialist.name}
          </span>

          <span className="mini-spec-role">
            {specialist.role}
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

            {specialist.rate}
          </span>
        </span>
      </button>
    );
  }
}

export default ConsultationSpecialistItem;