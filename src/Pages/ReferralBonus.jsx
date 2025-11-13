import { useContext } from "react";
import ReferralExpired from "../components/ReferralBonus/ReferralExpired";
import { LanguageContext } from "../Context/LanguageContext";
import { useOutletContext } from "react-router-dom";

const ReferralBonus = () => {
  const { language } = useContext(LanguageContext);
  const { siteSettings } = useOutletContext();

  // Apply dark theme fallbacks
  const containerStyle = {
    backgroundColor: siteSettings?.footer?.bgColor || "#001a1a",
    color: siteSettings?.fontSettings?.globalTextColor || "#ffffff",
    minHeight: "100vh",
  };

  const buttonStyle = {
    backgroundColor: siteSettings?.header?.loginButtonBg || "#09bda2",
    color: siteSettings?.header?.loginButtonTextColor || "#ffffff",
  };

  return (
    <div style={containerStyle}>
      <div className="mx-auto max-w-4xl lg:max-w-7xl">
        <div 
          className="flex flex-col md:flex-row p-5 gap-3 border-b border-gray-400 items-center md:justify-center lg:justify-start relative"
          style={{
            backgroundColor: siteSettings?.header?.bgColor || "#003333",
          }}
        >
          <button 
            style={buttonStyle}
            className="w-full md:w-auto hover:opacity-90 rounded-sm text-sm px-10 md:px-14 py-1 transition-opacity"
          >
            {language === "bn" ? "দাবী" : "Claim"}
          </button>
          <button 
            className="bg-gray-200 w-full md:w-auto rounded-sm hover:bg-gray-400 px-8 md:px-10 text-sm py-1 text-gray-800"
          >
            {language === "bn" ? "ডাউনলাইন রিপোর্ট" : "Downline Report"}
          </button>
        </div>

        <ReferralExpired language={language} />
      </div>
    </div>
  );
};

export default ReferralBonus;