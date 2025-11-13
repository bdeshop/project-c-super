import referelpeopleimg from "../../assets/referral-people.svg";
import referelinfologo from "../../assets/referral-info.svg";
import downloadlogo from "../../assets/download.png";

const Commission = ({ language, siteSettings }) => {
  const texts = {
    en: {
      todayCommission: "Today Commission",
      thisMonthCommission: "This month Commission",
      referralLevel: "Referral Level",
      total: "Total",
      redeem: "Redeem",
      commissionToRedeem: "Commission To Redeem",
      shareNow: "Share Now",
      referralCode: "Referral Code",
      id: "Id:",
    },
    bn: {
      todayCommission: "আজকের কমিশন",
      thisMonthCommission: "এই মাসের কমিশন",
      referralLevel: "রেফারেল স্তর",
      total: "মোট",
      redeem: "রিডিম করুন",
      commissionToRedeem: "রিডিমের জন্য কমিশন",
      shareNow: "এখন শেয়ার করুন",
      referralCode: "রেফারেল কোড:",
      id: "আইডি:",
    },
  };
  const t = texts[language] || texts.en;

  // Force consistent styling
  const containerStyle = {
    backgroundColor: siteSettings?.footer?.bgColor || "#001a1a",
    color: siteSettings?.fontSettings?.globalTextColor || "#ffffff",
    minHeight: "60vh",
    padding: "2rem 1rem",
  };

  const buttonStyle = {
    backgroundColor: siteSettings?.header?.loginButtonBg || "#09bda2",
    color: siteSettings?.header?.loginButtonTextColor || "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "opacity 0.3s",
  };

  const orangeButtonStyle = {
    backgroundColor: siteSettings?.header?.signupButtonBg || "#ff6b35",
    color: siteSettings?.header?.signupButtonTextColor || "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "opacity 0.3s",
  };

  return (
    <div style={containerStyle}>
      <div className="flex flex-col lg:flex-row lg:justify-around lg:space-x-3 items-center lg:items-baseline gap-6">
        {/* Commission Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-gray-300 text-sm mb-2">{t.todayCommission}</h3>
            <button
              style={buttonStyle}
              className="w-full max-w-xs text-sm px-10 py-2"
            >
              ৳ 1,250
            </button>
          </div>
          <div>
            <h3 className="text-gray-300 text-sm mb-2">
              {t.thisMonthCommission}
            </h3>
            <button
              style={buttonStyle}
              className="w-full max-w-xs text-sm px-10 py-2"
            >
              ৳ 15,750
            </button>
          </div>
        </div>

        {/* Referral Level Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-gray-300 text-center lg:text-left text-sm mb-2">
              {t.referralLevel}
            </h3>
            <div className="flex flex-row gap-2">
              <button style={buttonStyle} className="text-sm px-10 py-2">
                {t.total}
              </button>
              <button style={buttonStyle} className="text-sm px-10 py-2">
                25
              </button>
            </div>
          </div>

          {/* User Hierarchy */}
          <div className="space-y-3">
            {["user123", "user456", "user789", "user101"].map(
              (username, index) => (
                <div
                  key={username}
                  className="flex flex-col space-y-2 items-center"
                >
                  <div className="flex flex-row relative">
                    <img
                      src={referelpeopleimg}
                      alt=""
                      className="text-center"
                    />
                    {index > 0 && (
                      <img
                        src={referelinfologo}
                        alt=""
                        className="absolute bottom-0 left-28"
                      />
                    )}
                  </div>
                  <h3 style={buttonStyle} className="text-sm px-20 py-2">
                    {username}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              )
            )}
          </div>
        </div>

        {/* Redeem and Share Section */}
        <div className="flex flex-col lg:flex-row">
          {/* Redeem Section */}
          <div
            className="p-8 space-y-4 flex flex-col items-center"
            style={{
              backgroundColor: siteSettings?.header?.loginButtonBg || "#09bda2",
            }}
          >
            <h3 className="text-white text-center">{t.commissionToRedeem}</h3>
            <input
              type="text"
              placeholder="৳"
              className="px-3 py-2 rounded text-black w-full max-w-xs"
            />
            <button
              style={orangeButtonStyle}
              className="w-full max-w-xs text-sm px-10 py-2"
            >
              {t.redeem}
            </button>
          </div>

          {/* Share Section */}
          <div
            className="p-8"
            style={{
              backgroundColor: siteSettings?.webMenu?.bgColor || "#374151",
            }}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <h3
                  style={{
                    color:
                      siteSettings?.fontSettings?.globalTextColor || "#ffffff",
                  }}
                >
                  {t.id}
                </h3>
                <h3
                  style={{
                    color:
                      siteSettings?.fontSettings?.globalTextColor || "#ffffff",
                  }}
                >
                  2134670
                </h3>
                <p
                  style={{
                    color:
                      siteSettings?.fontSettings?.globalTextColor || "#ffffff",
                  }}
                >
                  {t.referralCode}
                </p>
                <p
                  style={{
                    color:
                      siteSettings?.fontSettings?.globalTextColor || "#ffffff",
                  }}
                >
                  GMG3AD3904
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 pt-4">
                <img src={downloadlogo} alt="" />
                <button
                  style={orangeButtonStyle}
                  className="text-sm px-16 py-2 whitespace-nowrap"
                >
                  {t.shareNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission;
