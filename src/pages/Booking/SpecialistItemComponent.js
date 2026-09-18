import React from "react";

class SpecialistItem extends React.Component {
  renderIcon = (path, width = 20, fillOnly = false) => {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill={fillOnly ? "currentColor" : "none"}
        stroke={fillOnly ? "none" : "currentColor"}
        strokeWidth={fillOnly ? undefined : "1.8"}
        strokeLinecap={fillOnly ? undefined : "round"}
        strokeLinejoin={fillOnly ? undefined : "round"}
      >
        <path d={path} />
      </svg>
    );
  };

  getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("");
  };

  render() {
    const {
      specialist,
      selected,
      onSelect,
    } = this.props;

    return (
      <div
        className={`spec-pick ${
          selected ? "selected" : ""
        }`}
        onClick={() => onSelect(specialist)}
      >
        <span className="spec-pick-av">
          {this.getInitials(specialist.name)}
        </span>

        <div className="spec-pick-info">
          <div className="spec-pick-name">
            {specialist.name}

            {specialist.verified &&
              this.renderIcon(
                "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                13
              )}
          </div>

          <div className="spec-pick-role">
            {specialist.role}
          </div>

          <div className="spec-pick-rate">
            {this.renderIcon(
              "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
              12,
              true
            )}

            {specialist.rating} ·{" "}
            {specialist.years}
          </div>
        </div>
      </div>
    );
  }
}

export default SpecialistItem;