import React from "react";
import { Link } from "react-router-dom";

class ServiceCard extends React.Component {
  render() {
    const {
      service,
      background,
      icon,
    } = this.props;

    const {
      id,
      name,
      category,
    } = service;

    return (
      <Link
        to={`/service-detail/${id}`}
        className="svc-card"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
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
          {category?.name} ‹
        </div>
      </Link>
    );
  }
}

export default ServiceCard;