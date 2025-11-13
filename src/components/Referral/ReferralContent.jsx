import { useContext, useEffect } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import { useOutletContext } from "react-router-dom";
import useReferralStore from "../../store/referralStore"; // Import the referral store

const ReferralContent = () => {
  const { language } = useContext(LanguageContext);
  const { siteSettings } = useOutletContext();
  const { referralData, loading } = useReferralStore(); // Use store instead of context

  // Check if referral data is available from login
  useEffect(() => {
    console.log("🔍 Checking referral data from store:", {
      referralData,
      loading,
    });

    if (!referralData) {
      console.log("⚠️ No referral data found. User needs to login first.");
    } else {
      console.log("✅ Referral data available:", referralData);
    }
  }, [referralData, loading]);

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
          {/* Referral Code Display Section */}
          <div className="p-5">
            {loading ? (
              <div className="text-center py-4">
                <p>{language === "bn" ? "লোড হচ্ছে..." : "Loading..."}</p>
              </div>
            ) : referralData && referralData.referralCode ? (
              <>
                <div className="bg-gray-800 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "bn"
                      ? "আপনার রেফারেল কোড444"
                      : "Your Referral Code"}
                  </h3>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg font-mono text-green-400 mb-2">
                      {referralData.referralCode}
                    </p>
                    <p className="text-sm text-gray-300 mb-3">
                      {language === "bn" ? "শেয়ার লিংক:" : "Share Link:"}
                    </p>
                    <p className="text-sm text-blue-400 break-all">
                      {referralData.shareUrl}
                    </p>
                  </div>
                </div>

                {/* Nibondon Referral Link Section - UPDATED */}
                <div className="bg-purple-800 rounded-lg p-6 mb-6 border-2 border-purple-500">
                  <h3 className="text-xl font-bold mb-4 text-purple-200">
                    🔗{" "}
                    {language === "bn"
                      ? "নিবন্ধন রেফারেল লিংক"
                      : "Registration Referral Link"}
                  </h3>
                  <div className="bg-purple-700 p-4 rounded-lg">
                    <p className="text-sm text-purple-200 mb-3">
                      {language === "bn"
                        ? "নিবন্ধন পেজ লিংক:"
                        : "Registration Page Link:"}
                    </p>
                    <div className="bg-purple-900 p-3 rounded mb-4">
                      <p className="text-sm text-yellow-300 break-all font-mono">
                        {`${window.location.origin}/nibondon?referral=${referralData.referralCode}`}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const link = `${window.location.origin}/nibondon?referral=${referralData.referralCode}`;
                        navigator.clipboard.writeText(link);
                        alert(
                          language === "bn"
                            ? "লিংক কপি হয়েছে!"
                            : "Link copied!"
                        );
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded-lg text-sm transition-colors font-bold"
                    >
                      📋 {language === "bn" ? "লিংক কপি করুন" : "Copy Link"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-red-800 rounded-lg p-6 mb-6">
                <p className="text-red-200">
                  {language === "bn"
                    ? "রেফারেল কোড লোড করতে সমস্যা হয়েছে"
                    : "Failed to load referral code"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralContent;
