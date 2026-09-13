import React from "react";

class CredentialItem extends React.Component {
  render() {
    const {
      title,
      text,
      icon
    } = this.props;

    return (
      <div className="cred-row">
        <span className="cred-ic">
          {icon}
        </span>

        <div>
          <div className="cred-t">{title}</div>
          <div className="cred-s">{text}</div>
        </div>
      </div>
    );
  }
}

export default CredentialItem;