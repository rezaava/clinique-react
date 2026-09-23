import React from "react";
import { Link } from "react-router-dom";
import "./../../css/Consultation.css";
import withRouter from "../withRouter";

import ConsultationConcernItem from "./ConsultationConcernItemComponent";
import ConsultationSpecialistItem from "./ConsultationSpecialistItemComponent";
import ConsultationDateItem from "./ConsultationDateItemComponent";
import ConsultationTimeItem from "./ConsultationTimeItemComponent";

const labels = {
  0: "",
  1: "انتخاب دغدغه",
  2: "توضیح نیاز",
  3: "انتخاب متخصص",
  4: "زمان مدنظر",
  5: "اطلاعات شما",
  6: "",
};

const dates = [
  {
    id: 1,
    day: "شنبه",
    num: "۱۴",
    month: "شهریور",
  },
  {
    id: 2,
    day: "یکشنبه",
    num: "۱۵",
    month: "شهریور",
  },
  {
    id: 3,
    day: "دوشنبه",
    num: "۱۶",
    month: "شهریور",
  },
  {
    id: 4,
    day: "سه‌شنبه",
    num: "۱۷",
    month: "شهریور",
  },
  {
    id: 5,
    day: "چهارشنبه",
    num: "۱۸",
    month: "شهریور",
  },
  {
    id: 6,
    day: "شنبه",
    num: "۲۱",
    month: "شهریور",
  },
];

const times = [
  {
    id: 1,
    value: "۰۹:۰۰",
    disabled: false,
  },
  {
    id: 2,
    value: "۱۰:۰۰",
    disabled: false,
  },
  {
    id: 3,
    value: "۱۱:۳۰",
    disabled: true,
  },
  {
    id: 4,
    value: "۱۴:۰۰",
    disabled: false,
  },
  {
    id: 5,
    value: "۱۵:۳۰",
    disabled: false,
  },
  {
    id: 6,
    value: "۱۶:۳۰",
    disabled: true,
  },
  {
    id: 7,
    value: "۱۷:۰۰",
    disabled: false,
  },
];

class Consultation extends React.Component {
  state = {
    currentStep: 0,
    stepStack: [0],

    entryPath: null,
    directService: null,

    services: [],
    servicesLoading: true,
    servicesError: null,

    specialists: [],
    specialistsLoading: true,
    specialistsError: null,

    concerns: [],
    desc: "",
    photoAdded: false,
    photo: null,
    photoPreview: null,

    specMode: "any",
    specName: null,

    dateNum: "۱۷",
    dateDay: "سه‌شنبه",
    dateMon: "شهریور",

    anyTime: false,
    time: "۱۵:۳۰",

    name: "",
    phone: "",
    notes: "",
  };

  componentDidMount() {
    const navOuter = document.querySelector(".bottom-nav");

    if (navOuter) {
      navOuter.style.display = "none";
    }

    this.fetchServices();
    this.fetchSpecialists();
  }
  componentWillUnmount() {
    const navOuter = document.querySelector(".bottom-nav");

    if (navOuter) {
      navOuter.style.display = "";
    }
  }

  fetchServices = () => {
    fetch(
      "http://127.0.0.1:8000/api/services"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "خطا در دریافت لیست خدمات"
          );
        }

        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          throw new Error(
            result.message ||
              "لیست خدمات دریافت نشد."
          );
        }

        this.setState({
          services:
            Array.isArray(result.data)
              ? result.data
              : [],
          servicesLoading: false,
          servicesError: null,
        });
      })
      .catch((error) => {
        console.error(error);

        this.setState({
          services: [],
          servicesLoading: false,
          servicesError:
            error.message ||
            "خطا در دریافت خدمات",
        });
      });
  };

  fetchSpecialists = () => {
    fetch(
      "http://127.0.0.1:8000/api/doctors"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "خطا در دریافت لیست متخصصین"
          );
        }

        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          throw new Error(
            result.message ||
              "لیست متخصصین دریافت نشد."
          );
        }

        const specialists =
          result.data &&
          Array.isArray(result.data.user)
            ? result.data.user
            : [];

        this.setState({
          specialists,
          specialistsLoading: false,
          specialistsError: null,
        });
      })
      .catch((error) => {
        console.error(error);

        this.setState({
          specialists: [],
          specialistsLoading: false,
          specialistsError:
            error.message ||
            "خطا در دریافت متخصصین",
        });
      });
  };

  goTo = (step, push = true) => {
    this.setState((prevState) => ({
      currentStep: step,
      stepStack: push
        ? [...prevState.stepStack, step]
        : prevState.stepStack,
    }));
  };

  goBack = () => {
    this.setState((prevState) => {
      if (prevState.stepStack.length > 1) {
        const newStack = [
          ...prevState.stepStack,
        ];

        newStack.pop();

        return {
          currentStep:
            newStack[newStack.length - 1],
          stepStack: newStack,
        };
      }

      this.props.navigate("/services");

      return null;
    });
  };

  toggleConcern = (concern) => {
    this.setState((prevState) => {
      const exists =
        prevState.concerns.some(
          (item) => item.id === concern.id
        );

      return {
        concerns: exists
          ? prevState.concerns.filter(
              (item) =>
                item.id !== concern.id
            )
          : [
              ...prevState.concerns,
              concern,
            ],
      };
    });
  };

  handleInput = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  renderIcon = (type) => {
    const icons = {
      question: (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" />
          <path d="M12 17h.01" />
        </>
      ),

      check: (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </>
      ),

      user: (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
        </>
      ),

      phone: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      ),

      upload: (
        <>
          <path d="M12 16V4M8 8l4-4 4 4" />
          <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </>
      ),

      spark: (
        <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5z" />
      ),
    };

    return (
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
        {icons[type]}
      </svg>
    );
  };

  renderStep0 = () => {
    const {
      entryPath,
      directService,
      services,
      servicesLoading,
      servicesError,
    } = this.state;

    return (
      <div className="wiz-step">
        <h2 className="wizard-title">
          نمی‌دونید چی مناسبتونه؟
        </h2>

        <p className="wizard-sub">
          قبل از تصمیم‌گیری با یک متخصص صحبت کنید. بدون نیاز به تعهد.
        </p>

        <button
          type="button"
          className={`option-card ${
            entryPath === "guide"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            this.setState(
              {
                entryPath: "guide",
                directService: null,
              },
              () => this.goTo(1)
            )
          }
        >
          <span className="option-ic">
            {this.renderIcon("question")}
          </span>

          <span>
            <span className="option-t option-t-block">
              به کمک نیاز دارم
            </span>

            <span className="option-s">
              هنوز مطمئن نیستم — بذارید یک متخصص راهنماییم کنه
            </span>
          </span>
        </button>

        <button
          type="button"
          className={`option-card ${
            entryPath === "direct"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            this.setState({
              entryPath: "direct",
              directService: null,
            })
          }
        >
          <span className="option-ic">
            {this.renderIcon("check")}
          </span>

          <span>
            <span className="option-t option-t-block">
              می‌دونم چی می‌خوام
            </span>

            <span className="option-s">
              یک درمان خاص مدنظرم هست
            </span>
          </span>
        </button>

        {entryPath === "direct" && (
          <div className="direct-service-wrap">
            <div className="field-label-sm">
              انتخاب خدمت
            </div>

            {servicesLoading && (
              <div>
                در حال دریافت خدمات...
              </div>
            )}

            {!servicesLoading &&
              servicesError && (
                <div>
                  {servicesError}
                </div>
              )}

            {!servicesLoading &&
              !servicesError &&
              services.length === 0 && (
                <div>
                  خدمتی برای نمایش وجود ندارد.
                </div>
              )}

            {!servicesLoading &&
              !servicesError &&
              services.length > 0 && (
                <div className="spty-select-grid">
                  {services.map(
                    (service) => (
                      <button
                        type="button"
                        key={service.id}
                        className={`spty-pill ${
                          directService?.id ===
                          service.id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          this.setState(
                            {
                              directService:
                                service,
                            },
                            () =>
                              setTimeout(
                                () =>
                                  this.goTo(
                                    3
                                  ),
                                150
                              )
                          )
                        }
                      >
                        {service.name}
                      </button>
                    )
                  )}
                </div>
              )}
          </div>
        )}
      </div>
    );
  };

  renderStep1 = () => {
    const {
      services,
      servicesLoading,
      servicesError,
      concerns: selectedConcerns,
    } = this.state;

    return (
      <div className="wiz-step">
        <h2 className="wizard-title">
          چه کمکی نیاز دارید؟
        </h2>

        <p className="wizard-sub">
          همه موارد مرتبط رو انتخاب کنید — می‌تونید بیشتر از یکی رو انتخاب کنید.
        </p>

        {servicesLoading && (
          <div>
            در حال دریافت خدمات...
          </div>
        )}

        {!servicesLoading &&
          servicesError && (
            <div>
              {servicesError}
            </div>
          )}

        {!servicesLoading &&
          !servicesError &&
          services.length === 0 && (
            <div>
              خدمتی برای نمایش وجود ندارد.
            </div>
          )}

        {!servicesLoading &&
          !servicesError &&
          services.length > 0 && (
            <div className="concern-grid">
              {services.map((service) => (
                <ConsultationConcernItem
                  key={service.id}
                  item={service}
                  selected={selectedConcerns.some(
                    (item) =>
                      item.id === service.id
                  )}
                  onSelect={
                    this.toggleConcern
                  }
                />
              ))}
            </div>
          )}

        <p className="book-direct-link">
          از قبل می‌دونید چی می‌خواید؟{" "}
          <Link to="/services">
            رزرو مستقیم ←
          </Link>
        </p>
      </div>
    );
  };

  renderStep2 = () => {
    const {
      desc,
      photoAdded,
      photoPreview,
    } = this.state;

    return (
      <div className="wiz-step">
        <h2 className="wizard-title">
          کمی بیشتر توضیح بدید
        </h2>

        <p className="wizard-sub">
          به ما کمک کنید بفهمیم دنبال چی هستید. پرکردن این بخش اختیاریه.
        </p>

        <textarea
          className="field-input"
          value={desc}
          onChange={(e) =>
            this.setState({
              desc: e.target.value,
            })
          }
          placeholder="مثلاً: روی گونه‌هام لکه‌های تیره دارم که از بین نمی‌رن و می‌خوام گزینه‌هام رو بدونم…"
        />

        <div className="field-label-sm">
          افزودن عکس (اختیاری)
        </div>

        <label
          htmlFor="consultation-photo"
          className={`upload-box ${
            photoAdded ? "added" : ""
          }`}
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="پیش‌نمایش عکس"
              className="upload-preview"
            />
          ) : (
            <>
              {this.renderIcon("upload")}

              <span>
                برای افزودن عکس ضربه بزنید
              </span>
            </>
          )}
        </label>

        <input
          id="consultation-photo"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) {
              return;
            }

            this.setState({
              photo: file,
              photoAdded: true,
              photoPreview:
                URL.createObjectURL(file),
            });
          }}
        />

        {photoAdded && (
          <button
            type="button"
            className="remove-photo-btn"
            onClick={() => {
              if (this.state.photoPreview) {
                URL.revokeObjectURL(
                  this.state.photoPreview
                );
              }

              this.setState({
                photo: null,
                photoAdded: false,
                photoPreview: null,
              });

              document.getElementById(
                "consultation-photo"
              ).value = "";
            }}
          >
            حذف عکس
          </button>
        )}

        <p className="book-direct-link book-direct-top">
          از قبل می‌دونید چی می‌خواید؟{" "}
          <Link to="/services">
            رزرو مستقیم ←
          </Link>
        </p>
      </div>
    );
  };

  renderStep3 = () => {
    const {
      specMode,
      specName,
      specialists,
      specialistsLoading,
      specialistsError,
    } = this.state;

    return (
      <div className="wiz-step">
        <h2 className="wizard-title">
          با کدوم متخصص صحبت کنید؟
        </h2>

        <p className="wizard-sub">
          می‌تونید این مرحله رو رد کنید — بهترین متخصص موجود رو معرفی می‌کنیم.
        </p>

        <button
          type="button"
          className={`option-card ${
            specMode === "any"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            this.setState({
              specMode: "any",
              specName: null,
            })
          }
        >
          <span className="option-ic">
            {this.renderIcon("spark")}
          </span>

          <span>
            <span className="option-t option-t-block">
              هر متخصصی
            </span>

            <span className="option-s">
              بهترین گزینه موجود برای مشکل شما
            </span>
          </span>
        </button>

        <button
          type="button"
          className={`option-card ${
            specMode === "choose"
              ? "selected expanded"
              : ""
          }`}
          onClick={() =>
            this.setState({
              specMode: "choose",
            })
          }
        >
          <span className="option-ic">
            {this.renderIcon("user")}
          </span>

          <span>
            <span className="option-t option-t-block">
              انتخاب متخصص
            </span>

            <span className="option-s">
              مشاهده متخصصین موجود
            </span>
          </span>
        </button>

        {specMode === "choose" && (
          <div className="mini-spec-list">
            {specialistsLoading && (
              <div>
                در حال دریافت متخصصین...
              </div>
            )}

            {!specialistsLoading &&
              specialistsError && (
                <div>
                  {specialistsError}
                </div>
              )}

            {!specialistsLoading &&
              !specialistsError &&
              specialists.length === 0 && (
                <div>
                  متخصصی برای نمایش وجود ندارد.
                </div>
              )}

            {!specialistsLoading &&
              !specialistsError &&
              specialists.map(
                (specialist) => (
                  <ConsultationSpecialistItem
                    key={specialist.id}
                    specialist={specialist}
                    selected={
                      specName ===
                      `${specialist.first_name} ${specialist.last_name}`
                    }
                    onSelect={(item) =>
                      this.setState({
                        specName: `${item.first_name} ${item.last_name}`,
                        specMode:
                          "choose",
                      })
                    }
                  />
                )
              )}
          </div>
        )}

        <p className="book-direct-link">
          از قبل می‌دونید چی می‌خواید؟{" "}
          <Link to="/services">
            رزرو مستقیم ←
          </Link>
        </p>
      </div>
    );
  };

  renderStep4 = () => {
    const {
      anyTime,
      dateDay,
      dateNum,
      dateMon,
      time,
    } = this.state;

    const selectedDate = dates.find(
      (date) =>
        date.day === dateDay &&
        date.num === dateNum &&
        date.month === dateMon
    );

    return (
      <div className="wiz-step">
        <h2 className="wizard-title">
          چه زمانی مایلید صحبت کنید؟
        </h2>

        <p className="wizard-sub">
          یک زمان مناسب انتخاب کنید یا بذارید نزدیک‌ترین نوبت خالی رو پیدا کنیم.
        </p>

        <button
          type="button"
          className={`option-card any-time-card ${
            anyTime ? "selected" : ""
          }`}
          onClick={() =>
            this.setState((prevState) => ({
              anyTime: !prevState.anyTime,
            }))
          }
        >
          <span className="option-ic">
            {this.renderIcon("spark")}
          </span>

          <span>
            <span className="option-t option-t-block">
              هر زمان خالی
            </span>

            <span className="option-s">
              نزدیک‌ترین نوبت خالی رو براتون رزرو می‌کنیم
            </span>
          </span>
        </button>

        <div className="field-label-sm field-label-date">
          انتخاب تاریخ
        </div>

        <div className="date-scroll2">
          {dates.map((date) => (
            <ConsultationDateItem
              key={date.id}
              date={date}
              selected={
                selectedDate?.id ===
                date.id
              }
              onSelect={(item) =>
                this.setState({
                  dateDay: item.day,
                  dateNum: item.num,
                  dateMon: item.month,
                })
              }
            />
          ))}
        </div>

        <div className="time-label">
          زمان‌های خالی — {dateDay} {dateNum}{" "}
          {dateMon}
        </div>

        <div className="time-grid2">
          {times.map((item) => (
            <ConsultationTimeItem
              key={item.id}
              time={item}
              selected={
                time === item.value
              }
              onSelect={(selectedTime) =>
                this.setState({
                  time: selectedTime.value,
                })
              }
            />
          ))}
        </div>
      </div>
    );
  };

  renderStep5 = () => {
    const {
      name,
      phone,
      notes,
    } = this.state;

    return (
      <div className="wiz-step">
        <h2 className="wizard-title">
          تقریباً تمومه
        </h2>

        <p className="wizard-sub">
          برای تأیید نهایی باهاتون تماس می‌گیریم. نیازی به ساخت حساب کاربری نیست.
        </p>

        <div className="field-group">
          <div className="field-label">
            نام و نام‌خانوادگی
          </div>

          <div className="field-with-icon">
            {this.renderIcon("user")}

            <input
              type="text"
              value={name}
              onChange={(e) =>
                this.handleInput(
                  "name",
                  e.target.value
                )
              }
              placeholder="مثلاً محمد مهدوی"
            />
          </div>
        </div>

        <div className="field-group">
          <div className="field-label">
            شماره موبایل
          </div>

          <div className="field-with-icon">
            {this.renderIcon("phone")}

            <span className="phone-prefix">
              ۹۸+
            </span>

            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                this.handleInput(
                  "phone",
                  e.target.value
                )
              }
              placeholder="۹۱۲ ۳۴۵ ۶۷۸۹"
              className="phone-input"
            />
          </div>
        </div>

        <div className="field-group field-group-last">
          <div className="field-label">
            یادداشت{" "}
            <span className="optional-label">
              (اختیاری)
            </span>
          </div>

          <textarea
            className="field-input notes-input"
            value={notes}
            onChange={(e) =>
              this.handleInput(
                "notes",
                e.target.value
              )
            }
            placeholder="توضیح کوتاهی اضافه کنید…"
          />
        </div>
      </div>
    );
  };

  renderStep6 = () => {
    const {
      concerns: selectedConcerns,
      directService,
      specMode,
      specName,
      dateDay,
      dateNum,
      dateMon,
      anyTime,
      time,
      phone,
    } = this.state;

    const topic = selectedConcerns.length
      ? selectedConcerns
          .map((item) => item.name)
          .join("، ")
      : directService?.name ||
        "مشخص نشده";

    const specialist =
      specMode === "choose" && specName
        ? specName
        : "هر متخصص موجود";

    const selectedTime = anyTime
      ? "هر زمان خالی، نزدیک‌ترین نوبت"
      : `${dateDay} ${dateNum} ${dateMon}، ساعت ${time}`;

    return (
      <div className="wiz-step">
        <div className="confirm-wrap">
          <div className="confirm-ic">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
              <path d="m8 12.5 2.5 2.5L16 9" />
            </svg>
          </div>

          <h2 className="confirm-title">
            درخواست مشاوره ارسال شد
          </h2>

          <p className="confirm-sub">
            ظرف ۲۴ ساعت آینده برای تأیید نوبتتون باهاتون تماس می‌گیریم.
          </p>
        </div>

        <div className="confirm-card">
          <div className="confirm-row">
            <span className="confirm-row-label">
              موضوع
            </span>

            <span className="confirm-row-val">
              {topic}
            </span>
          </div>

          <div className="confirm-row">
            <span className="confirm-row-label">
              متخصص
            </span>

            <span className="confirm-row-val">
              {specialist}
            </span>
          </div>

          <div className="confirm-row">
            <span className="confirm-row-label">
              زمان
            </span>

            <span className="confirm-row-val">
              {selectedTime}
            </span>
          </div>

          <div className="confirm-row">
            <span className="confirm-row-label">
              تماس
            </span>

            <span className="confirm-row-val confirm-phone">
              ۹۸+ {phone || "—"}
            </span>
          </div>

          <div className="confirm-row">
            <span className="confirm-row-label">
              وضعیت
            </span>

            <span className="confirm-row-val pending">
              در انتظار تأیید
            </span>
          </div>
        </div>

        <div className="confirm-alt-card">
          <div className="confirm-alt-t">
            می‌خواید مستقیم رزرو کنید؟
          </div>

          <p className="confirm-alt-s">
            از این مرحله رد شید و همین الان نوبتتون رو قطعی کنید.
          </p>

          <Link
            to="/services"
            className="btn-solid-full"
          >
            رزرو نوبت
          </Link>
        </div>

        <div className="confirm-btns-row">
          <Link
            to="/request"
            className="btn-out2"
          >
            مشاهده درخواست
          </Link>

          <Link
            to="/"
            className="btn-dark2"
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    );
  };

  renderCurrentStep = () => {
    switch (this.state.currentStep) {
      case 0:
        return this.renderStep0();

      case 1:
        return this.renderStep1();

      case 2:
        return this.renderStep2();

      case 3:
        return this.renderStep3();

      case 4:
        return this.renderStep4();

      case 5:
        return this.renderStep5();

      case 6:
        return this.renderStep6();

      default:
        return null;
    }
  };

  render() {
    const { currentStep } = this.state;

    const showProgress = currentStep !== 0;

    const showFooter =
      currentStep !== 0 &&
      currentStep !== 6;

    let footerText = "";

    if (currentStep === 1) {
      footerText = this.state.concerns.length
        ? "ادامه"
        : "رد شو برای الان";
    } else if (currentStep === 2) {
      footerText =
        this.state.desc ||
        this.state.photoAdded
          ? "ادامه"
          : "رد شو برای الان";
    } else if (currentStep === 3) {
      footerText = "ادامه";
    } else if (currentStep === 4) {
      footerText = "ادامه";
    } else if (currentStep === 5) {
      footerText = "درخواست مشاوره";
    }

    return (
      <div className="page-outer">
        <div className="app-shell">
          <header className="wiz-header">
            <button
              type="button"
              className="icon-btn"
              aria-label="بازگشت"
              onClick={this.goBack}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <h1 className="wiz-step-label">
              {labels[currentStep]}
            </h1>
          </header>

          {showProgress && (
            <div className="progress-bar">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className={`progress-seg ${
                    index < currentStep
                      ? "filled"
                      : ""
                  }`}
                />
              ))}
            </div>
          )}

          <div className="scroll-area">
            {this.renderCurrentStep()}
          </div>

          {showFooter && (
            <div className="wiz-footer">
              <button
                type="button"
                className="wiz-btn"
                onClick={() => {
                  if (
                    currentStep >= 1 &&
                    currentStep <= 5
                  ) {
                    this.goTo(
                      currentStep + 1
                    );
                  }
                }}
              >
                {footerText}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Consultation);