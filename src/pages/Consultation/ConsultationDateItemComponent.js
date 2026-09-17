import React from "react";

class ConsultationDateItem extends React.Component {
  render() {
    const {
      date,
      selected,
      onSelect,
    } = this.props;

    return (
      <button
        type="button"
        className={`date-chip ${
          selected ? "active" : ""
        }`}
        onClick={() => onSelect(date)}
      >
        <div className="date-chip-day">
          {date.day}
        </div>

        <div className="date-chip-num">
          {date.num}
        </div>

        <div className="date-chip-mon">
          {date.month}
        </div>
      </button>
    );
  }
}

export default ConsultationDateItem;