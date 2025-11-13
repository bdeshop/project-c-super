import { useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import { useNavigate } from "react-router-dom";

const RegistrationSuccessModal = ({ isOpen, onClose }) => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePromotionClick = () => {
    onClose();
    navigate("/promotion");
  };

  const handleDepositClick = () => {
    onClose();
    navigate("/deposit");
  };

  const text = {
    en: {
      title: "Registration Successful Khela88",
      successTitle: "Registration Successful",
      welcomeText:
        "Welcome to KHELA88, South Asia Most Trusted Online Cricket & Casino Platform. We offer Cricket Exchange, Sportbook, Live Casino and Slot Games. Connect with KHELA88 in Social Media to get the latest Promotions & News.",
      redirectText:
        "To start your betting experience, we will redirect you to Deposit Page. Click the Button below if it is not redirecting.",
      promotionBtn: "Promotion",
      depositBtn: "Deposit Now",
    },
    bn: {
      title: "নিবন্ধন সফল Khela88",
      successTitle: "নিবন্ধন সফল",
      welcomeText:
        "KHELA88-এ স্বাগতম, দক্ষিণ এশিয়ার সবচেয়ে বিশ্বস্ত অনলাইন ক্রিকেট ও ক্যাসিনো প্ল্যাটফর্ম। আমরা ক্রিকেট এক্সচেঞ্জ, স্পোর্টবুক, লাইভ ক্যাসিনো এবং স্লট গেমস অফার করি। সর্বশেষ প্রমোশন ও সংবাদ পেতে সোশ্যাল মিডিয়ায় KHELA88-এর সাথে যুক্ত হন।",
      redirectText:
        "আপনার বেটিং অভিজ্ঞতা শুরু করতে, আমরা আপনাকে ডিপোজিট পেজে রিডাইরেক্ট করব। যদি রিডাইরেক্ট না হয় তাহলে নিচের বাটনে ক্লিক করুন।",
      promotionBtn: "প্রমোশন",
      depositBtn: "এখনই জমা দিন",
    },
  };

  const t = text[language] || text.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-teal-500 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{t.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {t.successTitle}
          </h3>

          {/* Welcome Text */}
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {t.welcomeText}
          </p>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center mb-6 space-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              ✓
            </div>
          </div>

          {/* Redirect Text */}
          <p className="text-gray-600 text-sm mb-6">{t.redirectText}</p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePromotionClick}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t.promotionBtn}
            </button>
            <button
              onClick={handleDepositClick}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t.depositBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;
