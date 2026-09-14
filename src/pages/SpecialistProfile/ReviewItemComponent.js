import React from "react";

class ReviewItem extends React.Component {
  render() {
    const {
      avatar,
      name,
      stars,
      tag,
      date,
      text
    } = this.props;

    return (
      <div className="rev-item">
        <div className="rev-top2">
          <span className="rev-avatar2">
            {avatar}
          </span>

          <div className="rev-meta2">
            <div>
              <div className="rev-name2">
                {name}
              </div>

              <div className="rev-stars-row">
                <span className="rev-stars2">
                  {stars}
                </span>

                <span className="rev-tag2">
                  {tag}
                </span>
              </div>
            </div>

            <span className="rev-date2">
              {date}
            </span>
          </div>
        </div>

        <p className="rev-text2">
          {text}
        </p>
      </div>
    );
  }
}

export default ReviewItem;