  import React from "react";
  import "./../../css/Profile.css";

  class Profile extends React.Component {
    state = {
      user: null,
      loading: true,
      error: "",

      toggles: {
        appointment: false,
        sms: false,
        email: false,
        marketing: false,
      },
    };

    componentDidMount() {
      this.getProfile();
    }

    getProfile = () => {
      fetch("http://127.0.0.1:8000/api/profile")
        .then((response) => {
          if (!response.ok) {
            throw new Error("خطا در دریافت اطلاعات پروفایل");
          }

          return response.json();
        })
        .then((result) => {
          const user = result.data?.user || null;

          this.setState({
            user: user,
            loading: false,
            error: "",

            toggles: {
              appointment: Number(user?.appointment_reminders) === 1,
              sms: Number(user?.sms_notifications) === 1,
              email: Number(user?.email_updates) === 1,
              marketing: Number(user?.marketing_messages) === 1,
            },
          });
        })
        .catch((error) => {
          console.error("Profile API Error:", error);

          this.setState({
            error: "دریافت اطلاعات پروفایل با خطا مواجه شد.",
            loading: false,
          });
        });
    };

    handleToggle = (name) => {
      const newValue = !this.state.toggles[name];

      this.setState((prevState) => ({
        toggles: {
          ...prevState.toggles,
          [name]: newValue,
        },
      }));

      fetch(
        `http://127.0.0.1:8000/api/profile/toggle/${name}/${newValue ? 1 : 0}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("خطا در تغییر تنظیمات");
          }

          return response.json();
        })
        .then((result) => {
          console.log("Toggle API:", result);
        })
        .catch((error) => {
          console.error("Toggle API Error:", error);

          // اگر درخواست شکست خورد، ظاهر Toggle هم برگردد
          this.setState((prevState) => ({
            toggles: {
              ...prevState.toggles,
              [name]: !newValue,
            },
          }));
        });
    };

    renderToggle = (name, label) => {
      return (
        <button
          type="button"
          className={`toggle ${this.state.toggles[name] ? "on" : ""}`}
          onClick={() => this.handleToggle(name)}
          aria-label={label}
        >
          <span className="toggle-knob"></span>
        </button>
      );
    };

    render() {
      if (this.state.loading) {
        return (
          <div className="profile-loader">
            <div className="profile-spinner"></div>
            <div className="profile-loader-text">در حال دریافت اطلاعات...</div>
          </div>
        );
      }

      if (this.state.error) {
        return (
          <div className="profile-error">
            {this.state.error}
          </div>
        );
      }
      return (
        <>
          <div className="page-header">
            <button
              className="icon-btn"
              aria-label="بازگشت"
              onClick={() => window.history.back()}
              type="button"
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <div className="page-title">پروفایل من</div>

            <button className="icon-btn" aria-label="تنظیمات" type="button">
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
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
              </svg>
            </button>
          </div>

          <div className="scroll-area">
            <div className="profile-card">
              <div className="avatar-wrap">
                <div className="profile-avatar">س‌ا</div>

                <span className="avatar-cam">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </span>
              </div>

              <div className="profile-info">
                <div className="profile-name">{this.state.user.first_name+' '+this.state.user.last_name}</div>
                <div className="profile-phone">{this.state.user.phone}</div>
                <span className="profile-badge">
                  {this.state.user.status === "active"
                    ? "عضو فعال"
                    : this.state.user.status === "inactive"
                    ? "عضو غیرفعال"
                    : this.state.user.status === "suspended"
                    ? "حساب تعلیق شده"
                    : "نامشخص"}
                </span>
              </div>

              <button className="edit-btn" id="editToggleBtn" type="button">
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
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                </svg>
                ویرایش
              </button>
            </div>

            <div className="complete-banner">
              <span className="complete-ic">
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </span>

              <div className="complete-body">
                <div className="complete-t">تکمیل پروفایل</div>
                <div className="complete-s">
                  افزودن چند جزئیات به ما کمک می‌کند تجربه بهتری برای شما فراهم
                  کنیم.
                </div>
              </div>

              <button className="complete-link" type="button">
                تکمیل
              </button>
            </div>

            <div className="sec">
              <div className="sec-label">اطلاعات شخصی</div>

              <div className="card-block">
                <div id="infoView">
                  <div className="info-row">
                    <span className="info-row-l">نام کامل</span>
                    <span className="info-row-v">{this.state.user.first_name+' '+this.state.user.last_name}</span>
                  </div>

                  <div className="info-row">
                    <span className="info-row-l">موبایل</span>
                    <span className="info-row-v ltr-text">
                      {this.state.user.phone}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-row-l">ایمیل</span>
                    <span className="info-row-v">
                      {this.state.user.email}
                    </span>
                  </div>

                  <div className="info-row">
                    <span className="info-row-l">تاریخ تولد</span>
                    <span className="info-row-v">{this.state.user.birth_date}</span>
                  </div>
                </div>

                <div id="infoEdit" className="edit-form">
                  <div className="field">
                    <span className="field-label">نام کامل</span>
                    <input type="text" value="سارا احمدی" readOnly />
                  </div>

                  <div className="field">
                    <span className="field-label">شماره موبایل</span>
                    <input
                      type="tel"
                      value="۰۹۱۲ ۱۲۳ ۴۵۶۷"
                      className="ltr-input"
                      readOnly
                    />
                  </div>

                  <div className="field">
                    <span className="field-label">ایمیل (اختیاری)</span>
                    <input
                      type="email"
                      value="sara.ahmadi@example.com"
                      readOnly
                    />
                  </div>

                  <div className="field">
                    <span className="field-label">تاریخ تولد (اختیاری)</span>
                    <input
                      type="text"
                      value="۲۵ خرداد ۱۳۶۹"
                      readOnly
                    />
                  </div>

                  <div className="form-actions">
                    <button className="form-btn cancel" type="button">
                      انصراف
                    </button>

                    <button className="form-btn save" type="button">
                      ذخیره تغییرات
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sec">
              <div className="sec-label">ترجیحات من</div>

              <div className="card-block">
                <div className="sub-label">اعلان‌های ضروری</div>

                <div className="list-row">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">یادآوری نوبت‌ها</div>
                    <div className="row-s">
                      یادآوری قبل از نوبت‌های پیش‌رو
                    </div>
                  </div>

                  {this.renderToggle("appointment", "یادآوری نوبت‌ها")}
                </div>

                <div className="list-row">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">پیامک اطلاع‌رسانی</div>
                    <div className="row-s">
                      بروزرسانی لحظه‌ای از طریق پیامک
                    </div>
                  </div>

                  {this.renderToggle("sms", "پیامک اطلاع‌رسانی")}
                </div>

                <div className="sub-label">بازاریابی</div>

                <div className="list-row">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.9 5.3a2 2 0 0 1-2.2 0L2 7" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">بروزرسانی ایمیلی</div>
                    <div className="row-s">
                      اخبار و بروزرسانی‌های کلینیک
                    </div>
                  </div>

                  {this.renderToggle("email", "بروزرسانی ایمیلی")}
                </div>

                <div className="list-row">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 11 18-5v12L3 14v-3z" />
                      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">پیام‌های تبلیغاتی</div>
                    <div className="row-s">
                      پیشنهادهای ویژه و تخفیف‌های کلینیک
                    </div>
                  </div>

                  {this.renderToggle("marketing", "پیام‌های تبلیغاتی")}
                </div>

                <div className="list-row clickable">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">زبان</div>
                  </div>

                  <div className="row-right">
                    <span className="language-value">فارسی</span>

                    <span className="row-chev">
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
                        <path d="m15 6-6 6 6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sec">
              <div className="sec-label">کلینیک من</div>

              <div className="card-block">
                <div className="list-row">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-s clinic-label">شعبه ترجیحی</div>
                    <div className="row-t">اوراکلینیک — شعبه مرکزی</div>
                  </div>
                </div>

                <div className="list-row">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-s clinic-label">متخصص اختصاصی</div>
                    <div className="row-t">دکتر آناهیتا کریمی</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sec">
              <div className="sec-label">دسترسی سریع</div>
              <div className="card-block" id="quickAccess"></div>
            </div>

            <div className="sec">
              <div className="sec-label">
                حریم خصوصی و حساب کاربری
              </div>

              <div className="card-block">
                <div className="list-row clickable">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">حریم خصوصی</div>
                  </div>

                  <span className="row-chev">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                    >
                      <path d="m15 6-6 6 6 6" />
                    </svg>
                  </span>
                </div>

                <div className="list-row clickable">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">تنظیمات اعلان‌ها</div>
                  </div>

                  <span className="row-chev">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                    >
                      <path d="m15 6-6 6 6 6" />
                    </svg>
                  </span>
                </div>

                <div className="list-row clickable">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">تغییر شماره موبایل</div>
                  </div>

                  <span className="row-chev">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                    >
                      <path d="m15 6-6 6 6 6" />
                    </svg>
                  </span>
                </div>

                <div className="list-row clickable">
                  <span className="row-ic">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <path d="M16 17l5-5-5-5M21 12H9" />
                    </svg>
                  </span>

                  <div className="row-body">
                    <div className="row-t">خروج از حساب</div>
                  </div>

                  <span className="row-chev">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                    >
                      <path d="m15 6-6 6 6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <button className="delete-link" id="deleteOpenBtn" type="button">
              حذف حساب کاربری
            </button>
          </div>

          <div className="sheet-overlay" id="deleteSheet">
            <div className="sheet-box">
              <div className="sheet-handle"></div>

              <span className="sheet-ic">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                </svg>
              </span>

              <div className="sheet-title">حذف حساب کاربری</div>

              <div className="sheet-desc">
                این کار حساب شما و تمام اطلاعات مرتبط را برای همیشه حذف می‌کند.
                این عملیات غیرقابل بازگشت است.
              </div>

              <div className="sheet-actions">
                <button
                  className="sheet-btn cancel"
                  id="deleteCancelBtn"
                  type="button"
                >
                  انصراف
                </button>

                <button className="sheet-btn danger" type="button">
                  حذف حساب کاربری
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  export default Profile;