import React from "react";

class ArticleCard extends React.Component {
  render() {
    const {
      title,
      eyebrow,
      icon,
    } = this.props;

    return (
      <a href="#" className="article-card">

        <span className="article-thumb">
          {icon}
        </span>

        <span className="article-body">

          <span className="article-eyebrow">
            {eyebrow}
          </span>

          <span className="article-t">
            {title}
          </span>

          <span className="article-link">
            بیشتر بخوانید ‹
          </span>

        </span>

      </a>
    );
  }
}

export default ArticleCard;