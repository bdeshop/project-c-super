import { useContext, useState } from "react";
import signUpImage from "../assets/bd-desktop-679a25600aae8.jpg";
import { LanguageContext } from "../Context/LanguageContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { Link, useOutletContext } from "react-router-dom";
import explannationImage from "../assets/white-exclamation-mark.png";
import api from "../config/api";
import useReferralStore from "../store/referralStore";
import RegistrationSuccessModal from "../components/Modals/RegistrationSuccessModal";

const SignUp = () => {
  const { setIsOpenModal } = useOutletContext();
  const { language } = useContext(LanguageContext);
  const [step, setStep] = useState(1); // <-- Step state added

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    currency: "BDT",
    countryCode: "+880",
    verificationCode: "",
    referralCode: "",
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Check for referral code in URL parameters
  useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref") || urlParams.get("referral"); // Check both 'ref' and 'referral' parameters
    if (refCode) {
      setFormData((prev) => ({
        ...prev,
        referralCode: refCode,
      }));
    }
  }, []);

  const translations = {
    en: {
      title: "Sign Up",
      username: "Username",
      password: "Password",
      confirmPassword: "Confirm Password",
      placeholder: "Enter here",
      submit: "Next",
      currency: "Currency",
      phoneNumber: "Phone Number",
      countryCode: "Country Code",
      email: "Email",
      verificationCode: "Verification Code",
      referralCode: "Referral Code (optional)",
      legal: "I am of legal age and agree to the",
      terms: "Terms & Conditions",
      back: "Back",
      finalSubmit: "Complete",
    },
    bn: {
      title: "নিবন্ধন",
      username: "ব্যবহারকারীর নাম",
      password: "গোপন নম্বর",
      confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
      placeholder: "এখানে পূরণ করুন",
      submit: "পরবর্তী",
      currency: "মুদ্রা",
      phoneNumber: "ফোন নম্বর",
      countryCode: "কান্ট্রি কোড",
      email: "ইমেইল",
      verificationCode: "যাচাইকরণ কোড",
      referralCode: "রেফারেল কোড (ঐচ্ছিক)",
      legal: "আমি বৈধ বয়সের এবং সম্মত আছি",
      terms: "শর্তাবলী ও নিয়মাবলি",
      back: "পেছনে ",
      finalSubmit: "সম্পূর্ণ",
    },
  };

  const t = translations[language] || translations.bn;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateStep1 = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError(
        language === "en"
          ? "Please fill in all fields"
          : "সকল ক্ষেত্র পূরণ করুন"
      );
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(
        language === "en" ? "Passwords do not match" : "পাসওয়ার্ড মিলছে না"
      );
      return false;
    }
    if (formData.password.length < 6) {
      setError(
        language === "en"
          ? "Password must be at least 6 characters"
          : "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
      );
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(
        language === "en"
          ? "Please enter a valid email address"
          : "অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন"
      );
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone || !formData.verificationCode) {
      setError(
        language === "en"
          ? "Please fill in all required fields"
          : "সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন"
      );
      return false;
    }
    if (!formData.agreed) {
      setError(
        language === "en"
          ? "Please agree to the terms and conditions"
          : "শর্তাবলী ও নিয়মাবলিতে সম্মত হন"
      );
      return false;
    }
    return true;
  };

  // Auto login function after successful signup
  const autoLogin = async (email, password) => {
    try {
      console.log("🔄 Starting auto-login after successful registration...");

      const loginResponse = await api.post("/api/users/login", {
        email: email,
        password: password,
      });

      if (
        loginResponse.data &&
        loginResponse.data.success &&
        loginResponse.data.data.token
      ) {
        console.log("✅ Auto-login successful:", loginResponse.data);

        // Store token in localStorage
        localStorage.setItem("authToken", loginResponse.data.data.token);

        // Store user data if provided
        if (loginResponse.data.data.user) {
          localStorage.setItem(
            "userData",
            JSON.stringify(loginResponse.data.data.user)
          );
        }

        // Store referral settings in localStorage
        if (loginResponse.data.data.referralSettings) {
          localStorage.setItem(
            "referralSettings",
            JSON.stringify(loginResponse.data.data.referralSettings)
          );
          console.log(
            "✅ Referral settings stored during auto-login:",
            loginResponse.data.data.referralSettings
          );
        }

        // Store referral data in the referral store
        const { setReferralDataFromLogin } = useReferralStore.getState();
        setReferralDataFromLogin(loginResponse.data.data);

        // Trigger custom event to notify other components about login
        window.dispatchEvent(new CustomEvent("authStateChanged"));

        console.log("✅ Auto-login completed successfully");
        return true;
      }
    } catch (error) {
      console.error("❌ Auto-login failed:", error);
      return false;
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.countryCode + formData.phone,
        referralCode: formData.referralCode || undefined,
      };

      const response = await api.post("/api/users/signup", signupData);

      if (response.data && response.data.success) {
        setSuccess(
          language === "en"
            ? "Account created successfully! Logging you in..."
            : "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! লগইন করা হচ্ছে..."
        );

        // Attempt auto-login
        const loginSuccess = await autoLogin(formData.email, formData.password);

        if (loginSuccess) {
          // Show success modal after successful signup and login
          setTimeout(() => {
            setSuccess("");
            setShowSuccessModal(true);

            // Reset form
            setFormData({
              username: "",
              password: "",
              confirmPassword: "",
              email: "",
              phone: "",
              currency: "BDT",
              countryCode: "+880",
              verificationCode: "",
              referralCode: "",
              agreed: false,
            });
            setStep(1);

            console.log("🎉 Registration and auto-login completed!");
          }, 2000);
        } else {
          // If auto-login fails, show login modal
          setTimeout(() => {
            setSuccess("");
            setIsOpenModal(true);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          (language === "en"
            ? "Registration failed. Please try again."
            : "নিবন্ধন ব্যর্থ। আবার চেষ্টা করুন।");
        setError(errorMessage);
      } else if (error.request) {
        setError(
          language === "en"
            ? "Network error. Please try again."
            : "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।"
        );
      } else {
        setError(
          language === "en"
            ? "Something went wrong. Please try again."
            : "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1()) {
        setStep(2); // Move to next step
      }
    } else {
      if (validateStep2()) {
        handleSignup(); // Submit the form
      }
    }
  };

  return (
    <div className="py-5  mx-auto lg:max-w-6xl bg-black text-white">
      <div className="flex flex-col lg:flex-row gap-4 lg:border-4 border-textPrimary p-8">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/3 lg:h-[600px] space-y-6"
        >
          <div>
            <h3 className="text-textPrimary flex text-center justify-center border-b-4 border-textPrimary">
              {t.title}
            </h3>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <>
              <div className="text-white pt-8 cursor-pointer  flex items-center justify-center">
                <img src={explannationImage} alt="" className="w-6 h-6" />
                <h3 className="underline ">
                  {language === "en"
                    ? "HOW To Register?"
                    : "কিভাবে নিবন্ধন করবেন"}
                </h3>
              </div>
              <div>
                <h3>{t.username}</h3>
                <input
                  type="text"
                  name="username"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <h3>{t.email}</h3>
                <input
                  type="email"
                  name="email"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <h3>{t.password}</h3>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-x-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-textPrimary text-2xl" />
                  ) : (
                    <FaEye className="text-textPrimary text-2xl" />
                  )}
                </div>
              </div>

              <div className="relative">
                <h3>{t.confirmPassword}</h3>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-x-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-textPrimary text-2xl" />
                  ) : (
                    <FaEye className="text-textPrimary text-2xl" />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div>
                <h3>{t.currency}</h3>
                <select
                  name="currency"
                  className="w-full p-2 text-black border border-gray-400 rounded-md"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="BDT">BDT</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              <div>
                <h3>{t.phoneNumber}</h3>
                <div className="flex gap-2 ">
                  <select
                    name="countryCode"
                    className="lg:w-1/3 p-2 bg-black text-sm text-white border border-gray-400 rounded-md"
                    value={formData.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+880">+880 (BD)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.placeholder}
                    className="w-full p-2 text-black border border-gray-400 rounded-md"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <h3>{t.verificationCode}</h3>
                <div className="flex justify-normal md:justify-between gap-2">
                  <input
                    type="text"
                    name="verificationCode"
                    placeholder={t.placeholder}
                    className="w-2/3 p-2 text-black border border-gray-400 rounded-md"
                    value={formData.verificationCode}
                    onChange={handleChange}
                  />
                  <div className=" px-4 flex justify-center items-center gap-2 rounded-md bg-[#9e9e9e]">
                    <div className="  text-white ">7832</div>
                    <div className="">
                      <button
                        type="button"
                        className="mt-1 text-sm underline text-white"
                        onClick={() => alert("Code reloaded!")}
                      >
                        <TbReload className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3>{t.referralCode}</h3>
                <input
                  type="text"
                  name="referralCode"
                  placeholder={t.placeholder}
                  className="w-full p-2 text-black border border-gray-400 rounded-md"
                  value={formData.referralCode}
                  onChange={handleChange}
                />
              </div>

              <div className="flex  text-sm items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className=""
                />

                <label>
                  {t.legal}{" "}
                  <Link
                    to="/terms"
                    className="text-white  whitespace-nowrap   font-semibold underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.terms}
                  </Link>
                </label>
              </div>
            </>
          )}

          {/* buttons */}

          <div className="flex justify-between gap-6 text-sm items-center">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-bg-Secondary w-full text-white px-4 py-2 rounded-md"
              >
                {t.back}
              </button>
            )}
            <div className="w-full">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-common-orange w-full text-white px-6 py-2 rounded-md ml-auto hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? language === "en"
                    ? "Processing..."
                    : "প্রক্রিয়া করা হচ্ছে..."
                  : step === 1
                  ? t.submit
                  : t.finalSubmit}
              </button>
              {step === 1 && (
                <div className="text-white py-2 flex lg:flex-row flex-col items-center  gap-2">
                  <p>
                    {language === "en"
                      ? "Already have an account"
                      : "ইতিমধ্যে একটি সদস্যপদ আছে?"}
                  </p>
                  <p
                    className="text-textPrimary cursor-pointer underline"
                    onClick={() => setIsOpenModal(true)}
                  >
                    {" "}
                    {language === "en" ? "Login" : "প্রবেশ করুন"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Image Section */}
        <div className="lg:w-full ">
          <img
            src={signUpImage}
            alt="Sign Up Illustration"
            className="w-full h-full  cursor-pointer"
            onClick={() => console.log("Image clicked")}
          />
        </div>
      </div>

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default SignUp;
