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
          {service.category.name} ‹
        </div>

      </div>
    );
  }
}

export default ServiceCard;