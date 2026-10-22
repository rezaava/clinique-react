import React from "react";
import "./../../css/Register.css";
import { Link } from "react-router-dom";
import withRouter from "../withRouter";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            phone: "",
            password: "",
            showPassword: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { first_name, last_name, phone, password } = this.state;

        if (!first_name.trim() || !last_name.trim() || !phone.trim() || !password) {
            alert("لطفاً تمام فیلدها را تکمیل کنید.");
            return;
        }

        if (!/^09\d{9}$/.test(phone)) {
            alert("شماره موبایل معتبر نیست.");
            return;
        }

        if (password.length < 8) {
            alert("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }

        console.log({
            first_name,
            last_name,
            phone,
            password
        });
    };

    render() {
        return (
            <div className="register-page" dir="rtl">
                <div className="page-header">
                    <button
                        className="icon-btn"
                        aria-label="بازگشت"
                        onClick={() => window.history.back()}
                        type="button"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <div className="page-title">ایجاد حساب کاربری</div>

                    <div className="register-header-space"></div>
                </div>

                <div className="register-scroll-area">
                    <div className="register-intro">
                        <div className="register-icon">
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="8" r="4" />
                                <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
                                <path d="M19 8v6M16 11h6" />
                            </svg>
                        </div>

                        <h1>به اوراکلینیک بپیوندید</h1>
                        <p>برای ساخت حساب کاربری، اطلاعات زیر را وارد کنید.</p>
                    </div>

                    <div className="register-card">
                        <form onSubmit={this.handleSubmit}>
                            <div className="register-name-row">
                                <div className="register-field">
                                    <label htmlFor="first_name">اسم</label>

                                    <div className="register-input-wrap">
                                        <input
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            value={this.state.first_name}
                                            onChange={this.handleChange}
                                            placeholder="نام"
                                            autoComplete="given-name"
                                        />
                                    </div>
                                </div>

                                <div className="register-field">
                                    <label htmlFor="last_name">فامیل</label>

                                    <div className="register-input-wrap">
                                        <input
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            value={this.state.last_name}
                                            onChange={this.handleChange}
                                            placeholder="نام خانوادگی"
                                            autoComplete="family-name"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="register-field">
                                <label htmlFor="register-phone">شماره موبایل</label>

                                <div className="register-input-wrap">
                                    <input
                                        id="register-phone"
                                        type="tel"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        placeholder="09121234567"
                                        autoComplete="tel"
                                        inputMode="numeric"
                                        dir="ltr"
                                    />

                                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="6" y="2" width="12" height="20" rx="2" />
                                        <path d="M11 18h2" />
                                    </svg>
                                </div>
                            </div>

                            <div className="register-field">
                                <label htmlFor="register-password">رمز عبور</label>

                                <div className="register-input-wrap">
                                    <input
                                        id="register-password"
                                        type={this.state.showPassword ? "text" : "password"}
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        placeholder="حداقل ۸ کاراکتر"
                                        autoComplete="new-password"
                                    />

                                    <button
                                        className="register-password-toggle"
                                        type="button"
                                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                                        aria-label={this.state.showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                                    >
                                        {this.state.showPassword ? (
                                            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 3l18 18" />
                                                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9 7 9 7a16 16 0 0 1-4 4.5" />
                                                <path d="M6.2 6.2C3.5 8 2 12 2 12s4 7 10 7a9.8 9.8 0 0 0 3-.5" />
                                            </svg>
                                        ) : (
                                            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <div className="register-password-hint">
                                    رمز عبور باید حداقل ۸ کاراکتر داشته باشد.
                                </div>
                            </div>

                            <button className="register-submit" type="submit">
                                ایجاد حساب کاربری
                            </button>

                            <div className="register-login">
                                قبلاً ثبت‌نام کرده‌اید؟
                                <Link to="/login" className="register-login-btn">
                                    وارد شوید
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="register-footer">
                        با ایجاد حساب، آماده استفاده از خدمات اوراکلینیک خواهید بود.
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);