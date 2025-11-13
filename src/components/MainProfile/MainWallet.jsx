import { useEffect, useState } from "react";
import axios from "axios";

const MainWallet = ({
  reloadBalance,
  loading,
  language,
  toggleBalanceVisibility,
  showBalance,
  balance,
}) => {
  const [referralSettings, setReferralSettings] = useState(null);
  const [apiBalance, setApiBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Fetch balance from API
  const fetchBalance = async () => {
    setBalanceLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.log("⚠️ No auth token found");
        return;
      }

      const response = await axios.get(
        "http://localhost:8000/api/users/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("✅ Balance fetched:", response.data.data);
        setApiBalance(response.data.data);
      }
    } catch (error) {
      console.error("❌ Error fetching balance:", error);
    } finally {
      setBalanceLoading(false);
    }
  };

  // Fetch balance on mount and when reloadBalance is called
  useEffect(() => {
    fetchBalance();
  }, []);

  // Override reloadBalance to fetch from API
  const handleReload = () => {
    fetchBalance();
    if (reloadBalance) reloadBalance();
  };

  // Load referral settings from localStorage
  useEffect(() => {
    const loadReferralSettings = () => {
      const settings = localStorage.getItem("referralSettings");
      console.log("🔍 Raw referralSettings from localStorage:", settings);

      if (settings) {
        try {
          const parsedSettings = JSON.parse(settings);
          console.log("✅ Parsed referralSettings:", parsedSettings);
          setReferralSettings(parsedSettings);
        } catch (error) {
          console.error("❌ Error parsing referral settings:", error);
        }
      } else {
        console.log("⚠️ No referralSettings found in localStorage");
      }
    };

    // Load on mount
    loadReferralSettings();

    // Listen for auth state changes (when user logs in)
    const handleAuthChange = () => {
      console.log("🔄 Auth state changed, reloading referral settings...");
      loadReferralSettings();
    };

    window.addEventListener("authStateChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
    };
  }, []);
  return (
    <div className=" lg:px-0 relative">
      <div className="bg-bg-jaya9-logo-color text-textPrimary px-3 mt-2 py-2 flex justify-between flex-row">
        <div className="flex flex-row items-center">
          {/* ভাষা অনুযায়ী টেক্সট */}
          <div className="flex flex-col">
            <h3 className="text-common-orange">
              {language === "bn" ? "প্রধান ওয়ালেট" : "Main Wallet"}
            </h3>
            {/* Referral Settings Display */}
            {referralSettings && (
              <div className="text-xs text-gray-300 mt-2 space-y-1">
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-green-400">💰</span>
                    <span>
                      {language === "bn" ? "কমিশন:" : "Commission:"}{" "}
                      <span className="text-green-400 font-semibold">
                        {referralSettings.referralCommission}%
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-400">🎁</span>
                    <span>
                      {language === "bn" ? "বোনাস:" : "Bonus:"}{" "}
                      <span className="text-blue-400 font-semibold">
                        {referralSettings.referralDepositBonus}%
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">💳</span>
                  <span>
                    {language === "bn" ? "সর্বনিম্ন উত্তোলন:" : "Min Withdraw:"}{" "}
                    <span className="text-yellow-400 font-semibold">
                      ৳{referralSettings.minWithdrawAmount}
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleReload} className="ml-2 pt-1">
            {loading || balanceLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1 2.13-9" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1 2.13-9" />
              </svg>
            )}
          </button>

          <button onClick={toggleBalanceVisibility} className="ml-2">
            {showBalance ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a17.33 17.33 0 0 1 2.31-3.81" />
                <path d="M9.53 9.53A3 3 0 0 1 12 9c1.66 0 3 1.34 3 3a3 3 0 0 1-.53 1.71" />
                <path d="M1 1l22 22" />
              </svg>
            )}
          </button>
        </div>

        <div className=" flex flex-row items-center">
          <span className="pb-2 pr-1 text-2xl ">৳</span>
          <span className="">
            {loading || balanceLoading
              ? "..."
              : showBalance
              ? (apiBalance?.balance || balance || 0).toFixed(2)
              : "****"}
          </span>
        </div>

        {/* Show total deposit and withdraw when balance is visible */}
        {showBalance && apiBalance && (
          <div className="absolute right-3 top-full mt-1 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10">
            <div className="space-y-1">
              <p>
                <span className="text-green-400">
                  ↑ {language === "bn" ? "মোট জমা:" : "Total Deposit:"}
                </span>{" "}
                ৳{apiBalance.totalDeposit?.toFixed(2) || "0.00"}
              </p>
              <p>
                <span className="text-red-400">
                  ↓ {language === "bn" ? "মোট উত্তোলন:" : "Total Withdraw:"}
                </span>{" "}
                ৳{apiBalance.totalWithdraw?.toFixed(2) || "0.00"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainWallet;
