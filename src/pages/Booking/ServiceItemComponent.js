import React from "react";

const iconPaths = {
  sparkle:
    "M12 2l1.9 5.5L19.5 9l-5.6 1.5L12 16l-1.9-5.5L4.5 9l5.6-1.5z",
  drop:
    "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  leaf:
    "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
};

const toFa = (value) => {
  const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return String(value).replace(
    /\d/g,
    (digit) => faDigits[digit]
  );
};

const toman = (number) =>
  `${toFa(number.toLocaleString("en-US"))} تومان`;

class ServiceItem extends React.Component {
  renderIcon = (path, width = 20) => {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    );
  };

  render() {
    const {
      service,
      selected,
      onSelect,
    } = this.props;

    return (
      <div
        className={`svc-pick ${
          selected ? "selected" : ""
        }`}
        onClick={() => onSelect(service)}
      >
        <span className="svc-check">
          {this.renderIcon(
            "M20 6 9 17l-5-5",
            13
          )}
        </span>

        <div className="svc-pick-thumb">
          {this.renderIcon(
            iconPaths[service.icon],
            22
          )}
        </div>

        <div className="svc-pick-body">
          <div className="svc-pick-name">
            {service.name}
          </div>

          <div className="svc-pick-desc">
            {service.desc}
          </div>

          <div className="svc-pick-meta">
            <span className="svc-pick-dur">
              {this.renderIcon(
                "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 5v5l4 2",
                13
              )}
              {service.dur}
            </span>

            <span className="svc-pick-price">
              از {toman(service.price)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceItem;