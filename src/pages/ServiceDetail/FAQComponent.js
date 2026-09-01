import React from "react";

class FAQ extends React.Component {
  render() {
    const {
      faqs = [],
      openFaq,
      handleFaq,
    } = this.props;

    return (
      <>
        <div className="detail-divider"></div>

        <h3 className="detail-h2">
          سوالات متداول
        </h3>

        <div className="faq-list">

          {faqs.length === 0 ? (
            <div className="faq-empty">
              سوال متداولی برای این خدمت ثبت نشده است.
            </div>
          ) : (
            faqs.map((faq, index) => (
              <div
                className={`faq-item ${
                  openFaq === index ? "open" : ""
                }`}
                key={faq.id}
              >

                <button
                  type="button"
                  className="faq-q"
                  onClick={() => handleFaq(index)}
                >

                  <span>
                    {faq.text}
                  </span>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>

                </button>

                {openFaq === index && (
                  <div className="faq-a">
                    <div className="faq-a-in">
                      {faq.answer}
                    </div>
                  </div>
                )}

              </div>
            ))
          )}

        </div>
      </>
    );
  }
}

export default FAQ;
