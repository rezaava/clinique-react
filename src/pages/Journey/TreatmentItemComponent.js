import React from "react";

class TreatmentItem extends React.Component {
  state = {
    open: this.props.treatment.open || false,
  };

  handleToggle = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { treatment } = this.props;
    const { open } = this.state;

    return (
      <div className={`tr-card ${open ? "open" : ""}`}>
        <button
          className="tr-head"
          onClick={this.handleToggle}
          type="button"
        >
          <span className="tr-ic">
            <svg
              width="19"
              height="19"
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

          <span className="tr-info">
            <span className="tr-name">{treatment.name}</span>

            <span className="tr-meta">
              {treatment.date} · {treatment.doctor}
            </span>
          </span>

          <span className="tr-pill">
            {treatment.status}
          </span>

          <span className="tr-chev">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>

        {open && (
          <div className="tr-body">
            <div className="tr-body-in">
              <p className="tr-desc">
                {treatment.description}
              </p>

              <div className="tr-after">
                <div className="tr-after-label">
                  مراقبت‌های پس از درمان
                </div>

                <div className="tr-after-text">
                  {treatment.afterCare}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TreatmentItem;