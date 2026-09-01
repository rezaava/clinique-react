import React from "react";

class ServiceCard extends React.Component {
  render() {
    const {
      service,
      background,
      icon,
    } = this.props;

    const {
      name,
      short_description,
    } = service;

    return (
      <div className="svc-card">

        <div
          className="svc-img"
          style={{
            background: background,
          }}
        >
          {icon}
        </div>

        <div className="svc-name">
          {name}
        </div>

        <div className="svc-cat">
          {short_description} ‹
        </div>

      </div>
    );
  }
}

export default ServiceCard;