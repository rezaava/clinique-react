import React from "react";

class ConsultationTimeItem extends React.Component {
  render() {
    const {
      time,
      selected,
      onSelect,
    } = this.props;

    return (
      <button
        type="button"
        disabled={time.disabled}
        className={`time-chip ${
          time.disabled ? "disabled" : ""
        } ${selected ? "active" : ""}`}
        onClick={() => onSelect(time)}
      >
        {time.value}
      </button>
    );
  }
}

export default ConsultationTimeItem;