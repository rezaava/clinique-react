import React from "react";

class SpecialtyItem extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <div className="spty-card">
        <span className="spty-ic">
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
            <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
          </svg>
        </span>

        <div className="spty-name">{name}</div>
      </div>
    );
  }
}

export default SpecialtyItem;