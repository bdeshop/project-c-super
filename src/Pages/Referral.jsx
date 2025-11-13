import { useContext } from "react";
import referralBanner from "../assets/referral_banner2.jpg";
import Commission from "../components/Referral/Commission";
import { LanguageContext } from "../Context/LanguageContext";
import { useOutletContext } from "react-router-dom";
import ReferralContent from "../components/Referral/ReferralContent";

const Referral = () => {
  const { language } = useContext(LanguageContext);
  const { siteSettings } = useOutletContext();

  // ✅ ভাষা অনুযায়ী বাটনের টেক্সট সেট করা হলো
  const buttonText = {
    summary: language === "bn" ? "সারসংক্ষেপ" : "Summary",
    report: language === "bn" ? "রেফারেল রিপোর্ট" : "Referral Report",
    history: language === "bn" ? "রিডিম ইতিহাস" : "Redeem History",
  };

  // Force dark background with fallback
  const containerStyle = {
    backgroundColor: siteSettings?.footer?.bgColor || "#001a1a",
    color: siteSettings?.fontSettings?.globalTextColor || "#ffffff",
    minHeight: "100vh",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <img
            src={referralBanner}
            alt="Referral Banner"
            className="w-full h-auto"
          />

          <div className="lg:flex hidden flex-row p-5 absolute -bottom-5 -right-5 gap-5 items-center md:justify-center lg:justify-end">
            <button
              className="w-full lg:w-auto hover:opacity-80 rounded-sm text-sm px-10 py-1 transition-opacity"
              style={{
                backgroundColor:
                  siteSettings?.header?.loginButtonBg || "#09bda2",
                color: siteSettings?.header?.loginButtonTextColor || "#ffffff",
              }}
            >
              {buttonText.summary}
            </button>
            <button
              className="w-full lg:w-auto hover:opacity-80 rounded-sm text-sm px-10 py-1 transition-opacity"
              style={{
                backgroundColor: "#e5e7eb",
                color: "#374151",
              }}
            >
              {buttonText.report}
            </button>
            <button
              className="w-full lg:w-auto hover:opacity-80 rounded-sm px-10 text-sm py-1 transition-opacity"
              style={{
                backgroundColor: "#e5e7eb",
                color: "#374151",
              }}
            >
              {buttonText.history}
            </button>
          </div>
        </div>

        {/* Referral Content */}
        <ReferralContent />
        
        <Commission language={language} siteSettings={siteSettings} />
      </div>
    </div>
  );
};

export default Referral;