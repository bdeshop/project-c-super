import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { useOutletContext } from "react-router-dom";
import referralBanner from "../assets/referral_banner2.jpg";
import api from "../config/api";
import useReferralStore from "../store/referralStore";

const ReferralCode = () => {
  const { language } = useContext(LanguageContext);
  const { siteSettings } = useOutletContext();
  const [isCopied, setIsCopied] = useState(false);
  const { referralData, loading } = useReferralStore();

  // Fetch referral data if not already loaded
  useEffect(() => {
    const fetchReferralData = async () => {
      if (!referralData && !loading) {
        try {
          // Set loading state
          useReferralStore.getState().setLoading(true);

          // Fetch referral info
          const response = await api.get("/api/referral/info");

          if (response.data.success && response.data.data.referralCode) {
            const data = {
              referralCode: response.data.data.referralCode,
              shareUrl: `${window.location.origin}/signup?ref=${response.data.data.referralCode}`,
            };
            useReferralStore.getState().setReferralData(data);
          } else {
            // If no referral code exists, generate one
            const generateResponse = await api.post(
              "/api/referral/generate-code"
            );
            if (generateResponse.data.success) {
              const data = {
                referralCode: generateResponse.data.data.referralCode,
                shareUrl: generateResponse.data.data.shareUrl,
              };
              useReferralStore.getState().setReferralData(data);
            }
          }
        } catch (error) {
          console.error("Error fetching referral code:", error);
        } finally {
          useReferralStore.getState().setLoading(false);
        }
      }
    };

    fetchReferralData();
  }, [referralData, loading]);

  const copyToClipboard = () => {
    if (referralData && referralData.referralCode) {
      navigator.clipboard.writeText(referralData.referralCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Language-specific texts
  const texts = {
    title: language === "bn" ? "রেফারেল কোড" : "Referral Code",
    description:
      language === "bn"
        ? "আপনার বন্ধুদের সাথে এই কোডটি শেয়ার করুন এবং উভয় পক্ষের জন্য বোনাস উপভোগ করুন!"
        : "Share this code with your friends and enjoy bonuses for both parties!",
    codeLabel: language === "bn" ? "আপনার রেফারেল কোড:" : "Your Referral Code:",
    copyButton: isCopied
      ? language === "bn"
        ? "অনুলিপি হয়েছে!"
        : "Copied!"
      : language === "bn"
      ? "অনুলিপি করুন"
      : "Copy",
    howItWorks: language === "bn" ? "এটি কিভাবে কাজ করে?" : "How it works?",
    steps:
      language === "bn"
        ? [
            "1. আপনার রেফারেল কোড বন্ধুদের সাথে শেয়ার করুন",
            "2. তারা সাইন আপ করার সময় কোডটি ব্যবহার করুন",
            "3. তারা প্রথম জমা করার পর উভয় পক্ষের জন্য বোনাস পান",
          ]
        : [
            "1. Share your referral code with friends",
            "2. They use the code when signing up",
            "3. Both parties receive bonuses after their first deposit",
          ],
    loading: language === "bn" ? "লোড হচ্ছে..." : "Loading...",
  };

  // Apply dark theme fallbacks
  const containerStyle = {
    backgroundColor: siteSettings?.footer?.bgColor || "#001a1a",
    color: siteSettings?.fontSettings?.globalTextColor || "#ffffff",
    minHeight: "100vh",
  };

  const cardStyle = {
    backgroundColor: siteSettings?.header?.bgColor || "#003333",
    border: `1px solid ${siteSettings?.header?.borderColor || "#09bda2"}`,
  };

  const buttonStyle = {
    backgroundColor: siteSettings?.header?.loginButtonBg || "#09bda2",
    color: siteSettings?.header?.loginButtonTextColor || "#ffffff",
  };

  return (
    <div style={containerStyle} className="min-h-screen pb-10">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{texts.title}</h1>
          <p className="text-gray-300">{texts.description}</p>
        </div>

        <div className="mb-8">
          <img
            src={referralBanner}
            alt="Referral Banner"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div style={cardStyle} className="rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{texts.codeLabel}</h2>
          {loading ? (
            <div className="text-center py-4">
              <p>{texts.loading}</p>
            </div>
          ) : referralData && referralData.referralCode ? (
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 bg-gray-800 p-4 rounded text-center font-mono text-xl">
                {referralData.referralCode}
              </div>
              <button
                onClick={copyToClipboard}
                style={buttonStyle}
                className="px-6 py-3 rounded font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                {texts.copyButton}
              </button>
            </div>
          ) : (
            <div className="text-center py-4 text-red-400">
              {language === "bn"
                ? "রেফারেল কোড লোড করতে ব্যর্থ"
                : "Failed to load referral code"}
            </div>
          )}
        </div>

        {/* Nibondon Referral Link Section */}
        {referralData && referralData.referralCode && (
          <div
            style={cardStyle}
            className="rounded-lg p-6 mb-8 border-2 border-purple-500"
          >
            <h2 className="text-xl font-semibold mb-4 text-purple-300">
              🔗{" "}
              {language === "bn"
                ? "নিবন্ধন রেফারেল লিংক"
                : "Registration Referral Link"}
            </h2>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-300 mb-3">
                {language === "bn"
                  ? "নিবন্ধন পেজ লিংক:"
                  : "Registration Page Link:"}
              </p>
              <div className="bg-gray-900 p-3 rounded mb-4">
                <p className="text-sm text-yellow-300 break-all font-mono">
                  {`${window.location.origin}/nibondon?referral=${referralData.referralCode}`}
                </p>
              </div>
              <button
                onClick={() => {
                  const link = `${window.location.origin}/nibondon?referral=${referralData.referralCode}`;
                  navigator.clipboard.writeText(link);
                  alert(
                    language === "bn" ? "লিংক কপি হয়েছে!" : "Link copied!"
                  );
                }}
                className="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded-lg text-sm transition-colors font-bold"
              >
                📋 {language === "bn" ? "লিংক কপি করুন" : "Copy Link"}
              </button>
            </div>
          </div>
        )}

        <div style={cardStyle} className="rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{texts.howItWorks}</h2>
          <ol className="space-y-3">
            {texts.steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 text-green-400">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ReferralCode;
