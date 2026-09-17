import React from "react";

class ConsultationConcernItem extends React.Component {
  renderIcon = (type) => {
    const icons = {
      question: (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
          <path d="M12 17h.01" />
        </>
      ),
      skin: (
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
      ),
      hair: (
        <>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
        </>
      ),
      face: (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </>
      ),
      body: (
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z" />
      ),
      injection: (
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      ),
      laser: (
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      ),
      more: (
        <>
          <circle cx="5" cy="12" r="1.4" />
          <circle cx="12" cy="12" r="1.4" />
          <circle cx="19" cy="12" r="1.4" />
        </>
      ),
    };

    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[type]}
      </svg>
    );
  };

  render() {
    const { item, selected, onSelect } = this.props;

    return (
      <button
        type="button"
        className={`concern-card ${selected ? "selected" : ""}`}
        onClick={() => onSelect(item)}
      >
        <span className="concern-ic">
          {this.renderIcon(item.icon)}
        </span>

        <div className="concern-label">
          {item.name}
        </div>
      </button>
    );
  }
}

export default ConsultationConcernItem;