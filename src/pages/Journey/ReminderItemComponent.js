import React from "react";

class ReminderItem extends React.Component {
  render() {
    const { reminder } = this.props;

    return (
      <div className={`reminder-card ${reminder.last ? "last-reminder" : ""}`}>
        <span className="reminder-ic">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={reminder.iconPath} />
          </svg>
        </span>

        <div className="reminder-text">
          {reminder.text}
        </div>
      </div>
    );
  }
}

export default ReminderItem;