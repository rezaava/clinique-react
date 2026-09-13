import React from "react";

class SpecialItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <div className={`jfy-card ${item.type}`}>
        <span className="jfy-ic">
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
            <path d={item.iconPath} />
          </svg>
        </span>

        <div>
          <div className="jfy-eyebrow">{item.eyebrow}</div>

          <div className="jfy-title">{item.title}</div>

          <p className="jfy-desc">{item.description}</p>

          {item.link && (
            <a href={item.link} className="jfy-link">
              رزرو کنید ←
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default SpecialItem;