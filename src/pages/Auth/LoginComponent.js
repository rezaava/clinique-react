import React from "react";
import "./../../css/Login.css";
import withRouter from "../withRouter";
import { Link } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            password: "",
            remember: false,
            showPassword: false,
            loading: false,
            error: "",
            success: ""
        };

        this.messageTimer = null;
    }

    componentWillUnmount() {
        clearTimeout(this.messageTimer);
    }

    showMessage = (type, message) => {
        clearTimeout(this.messageTimer);

        this.setState({
            error: type === "error" ? message : "",
            success: type === "success" ? message : ""
        });

        this.messageTimer = setTimeout(() => {
            this.setState({
                error: "",
                success: ""
            });
        }, 2000);
    };

    closeMessage = () => {
        clearTimeout(this.messageTimer);

        this.setState({
            error: "",
            success: ""
        });
    };

    handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        this.setState({
            [name]: type === "checkbox" ? checked : value,
            error: "",
            success: ""
        });

        clearTimeout(this.messageTimer);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { phone, password } = this.state;

        if (!phone.trim() || !password) {
            this.showMessage(
                "error",
                "لطفاً شماره موبایل و رمز عبور خود را وارد کنید."
            );
            return;
        }

        this.setState({
            loading: true,
            error: "",
            success: ""
        });

        clearTimeout(this.messageTimer);

        fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                phone: phone.trim(),
                password: password
            })
        })
            .then((response) => {
                return response.json().then((result) => {
                    if (!response.ok || !result.success) {
                        if (result.errors) {
                            const errors = Object.values(result.errors).flat();

                            throw new Error(
                                errors.join(" ") ||
                                result.message ||
                                "اطلاعات واردشده صحیح نیست."
                            );
                        }

                        throw new Error(
                            result.message || "ورود به حساب کاربری ناموفق بود."
                        );
                    }

                    return result;
                });
            })
            .then((result) => {
                if (!result.token) {
                    throw new Error("توکن ورود از سرور دریافت نشد.");
                }

                localStorage.setItem("token", result.token);

                this.showMessage(
                    "success",
                    result.message || "ورود با موفقیت انجام شد."
                );

                setTimeout(() => {
                    this.props.navigate("/");
                }, 500);
            })
            .catch((error) => {
                console.error("Login Error:", error);

                this.showMessage(
                    "error",
                    error instanceof TypeError
                        ? "ارتباط با سرور برقرار نشد. اتصال خود را بررسی کنید."
                        : error.message || "خطایی هنگام ورود رخ داد."
                );
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    render() {
        return (
            <div className="login-page" dir="rtl">
                {(this.state.error || this.state.success) && (
                    <div
                        className={`login-toast ${
                            this.state.error
                                ? "login-toast-error"
                                : "login-toast-success"
                        }`}
                        role={this.state.error ? "alert" : "status"}
                    >
                        <span className="login-toast-icon">
                            {this.state.error ? "!" : "✓"}
                        </span>

                        <span className="login-toast-text">
                            {this.state.error || this.state.success}
                        </span>

                        <button
                            type="button"
                            className="login-toast-close"
                            onClick={this.closeMessage}
                            aria-label="بستن پیام"
                        >
                            ×
                        </button>
                    </div>
                )}

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
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <div className="page-title">ورود به حساب کاربری</div>

                    <div className="login-header-space"></div>
                </div>

                <div className="login-scroll-area">
                    <div className="login-intro">
                        <div className="login-icon">
                            <svg
                                width="42"
                                height="42"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                <circle cx="12" cy="16" r="1" />
                                <path d="M12 17v2" />
                            </svg>
                        </div>

                        <h1>خوش آمدید</h1>
                        <p>
                            برای ادامه، لطفاً شماره موبایل و رمز عبور خود را وارد کنید.
                        </p>
                    </div>

                    <div className="login-card">
                        <form onSubmit={this.handleSubmit} noValidate>
                            <div className="login-field">
                                <label htmlFor="phone">شماره موبایل</label>

                                <div className="login-input-wrap">
                                    <input
                                        id="phone"
                                        maxLength={11}
                                        type="tel"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        placeholder="09121234567"
                                        autoComplete="tel"
                                        dir="ltr"
                                        required
                                    />

                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="6" y="2" width="12" height="20" rx="2" />
                                        <path d="M11 18h2" />
                                    </svg>
                                </div>
                            </div>

                            <div className="login-field">
                                <label htmlFor="password">رمز عبور</label>

                                <div className="login-input-wrap">
                                    <input
                                        id="password"
                                        type={
                                            this.state.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        placeholder="رمز عبور خود را وارد کنید"
                                        autoComplete="current-password"
                                        required
                                    />

                                    <button
                                        className="password-toggle"
                                        type="button"
                                        onClick={() =>
                                            this.setState({
                                                showPassword: !this.state.showPassword
                                            })
                                        }
                                        aria-label={
                                            this.state.showPassword
                                                ? "مخفی کردن رمز عبور"
                                                : "نمایش رمز عبور"
                                        }
                                    >
                                        {this.state.showPassword ? (
                                            <svg
                                                width="21"
                                                height="21"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 3l18 18" />
                                                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9 7 9 7a16 16 0 0 1-4 4.5" />
                                                <path d="M6.2 6.2C3.5 8 2 12 2 12s4 7 10 7a9.8 9.8 0 0 0 3-.5" />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="21"
                                                height="21"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="login-options">
                                <label className="remember-option">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={this.state.remember}
                                        onChange={this.handleChange}
                                    />
                                    <span>مرا به خاطر بسپار</span>
                                </label>
                            </div>

                            <button
                                className="login-submit"
                                type="submit"
                                disabled={this.state.loading}
                            >
                                {this.state.loading ? (
                                    <span className="login-loading">
                                        <span className="login-spinner"></span>
                                        در حال ورود...
                                    </span>
                                ) : (
                                    "ورود به حساب کاربری"
                                )}
                            </button>

                            <div className="login-register">
                                حساب کاربری ندارید؟
                                <Link
                                    to="/register"
                                    className="register-login-btn"
                                >
                                    ثبت‌نام کنید
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);