import React from "react";
import "./../../css/Login.css";
import withRouter from "../withRouter";
import { Link } from "react-router-dom";

const API_URL = "http://laclinique.rezaavareh.ir/api/auth";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: "",
            otp: ["", "", "", ""],
            screen: "phone",
            loading: false,
            error: "",
            success: "",
            timer: 0
        };

        this.otpRefs = [
            React.createRef(),
            React.createRef(),
            React.createRef(),
            React.createRef()
        ];

        this.timerInterval = null;
    }

    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    // تبدیل اعداد فارسی و عربی به انگلیسی
    toEnglishDigits = (value) => {
        return value
            .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
            .replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
    };

    // استانداردسازی شماره موبایل
    normalizePhone = (value) => {
        let phone = this.toEnglishDigits(value).replace(/\D/g, "");

        if (phone.startsWith("98")) {
            phone = "0" + phone.substring(2);
        }

        if (phone.length === 10 && phone.startsWith("9")) {
            phone = "0" + phone;
        }

        return phone;
    };

    handlePhoneChange = (e) => {
        const phone = this.toEnglishDigits(e.target.value).replace(/\D/g, "");

        this.setState({
            phone: phone.substring(0, 11),
            error: "",
            success: ""
        });
    };

    // شروع تایمر ارسال مجدد
    startTimer = () => {
        clearInterval(this.timerInterval);

        this.setState({ timer: 120 });

        this.timerInterval = setInterval(() => {
            this.setState(prevState => {
                if (prevState.timer <= 1) {
                    clearInterval(this.timerInterval);
                    return { timer: 0 };
                }

                return { timer: prevState.timer - 1 };
            });
        }, 1000);
    };

    formatTimer = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    // ارسال کد به شماره موبایل
    sendCode = () => {
        const phone = this.normalizePhone(this.state.phone);

        if (!/^09\d{9}$/.test(phone)) {
            this.setState({
                error: "شماره موبایل باید ۱۱ رقم و با 09 شروع شود."
            });
            return;
        }

        this.setState({
            loading: true,
            error: "",
            success: ""
        });

        fetch(`${API_URL}/send-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                phone: phone
            })
        })
            .then(response => {
                return response.json().then(result => ({
                    ok: response.ok,
                    result: result
                }));
            })
            .then(({ ok, result }) => {
                if (!ok || !result.success) {
                    throw new Error(result.message || "خطا در ارسال کد");
                }
                this.setState({
                    screen: "otp",
                    otp: ["", "", "", ""],
                    error: "",
                    success: `کد تأیید تست: ${result.code}`
                });

                this.startTimer();
            })
            .catch(error => {
                this.setState({
                    error: error.message || "ارتباط با سرور برقرار نشد."
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    // تغییر شماره موبایل
    editNumber = () => {
        clearInterval(this.timerInterval);

        this.setState({
            screen: "phone",
            otp: ["", "", "", ""],
            error: "",
            success: "",
            timer: 0
        });
    };

    // تغییر یکی از خانه‌های OTP
    handleOtpChange = (index, value) => {
        const digit = this.toEnglishDigits(value).replace(/\D/g, "");

        if (!digit) {
            const otp = [...this.state.otp];
            otp[index] = "";

            this.setState({
                otp: otp,
                error: ""
            });

            return;
        }

        const otp = [...this.state.otp];
        otp[index] = digit.slice(-1);

        this.setState({
            otp: otp,
            error: ""
        }, () => {
            if (index < 3 && this.otpRefs[index + 1].current) {
                this.otpRefs[index + 1].current.focus();
            }

            if (otp.every(item => item !== "")) {
                this.verifyCode();
            }
        });
    };

    handleOtpKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !this.state.otp[index] &&
            index > 0
        ) {
            this.otpRefs[index - 1].current.focus();
        }
    };

    handleOtpPaste = (e) => {
        e.preventDefault();

        const pasted = this.toEnglishDigits(
            e.clipboardData.getData("text")
        ).replace(/\D/g, "").slice(0, 4);

        if (!pasted) return;

        const otp = ["", "", "", ""];

        pasted.split("").forEach((digit, index) => {
            otp[index] = digit;
        });

        this.setState({
            otp: otp,
            error: ""
        }, () => {
            const nextIndex = Math.min(pasted.length, 3);

            if (this.otpRefs[nextIndex].current) {
                this.otpRefs[nextIndex].current.focus();
            }

            if (pasted.length === 4) {
                this.verifyCode();
            }
        });
    };

    // تأیید کد و ورود
    verifyCode = () => {
        const code = this.state.otp.join("");
        const phone = this.normalizePhone(this.state.phone);

        if (code.length !== 4) {
            this.setState({
                error: "لطفاً کد چهار رقمی را کامل وارد کنید."
            });
            return;
        }

        if (this.state.loading) return;

        this.setState({
            loading: true,
            error: "",
            success: ""
        });

        fetch(`${API_URL}/verify-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                phone: phone,
                code: code
            })
        })
            .then(response => {
                return response.json().then(result => ({
                    ok: response.ok,
                    result: result
                }));
            })
            .then(({ ok, result }) => {
                if (!ok || !result.success) {
                    throw new Error(result.message || "کد تأیید اشتباه است.");
                }

                if (!result.token) {
                    throw new Error("توکن ورود از سرور دریافت نشد.");
                }

                localStorage.setItem("token", result.token);

                if (result.user) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                }

                clearInterval(this.timerInterval);

                this.setState({
                    success: "ورود با موفقیت انجام شد."
                });

                this.props.navigate("/");
            })
            .catch(error => {
                this.setState({
                    error: error.message || "ارتباط با سرور برقرار نشد."
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    render() {
        const { phone, otp, screen, loading, error, success, timer } = this.state;

        const validPhone = /^09\d{9}$/.test(this.normalizePhone(phone));
        const validOtp = otp.every(item => item !== "");

        return (
            <div className="page-outer">
                <div className="app-shell">

                    <div className="top-bar">
                        <button
                            className="icon-btn invisible"
                            aria-hidden="true"
                            type="button"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24"></svg>
                        </button>

                        <button
                            className="icon-btn"
                            aria-label="بستن"
                            type="button"
                            onClick={() => this.props.navigate("/")}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="content">

                        <div className="brand-block">
                            <div className="brand-logo">
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                                </svg>
                            </div>

                            <div className="brand-name">اوراکلینیک</div>
                            <div className="brand-sub">کلینیک زیبایی</div>
                        </div>

                        {/* مرحله شماره موبایل */}
                        <div
                            className={`screen ${screen === "phone" ? "active" : ""}`}
                            data-screen="phone"
                        >
                            <div className="step-title">
                                به اوراکلینیک خوش آمدید
                            </div>

                            <div className="step-sub">
                                برای ورود یا ثبت‌نام، شماره موبایل خود را وارد کنید
                            </div>

                            <span className="field-label">
                                شماره موبایل
                            </span>

                            <div className="phone-field">
                                <input
                                    type="tel"
                                    id="phoneInput"
                                    placeholder="۹۱۲ ۱۲۳ ۴۵۶۷"
                                    inputMode="numeric"
                                    maxLength="11"
                                    dir="ltr"
                                    value={phone}
                                    onChange={this.handlePhoneChange}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") {
                                            this.sendCode();
                                        }
                                    }}
                                />

                                <span className="phone-cc">
                                    🇮🇷 ۹۸+
                                </span>
                            </div>

                            {error && (
                                <p className="otp-error" style={{ display: "block" }}>
                                    {error}
                                </p>
                            )}

                            <button
                                className={`primary-btn ${!validPhone || loading ? "disabled" : ""}`}
                                id="sendCodeBtn"
                                type="button"
                                disabled={!validPhone || loading}
                                onClick={this.sendCode}
                            >
                                <span>
                                    {loading ? "در حال ارسال..." : "ارسال کد تأیید"}
                                </span>

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        d="m15 6-6 6 6 6"
                                        transform="scale(-1,1) translate(-24,0)"
                                    />
                                </svg>
                            </button>

                            <div className="divider-row">
                                <span className="line"></span>
                                <span>یا</span>
                                <span className="line"></span>
                            </div>

                            <div className="social-row">
                                <button
                                    className="social-btn"
                                    type="button"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
                                        <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.4 7.4 24 12 24Z" />
                                        <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1Z" />
                                        <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.6l4 3.1c.9-2.8 3.5-4.9 6.6-4.9Z" />
                                    </svg>

                                    گوگل
                                </button>

                                <button
                                    className="social-btn"
                                    type="button"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M17.05 12.04c-.03-3.06 2.5-4.53 2.6-4.6-1.42-2.08-3.64-2.36-4.44-2.4-1.9-.19-3.7 1.12-4.66 1.12-.97 0-2.45-1.1-4.03-1.06-2.07.03-3.98 1.2-5.04 3.05-2.15 3.73-.55 9.24 1.54 12.26 1.03 1.47 2.25 3.12 3.86 3.06 1.55-.06 2.13-1 4-1 1.86 0 2.4 1 4.03.97 1.67-.03 2.73-1.5 3.73-2.97 1.18-1.7 1.66-3.36 1.68-3.44-.04-.02-3.2-1.23-3.27-4.89Z" />
                                        <path d="M14.2 3.1c.84-1.02 1.4-2.43 1.25-3.84-1.2.05-2.68.8-3.55 1.8-.78.9-1.46 2.34-1.28 3.72 1.36.1 2.75-.68 3.58-1.68Z" />
                                    </svg>

                                    اپل
                                </button>
                            </div>

                            <div className="spacer"></div>

                            <p className="terms-line">
                                با ادامه، <a href="#">شرایط استفاده</a> و{" "}
                                <a href="#">حریم خصوصی</a> اوراکلینیک را می‌پذیرید.
                            </p>

                            <div className="guest-link">
                                <Link className="button" to="/">
                                    فعلاً نه، <span>ادامه به‌صورت مهمان</span>
                                </Link>
                            </div>
                        </div>

                        {/* مرحله تأیید کد */}
                        <div
                            className={`screen ${screen === "otp" ? "active" : ""}`}
                            data-screen="otp"
                        >
                            <div className="step-title">
                                کد تأیید را وارد کنید
                            </div>

                            <div className="step-sub">
                                کد ۴ رقمی پیامک‌شده به{" "}
                                <b
                                    id="otpPhoneDisplay"
                                    style={{ unicodeBidi: "plaintext" }}
                                >
                                    {phone}
                                </b>{" "}
                                را وارد کنید
                            </div>

                            <div className="otp-row">
                                {[0, 1, 2, 3].map(index => (
                                    <input
                                        key={index}
                                        ref={this.otpRefs[index]}
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength="1"
                                        className="otp-box"
                                        data-otp=""
                                        value={otp[index]}
                                        onChange={e => this.handleOtpChange(index, e.target.value)}
                                        onKeyDown={e => this.handleOtpKeyDown(index, e)}
                                        onPaste={this.handleOtpPaste}
                                        disabled={loading}
                                    />
                                ))}
                            </div>

                            {this.state.success && (
                                <div className="otp-test-code">
                                    {this.state.success}
                                </div>
                            )}

                            {error && (
                                <p className="otp-error" id="otpError" style={{ display: "block" }}>
                                    {error}
                                </p>
                            )}

                            <div
                                className="resend-row"
                                id="resendRow"
                                onClick={() => {
                                    if (timer === 0 && !loading) {
                                        this.sendCode();
                                    }
                                }}
                                style={{
                                    cursor: timer === 0 && !loading ? "pointer" : "default"
                                }}
                            >
                                {timer > 0 ? (
                                    <>
                                        ارسال مجدد کد تا{" "}
                                        <span className="resend-timer" id="resendTimer">
                                            {this.formatTimer(timer)}
                                        </span>
                                    </>
                                ) : (
                                    <span>ارسال مجدد کد</span>
                                )}
                            </div>

                            <div className="edit-number-row">
                                <button
                                    id="editNumberBtn"
                                    type="button"
                                    onClick={this.editNumber}
                                >
                                    ویرایش شماره موبایل
                                </button>
                            </div>

                            <div className="spacer"></div>

                            <button
                                className={`primary-btn ${!validOtp || loading ? "disabled" : ""}`}
                                id="verifyBtn"
                                type="button"
                                disabled={!validOtp || loading}
                                onClick={this.verifyCode}
                            >
                                <span>
                                    {loading ? "در حال بررسی..." : "تأیید و ورود"}
                                </span>

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        d="m9 6 6 6-6 6"
                                        transform="scale(-1,1) translate(-24,0)"
                                    />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);