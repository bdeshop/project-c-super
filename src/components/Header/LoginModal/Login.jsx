import { useContext, useState } from "react";
import { LanguageContext } from "../../../Context/LanguageContext";
import explannationImage from "../../../assets/white-exclamation-mark.png";
import { IoMdUnlock } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../config/api";
import useReferralStore from "../../../store/referralStore";

const Login = ({ isOpenModal, handleClose, setIsOpenForgetPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { language } = useContext(LanguageContext);

  if (!isOpenModal) return null;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(
        language === "en"
          ? "Please fill in all fields"
          : "সকল ক্ষেত্র পূরণ করুন"
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/api/users/login", {
        email: formData.email,
        password: formData.password,
      });

      // Handle successful login
      if (response.data && response.data.success && response.data.data.token) {
        // Store token in localStorage
        localStorage.setItem("authToken", response.data.data.token);

        // Store user data if provided
        if (response.data.data.user) {
          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.data.user)
          );
        }

        // Store referral settings in localStorage
        if (response.data.data.referralSettings) {
          localStorage.setItem(
            "referralSettings",
            JSON.stringify(response.data.data.referralSettings)
          );
          console.log(
            "✅ Referral settings stored:",
            response.data.data.referralSettings
          );
          console.log(
            "🔍 Stored in localStorage:",
            localStorage.getItem("referralSettings")
          );
        } else {
          console.log(
            "⚠️ No referralSettings in response:",
            response.data.data
          );
        }

        // Store referral data in the referral store
        const { setReferralDataFromLogin } = useReferralStore.getState();
        setReferralDataFromLogin(response.data.data);

        // Close modal and show success message
        handleClose();

        // You can add a success notification here
        console.log("Login successful:", response.data);

        // Trigger custom event to notify other components about login
        window.dispatchEvent(new CustomEvent("authStateChanged"));

        // Don't reload the page - let state management handle the UI update
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // Server responded with error
        const errorMessage =
          error.response.data?.message ||
          (language === "en"
            ? "Invalid email or password"
            : "ভুল ইমেইল বা পাসওয়ার্ড");
        setError(errorMessage);
      } else if (error.request) {
        // Network error
        setError(
          language === "en"
            ? "Network error. Please try again."
            : "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।"
        );
      } else {
        // Other error
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

  const text = {
    en: {
      welcome: "Welcome to [Brand]",
      email: "Email",
      password: "Password",
      enterHere: "Enter here",
      login: "Login",
      forgetPassword: "Forget Password",
      signUp: "Sign Up",
      noAccount: "Don't have an Account?",
    },
    bn: {
      welcome: "[ব্র্যান্ড] এ স্বাগতম",
      email: "ইমেইল",
      password: "পাসওয়ার্ড",
      enterHere: "এখানে পূরণ করুন",
      login: "প্রবেশ করুন",
      forgetPassword: "পাসওয়ার্ড ভুলে গেছেন",
      signUp: "নিবন্ধন",
      noAccount: "অ্যাকাউন্ট নেই?",
    },
  };

  return (
    <div
      className="fixed px-5 lg:px-0 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="bg-white text-xs md:text-base rounded-md shadow-md w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row px-5 py-3 items-center justify-between bg-common-orange">
          <h2 className="font-semibold text-white">{text[language].welcome}</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="text-black py-2 flex items-center justify-center">
          <img src={explannationImage} alt="" className="w-6 h-6" />
          <h3 className="underline">
            {language === "en"
              ? "HOW TO Reset Password"
              : "পাসওয়ার্ড রিসেট করার পদ্ধতি"}
          </h3>
        </div>
        <form onSubmit={handleLogin} className="p-5">
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <h3 className="text-black">{text[language].email}</h3>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-10 text-black p-2 border rounded-md focus:ring-1 focus:ring-red-500"
              placeholder={text[language].enterHere}
              required
            />
            <span className="text-xl absolute left-2 top-1/2 transform -translate-y-1/2 text-textPrimary">
              <FaUser />
            </span>
          </div>

          <h3 className="mt-4 text-black">{text[language].password}</h3>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-10 text-black p-2 border rounded-md focus:ring-1 focus:ring-red-500"
              placeholder={text[language].enterHere}
              required
            />
            <span className="text-2xl absolute left-2 top-1/2 transform -translate-y-1/2 text-textPrimary">
              <IoMdUnlock />
            </span>
            <span
              className="text-2xl absolute right-2 top-1/2 transform -translate-y-1/2 text-textPrimary cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

          <div
            className="flex py-1 hover:text-textPrimary hover:underline justify-end cursor-pointer text-black"
            onClick={() => {
              setIsOpenForgetPassword(true); // Open Forget Password modal
              handleClose(); // Close login modal
            }}
          >
            {text[language].forgetPassword}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-common-orange text-white py-2 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? language === "en"
                ? "Logging in..."
                : "প্রবেশ করা হচ্ছে..."
              : text[language].login}
          </button>
          {/* Sign Up */}
          <div className=" text-sm mt-4">
            {text[language].noAccount}{" "}
            <Link
              to="/nibondon"
              className="hover:text-textPrimary hover:underline text-black"
              onClick={handleClose}
            >
              {text[language].signUp}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
