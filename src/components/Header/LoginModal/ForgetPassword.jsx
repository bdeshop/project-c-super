import { useContext, useState } from "react";
import { LanguageContext } from "../../../Context/LanguageContext";
import { TbReload } from "react-icons/tb";
import { Link } from "react-router-dom";

const ForgetPassword = ({ isOpenForgetPassword, setIsOpenForgetPassword, setIsOpenModal }) => {
  const { language } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    verificationCode: "",
    countryCode: "+880",
    phone: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const text = {
    en: {
      welcome: "Forget Password",
      phone: "Phone",
      title: "Reset Your Password",
      verificationCode: "Verification Code",
      phoneNumber: "Phone Number",
      placeholder: "Enter your phone number",
      button: "Send Reset Link",
      otp: "Request OTP",
      login: "Login",
      noAccount: "Don't have an Account?",
      signUp: "Sign Up",
      reset: "Reset",
    },
    bn: {
      welcome: "পাসওয়ার্ড ভুলে গেছে",
      phone: "ফোন",
      title: "আপনার পাসওয়ার্ড রিসেট করুন",
      verificationCode: "ভেরিফিকেশন কোড",
      phoneNumber: "ফোন নম্বর",
      placeholder: "আপনার ফোন নম্বর লিখুন",
      button: "রিসেট লিংক পাঠান",
      otp: "OTP অনুরোধ করুন",
      login: "প্রবেশ করুন",
      noAccount: "অ্যাকাউন্ট নেই?",
      signUp: "নিবন্ধন",
      reset: "রিসেট",
    },
  };

  if (!isOpenForgetPassword) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setIsOpenForgetPassword(false)}
    >
      <div
        className="bg-white rounded-md shadow-md w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 bg-common-orange">
          <h2 className="font-semibold text-white">{text[language].welcome}</h2>
          <button
            onClick={() => setIsOpenForgetPassword(false)}
            className="text-white hover:text-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <h3 className="p-6">{text[language].phone}</h3>

        <div className="p-6 flex flex-col gap-4">
          {/* Verification Code */}
          <div className="flex gap-2">
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleChange}
              className="w-2/3 p-2 text-black border border-gray-400 rounded-md"
              placeholder={text[language].verificationCode}
            />
            <div className="px-4 flex items-center gap-2 rounded-md bg-common-orange text-white">
              <div>7832</div>
              <button
                type="button"
                onClick={() => alert("Code reloaded!")}
              >
                <TbReload className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-1/3 p-2 text-sm text-black border border-gray-400 rounded-md"
            >
              <option value="+880">+880 (BD)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={text[language].placeholder}
              className="w-2/3 p-2 text-black border border-gray-400 rounded-md"
            />
          </div>

          {/* OTP */}
          <div className="flex items-center gap-2">
            <span className="bg-common-orange text-white text-xs p-2 rounded-md">
              {text[language].otp}
            </span>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="p-2 text-black border border-gray-400 rounded-md flex-1"
            />
          </div>

          {/* Login Link */}
          <div
            className="flex justify-end text-sm hover:text-textPrimary hover:underline cursor-pointer"
            onClick={() => {
              setIsOpenModal(true);
              setIsOpenForgetPassword(false);
            }}
          >
            {text[language].login}
          </div>

          {/* Reset Button */}
          <button className="w-full py-2 rounded-md text-white bg-common-orange">
            {text[language].reset}
          </button>

          {/* Sign Up */}
          <div className=" text-sm">
            {text[language].noAccount}{" "}
            <Link
              to="/nibondon"
              className="hover:text-textPrimary hover:underline text-black"
              onClick={() => {
                
                setIsOpenForgetPassword(false);
              }}
            >
              {text[language].signUp}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
