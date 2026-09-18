import React from "react";
import { Link } from "react-router-dom";
import "./../../css/Booking.css";
import ServiceItem from "./ServiceItemComponent";
import SpecialistItem from "./SpecialistItemComponent";
import withRouter from "../withRouter";

const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const toFa = (value) =>
  String(value).replace(/\d/g, (digit) => faDigits[digit]);

const toman = (number) =>
  `${toFa(number.toLocaleString("en-US"))} تومان`;

const jMonthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const stepDefs = [
  { label: "خدمت", title: "رزرو نوبت" },
  { label: "تاریخ", title: "انتخاب تاریخ" },
  { label: "زمان", title: "انتخاب زمان" },
  { label: "خلاصه", title: "بازبینی نوبت" },
  { label: "تأیید", title: "بیعانه نوبت" },
];

const services = [
  {
    id: "botox",
    icon: "sparkle",
    name: "بوتاکس",
    desc: "رفع ظریف خطوط بیان با تزریق دقیق",
    dur: "۳۰ دقیقه",
    price: 12500000,
  },
  {
    id: "filler",
    icon: "drop",
    name: "فیلر پوستی",
    desc: "بازگرداندن حجم و فرم با اسید هیالورونیک",
    dur: "۴۵ دقیقه",
    price: 18700000,
  },
  {
    id: "laser",
    icon: "zap",
    name: "لیزر موهای زائد",
    desc: "کاهش بلندمدت موهای زائد با فناوری پیشرفته",
    dur: "۶۰ دقیقه",
    price: 8300000,
  },
  {
    id: "rejuv",
    icon: "leaf",
    name: "جوان‌سازی پوست",
    desc: "بازسازی و شادابی پوست با نورجوان‌سازی",
    dur: "۷۵ دقیقه",
    price: 14600000,
  },
];

const iconPaths = {
  sparkle:
    "M12 2l1.9 5.5L19.5 9l-5.6 1.5L12 16l-1.9-5.5L4.5 9l5.6-1.5z",
  drop:
    "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  leaf:
    "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
};

const specialists = [
  {
    id: "sarah",
    name: "دکتر آناهیتا کریمی",
    role: "متخصص پوست و زیبایی",
    rating: "۴.۹",
    years: "۸ سال",
    verified: true,
  },
  {
    id: "emma",
    name: "دکتر مریم والی",
    role: "دکتری پوست",
    rating: "۴.۸",
    years: "۱۲ سال",
    verified: false,
  },
  {
    id: "lisa",
    name: "لیلا انصاری",
    role: "متخصص لیزر",
    rating: "۴.۷",
    years: "۵ سال",
    verified: false,
  },
];

const timesAll = [
  "۰۹:۰۰",
  "۱۰:۰۰",
  "۱۰:۳۰",
  "۱۱:۰۰",
  "۱۲:۰۰",
  "۱۳:۰۰",
  "۱۴:۰۰",
  "۱۵:۰۰",
  "۱۵:۳۰",
  "۱۶:۰۰",
  "۱۶:۳۰",
  "۱۷:۰۰",
];

const unavailTimes = [
  "۰۹:۰۰",
  "۱۰:۳۰",
  "۱۲:۰۰",
  "۱۳:۰۰",
  "۱۵:۰۰",
  "۱۶:۰۰",
  "۱۷:۰۰",
];

const unavailOffsets = [2, 6, 13];

function gregorianToJalali(gy, gm, gd) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  let jy = gy <= 1600 ? 0 : 979;

  gy -= gy <= 1600 ? 621 : 1600;

  const gy2 = gm > 2 ? gy + 1 : gy;

  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    g_d_m[gm - 1];

  jy += 33 * Math.floor(days / 12053);
  days %= 12053;

  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  jy += Math.floor((days - 1) / 365);

  if (days > 365) {
    days = (days - 1) % 365;
  }

  const jm =
    days < 186
      ? 1 + Math.floor(days / 31)
      : 7 + Math.floor((days - 186) / 30);

  const jd =
    1 +
    (days < 186
      ? days % 31
      : (days - 186) % 30);

  return [jy, jm, jd];
}

function jalaliToGregorian(jy, jm, jd) {
  let gy = jy <= 979 ? 621 : 1600;

  jy -= jy <= 979 ? 0 : 979;

  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);

  gy += 400 * Math.floor(days / 146097);
  days %= 146097;

  let leap = true;

  if (days > 36524) {
    days--;
    gy += 100 * Math.floor(days / 36524);
    days %= 36524;

    if (days >= 365) {
      days++;
    } else {
      leap = false;
    }
  }

  gy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    leap = false;
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const sal_a = [
    0,
    31,
    (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0
      ? 29
      : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let gm = 0;
  let gd = days + 1;

  for (gm = 0; gm < 13; gm++) {
    const value = sal_a[gm];

    if (gd <= value) {
      break;
    }

    gd -= value;
  }

  return [gy, gm, gd];
}

function jalaliWeekdayIdx(jy, jm, jd) {
  const [gy, gm, gd] = jalaliToGregorian(jy, jm, jd);

  return new Date(gy, gm - 1, gd).getDay();
}

function daysInJalaliMonth(jy, jm) {
  if (jm <= 6) {
    return 31;
  }

  if (jm <= 11) {
    return 30;
  }

  const [gy] = jalaliToGregorian(jy, 12, 30);

  const isLeap =
    ((gy + 1) % 4 === 0 && (gy + 1) % 100 !== 0) ||
    (gy + 1) % 400 === 0;

  return isLeap ? 30 : 29;
}

class Booking extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();

    const [todayJY, todayJM, todayJD] = gregorianToJalali(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );

    this.state = {
      step: 0,

      service: null,

      jy: null,
      jm: null,
      jd: null,

      specialist: null,
      time: null,

      payment: "sep",

      todayJY,
      todayJM,
      todayJD,

      viewJY: todayJY,
      viewJM: todayJM,

      success: false,
    };
  }

  componentDidMount() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    const navOuter = document.querySelector(".bottom-nav");

    if (navOuter) {
      navOuter.style.display = "none";
    }
  }

  componentWillUnmount() {
    const navOuter = document.querySelector(".bottom-nav");

    if (navOuter) {
      navOuter.style.display = "";
    }
  }

  renderIcon = (path, width = 20, fillOnly = false) => {
    return (
      <svg
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill={fillOnly ? "currentColor" : "none"}
        stroke={fillOnly ? "none" : "currentColor"}
        strokeWidth={fillOnly ? undefined : "1.8"}
        strokeLinecap={fillOnly ? undefined : "round"}
        strokeLinejoin={fillOnly ? undefined : "round"}
      >
        <path d={path} />
      </svg>
    );
  };

  goToStep = (step) => {
    this.setState({
      step,
    });
  };

  handleBack = () => {
    const { step } = this.state;

    if (step > 0) {
      this.goToStep(step - 1);
      return;
    }

    this.props.navigate("/client-home");
  };

  selectService = (service) => {
    this.setState({
      service,
    });
  };

  selectDate = (day) => {
    const { viewJY, viewJM } = this.state;

    this.setState({
      jy: viewJY,
      jm: viewJM,
      jd: day,
    });
  };

  changeMonth = (direction) => {
    this.setState((prevState) => {
      let year = prevState.viewJY;
      let month = prevState.viewJM + direction;

      if (month < 1) {
        month = 12;
        year--;
      }

      if (month > 12) {
        month = 1;
        year++;
      }

      return {
        viewJY: year,
        viewJM: month,
      };
    });
  };

  selectSpecialist = (specialist) => {
    this.setState({
      specialist,
    });
  };

  selectTime = (time) => {
    if (unavailTimes.includes(time)) {
      return;
    }

    this.setState({
      time,
    });
  };

  selectPayment = (payment) => {
    this.setState({
      payment,
    });
  };

  getDateString = () => {
    const { jy, jm, jd } = this.state;

    if (!jy || !jm || !jd) {
      return "";
    }

    const weekdays = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
      "شنبه",
    ];

    return `${weekdays[jalaliWeekdayIdx(jy, jm, jd)]}، ${toFa(
      jd
    )} ${jMonthNames[jm - 1]} ${toFa(jy)}`;
  };

  getPriceData = () => {
    const { service } = this.state;

    if (!service) {
      return {
        price: 0,
        deposit: 0,
        balance: 0,
      };
    }

    const price = service.price;
    const deposit = Math.round((price * 0.3) / 1000) * 1000;
    const balance = price - deposit;

    return {
      price,
      deposit,
      balance,
    };
  };

  renderCalendar = () => {
    const {
      todayJY,
      todayJM,
      todayJD,
      viewJY,
      viewJM,
      jy,
      jm,
      jd,
    } = this.state;

    const [gy, gm, gd] = jalaliToGregorian(
      viewJY,
      viewJM,
      1
    );

    const firstDow = new Date(
      gy,
      gm - 1,
      gd
    ).getDay();

    const offset = (firstDow + 1) % 7;

    const totalDays = daysInJalaliMonth(
      viewJY,
      viewJM
    );

    const days = [];

    for (let i = 0; i < offset; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="cal-day empty"
        />
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        viewJY === todayJY &&
        viewJM === todayJM &&
        day === todayJD;

      const isPast =
        viewJY < todayJY ||
        (viewJY === todayJY &&
          viewJM < todayJM) ||
        (viewJY === todayJY &&
          viewJM === todayJM &&
          day < todayJD);

      const isUnavail =
        isPast ||
        unavailOffsets.includes(day % 14);

      const isSelected =
        jy === viewJY &&
        jm === viewJM &&
        jd === day;

      days.push(
        <button
          key={day}
          type="button"
          className={`cal-day ${
            isUnavail ? "unavail" : ""
          } ${isToday ? "today" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => {
            if (!isUnavail) {
              this.selectDate(day);
            }
          }}
        >
          {toFa(day)}
        </button>
      );
    }

    return (
      <div className="cal-grid">
        {days}
      </div>
    );
  };

  renderStep0 = () => {
    const { service } = this.state;

    return (
      <div className="screen active">
        <p className="hint-line">
          یک خدمت را برای شروع انتخاب کنید
        </p>

        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            selected={this.state.service?.id === service.id}
            onSelect={this.selectService}
          />
        ))}
      </div>
    );
  };

  renderStep1 = () => {
    const {
      viewJY,
      viewJM,
      jy,
      jm,
      jd,
    } = this.state;

    const selectedDate =
      jy && jm && jd
        ? this.getDateString()
        : "";

    return (
      <div className="screen active">
        <div className="cal-card">
          <div className="cal-nav">
            <button
              type="button"
              className="cal-month-btn"
              aria-label="ماه قبل"
              onClick={() =>
                this.changeMonth(-1)
              }
            >
              {this.renderIcon(
                "m15 6-6 6 6 6",
                16
              )}
            </button>

            <span className="cal-month-title">
              {jMonthNames[viewJM - 1]}{" "}
              {toFa(viewJY)}
            </span>

            <button
              type="button"
              className="cal-month-btn"
              aria-label="ماه بعد"
              onClick={() =>
                this.changeMonth(1)
              }
            >
              {this.renderIcon(
                "m9 6 6 6-6 6",
                16
              )}
            </button>
          </div>

          <div className="cal-weekdays">
            <span>ش</span>
            <span>ی</span>
            <span>د</span>
            <span>س</span>
            <span>چ</span>
            <span>پ</span>
            <span>ج</span>
          </div>

          {this.renderCalendar()}

          <div className="cal-legend">
            <span className="leg-item">
              <span className="leg-dot sel" />
              انتخاب‌شده
            </span>

            <span className="leg-item">
              <span className="leg-dot tod" />
              امروز
            </span>

            <span className="leg-item">
              <span className="leg-dot una" />
              غیرقابل رزرو
            </span>
          </div>
        </div>

        {selectedDate && (
          <div className="date-confirm">
            <div className="date-confirm-t">
              {selectedDate}
            </div>

            <div className="date-confirm-s">
              برای انتخاب بازه زمانی، دکمه ادامه را بزنید
            </div>
          </div>
        )}
      </div>
    );
  };

  renderStep2 = () => {
    const {
      specialist,
      time,
      jy,
      jm,
      jd,
    } = this.state;

    const date =
      jy && jm && jd
        ? `${toFa(jd)} ${
            jMonthNames[jm - 1]
          } ${toFa(jy)}`
        : "";

    return (
      <div className="screen active">
        <div className="date-chip">
          {this.renderIcon(
            "M16 2v4M8 2v4M3 10h18",
            15
          )}

          <span>{date}</span>
        </div>

        <div className="spec-label">
          متخصصین
        </div>

        {specialists.map((specialist) => (
          <SpecialistItem
            key={specialist.id}
            specialist={specialist}
            selected={
              this.state.specialist?.id === specialist.id
            }
            onSelect={this.selectSpecialist}
          />
        ))}

        <div className="spec-label">
          بازه‌های زمانی
        </div>

        <div className="time-grid">
          {timesAll.map((item) => {
            const unavailable =
              unavailTimes.includes(item);

            return (
              <button
                type="button"
                key={item}
                className={`time-slot ${
                  unavailable ? "unavail" : ""
                } ${
                  time === item ? "selected" : ""
                }`}
                onClick={() =>
                  this.selectTime(item)
                }
                disabled={unavailable}
              >
                {item}
              </button>
            );
          })}
        </div>

        {specialist && time && (
          <div className="time-confirm">
            {time} · {specialist.name}
          </div>
        )}
      </div>
    );
  };

  renderStep3 = () => {
    const {
      service,
      specialist,
      time,
    } = this.state;

    if (!service || !specialist || !time) {
      return null;
    }

    const { jy, jm, jd } = this.state;

    const dateStr = this.getDateString();

    const rows = [
      {
        label: "خدمت",
        value: service.name,
        go: 0,
      },
      {
        label: "متخصص",
        value: specialist.name,
        go: 2,
      },
      {
        label: "تاریخ",
        value: dateStr,
        go: 1,
      },
      {
        label: "زمان",
        value: time,
        go: 2,
      },
      {
        label: "مدت زمان",
        value: service.dur,
        go: 0,
      },
    ];

    const {
      price,
      deposit,
      balance,
    } = this.getPriceData();

    return (
      <div className="screen active">
        <p className="hint-line">
          قبل از ادامه، جزئیات نوبت خود را بررسی کنید
        </p>

        <div className="summary-card">
          {rows.map((row) => (
            <div
              className="summary-row"
              key={row.label}
            >
              <div className="summary-row-l">
                <div className="summary-label">
                  {row.label.toUpperCase()}
                </div>

                <div className="summary-value">
                  {row.value}
                </div>
              </div>

              <button
                type="button"
                className="summary-change"
                onClick={() =>
                  this.goToStep(row.go)
                }
              >
                تغییر
              </button>
            </div>
          ))}
        </div>

        <div className="price-card">
          <div className="price-row">
            <span className="l">
              قیمت خدمت
            </span>

            <span className="v">
              {toman(price)}
            </span>
          </div>

          <div className="price-row deposit">
            <span className="l">
              بیعانه لازم (۳۰٪)
            </span>

            <span className="v">
              {toman(deposit)}
            </span>
          </div>

          <div className="price-row total">
            <span className="l">
              باقی‌مانده در کلینیک
            </span>

            <span className="v">
              {toman(balance)}
            </span>
          </div>
        </div>

        <p className="cancel-note">
          لغو رایگان تا ۲۴ ساعت قبل از نوبت
        </p>
      </div>
    );
  };

  renderStep4 = () => {
    const {
      payment,
      success,
    } = this.state;

    const {
      price,
      deposit,
      balance,
    } = this.getPriceData();

    return (
      <div className="screen active">
        <div className="pay-summary-card">
          <div className="pay-summary-top">
            <div className="pay-summary-row">
              <span className="l">
                مبلغ کل خدمت
              </span>

              <span className="v">
                {toman(price)}
              </span>
            </div>

            <div className="pay-summary-row">
              <span className="l">
                بیعانه لازم (۳۰٪)
              </span>

              <span className="v">
                {toman(deposit)}
              </span>
            </div>
          </div>

          <div className="pay-today">
            <div>
              <div className="pay-today-l">
                پرداخت امروز
              </div>

              <div className="pay-today-s">
                باقی‌مانده {toman(balance)} در کلینیک پرداخت می‌شود
              </div>
            </div>

            <div className="pay-today-v">
              {toman(deposit)}
            </div>
          </div>
        </div>

        <div className="pm-label">
          روش پرداخت
        </div>

        <div
          className={`pm-option ${
            payment === "sep"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            this.selectPayment("sep")
          }
        >
          <span
            className="pm-logo"
            style={{ background: "#c62828" }}
          >
            سپ
          </span>

          <span className="pm-name">
            درگاه سپ (بانک صادرات)
          </span>

          <span className="pm-radio">
            {this.renderIcon(
              "M20 6 9 17l-5-5",
              12
            )}
          </span>
        </div>

        <div
          className={`pm-option ${
            payment === "zarinpal"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            this.selectPayment("zarinpal")
          }
        >
          <span
            className="pm-logo"
            style={{ background: "#ffb400" }}
          >
            ز
          </span>

          <span className="pm-name">
            زرین‌پال
          </span>

          <span className="pm-radio">
            {this.renderIcon(
              "M20 6 9 17l-5-5",
              12
            )}
          </span>
        </div>

        <div
          className={`pm-option ${
            payment === "zibal"
              ? "selected"
              : ""
          }`}
          onClick={() =>
            this.selectPayment("zibal")
          }
        >
          <span
            className="pm-logo"
            style={{ background: "#2f6fed" }}
          >
            زی
          </span>

          <span className="pm-name">
            زیبال
          </span>

          <span className="pm-radio">
            {this.renderIcon(
              "M20 6 9 17l-5-5",
              12
            )}
          </span>
        </div>

        <p className="secure-note">
          پرداخت شما به‌صورت امن پردازش می‌شود.
          <br />
          اطلاعات کارت شما هرگز ذخیره نمی‌شود.
        </p>

        {success && (
          <div className="time-confirm">
            نوبت شما با موفقیت رزرو شد ✓
          </div>
        )}
      </div>
    );
  };

  getContinueState = () => {
    const {
      step,
      service,
      jd,
      specialist,
      time,
    } = this.state;

    if (step === 0) {
      return {
        disabled: !service,
        label: "ادامه",
      };
    }

    if (step === 1) {
      return {
        disabled: !jd,
        label: "ادامه",
      };
    }

    if (step === 2) {
      return {
        disabled: !(time && specialist),
        label: "ادامه",
      };
    }

    if (step === 3) {
      return {
        disabled: false,
        label: "ادامه به بیعانه",
      };
    }

    return {
      disabled: false,
      label: "پرداخت بیعانه",
    };
  };

  handleContinue = () => {
    const {
      step,
      success,
    } = this.state;

    const {
      disabled,
    } = this.getContinueState();

    if (disabled) {
      return;
    }

    if (step < 4) {
      this.goToStep(step + 1);
      return;
    }

    if (!success) {
      this.setState({
        success: true,
      });
    }
  };

  handleSkip = () => {
    this.setState({
      success: true,
    });
  };

  renderCurrentStep = () => {
    const { step } = this.state;

    switch (step) {
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

      default:
        return null;
    }
  };

  render() {
    const {
      step,
      success,
    } = this.state;

    const {
      disabled,
      label,
    } = this.getContinueState();

    return (
      <div className="page-outer">
        <div className="app-shell">
          <div className="page-header">
            <button
              type="button"
              className="icon-btn"
              aria-label="بازگشت"
              onClick={this.handleBack}
            >
              {this.renderIcon(
                "m9 18 6-6-6-6",
                18
              )}
            </button>

            <div className="page-title">
              {stepDefs[step].title}
            </div>

            <button
              type="button"
              className="icon-btn"
              aria-label="بستن"
              onClick={() =>
                this.props.navigate(
                  "/client-home"
                )
              }
            >
              {this.renderIcon(
                "M18 6 6 18M6 6l12 12",
                16
              )}
            </button>
          </div>

          <div className="stepper-wrap">
            <div className="stepper-bars">
              {stepDefs.map((item, index) => (
                <div
                  key={item.label}
                  className={`step-bar ${
                    index < step
                      ? "done"
                      : ""
                  } ${
                    index === step
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="step-bar-fill" />
                </div>
              ))}
            </div>

            <div className="stepper-labels">
              {stepDefs.map((item, index) => (
                <span
                  key={item.label}
                  className={`step-label ${
                    index <= step
                      ? "active"
                      : ""
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="scroll-area">
            {this.renderCurrentStep()}
          </div>

          <div className="bottom-bar">
            <div className="help-line">
              {this.renderIcon(
                "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
                15
              )}

              در انتخاب مطمئن نیستید؟

              <Link to="/consultation">
                مشاوره رایگان بگیرید
              </Link>
            </div>

            <button
              type="button"
              className={`continue-btn ${
                disabled ? "disabled" : ""
              } ${
                success ? "success" : ""
              }`}
              onClick={this.handleContinue}
            >
              {success
                ? "نوبت شما با موفقیت رزرو شد ✓"
                : label}
            </button>

            {step === 4 && !success && (
              <div className="skip-line">
                <button
                  type="button"
                  onClick={this.handleSkip}
                >
                  ادامه بدون بیعانه
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Booking);