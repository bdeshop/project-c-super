import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import bkashlogo from "../assets/bkashlogo.svg";
import nagadlogo from "../assets/nagadlogo.svg";
import rocketlogo from "../assets/rocketlogo.svg";
import upailogo from "../assets/upaylogo.svg";
import bajilogo from "../assets/bajipay.jpeg";
import likeicon from "../assets/icon-recommond (1).svg";
import fastlogo from "../assets/fastpay.png";
import DepositTabs from "../components/Deposit/DepositTabs";
import TabDeposit from "../components/Deposit/TabDeposit";
import TabWithdraw from "../components/Deposit/TabWithdraw";
import DepositModal from "../components/Deposit/DepositModal";
import { LanguageContext } from "../Context/LanguageContext";
import api from "../config/api";

const Deposit = () => {
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedMethod, setSelectedMethod] = useState("bKash");

  // Get promotion data from navigation state
  useEffect(() => {
    if (location.state?.promotion) {
      console.log("🎉 Promotion data received in Deposit page:");
      console.log("📦 Full Promotion Object:", location.state.promotion);
      console.log("📝 Title:", location.state.promotion.title);
      console.log("📄 Description:", location.state.promotion.description);
      console.log("🎁 Bonus Settings:", location.state.promotion.bonusSettings);
      console.log("🎮 Game Type:", location.state.promotion.gameType);
      console.log(
        "💳 Payment Methods:",
        location.state.promotion.paymentMethods
      );
      console.log("🆔 Promotion ID:", location.state.promotion.id);

      // Set promotion bonus
      if (location.state.promotion.bonusSettings) {
        setPromotionBonus(location.state.promotion.bonusSettings);
        console.log(
          "✅ Promotion bonus set:",
          location.state.promotion.bonusSettings
        );
      }
    } else {
      console.log("ℹ️ No promotion data passed to Deposit page");
    }
  }, [location]);

  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState({
    name: "Bajipay",
    amounts: [500, 1000, 2000],
  });
  const [selectedAmount, setSelectedAmount] = useState(""); // Let user select amount
  const [selectedBonus, setSelectedBonus] = useState("");
  const [apiPaymentMethods, setApiPaymentMethods] = useState([]);
  const [promotionBonus, setPromotionBonus] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Fetch user balance
  useEffect(() => {
    const fetchBalance = async () => {
      setBalanceLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.log("⚠️ No auth token found");
          return;
        }

        const response = await api.get("/api/users/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          console.log("✅ User balance fetched:", response.data.data);
          setUserBalance(response.data.data);
        }
      } catch (error) {
        console.error("❌ Error fetching balance:", error);
      } finally {
        setBalanceLoading(false);
      }
    };

    fetchBalance();
  }, []);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);

  const paymentMethods = [
    {
      name: "bKash",
      logo: bkashlogo,
      percentage: "+ 3.0 %",
      absolutelogo: likeicon,
    },
    {
      name: "NAGAD",
      logo: nagadlogo,
      percentage: "+ 3.0 %",
      absolutelogo: likeicon,
    },
    {
      name: "Rocket",
      logo: rocketlogo,
      percentage: "+ 3.0 %",
      absolutelogo: likeicon,
    },
    {
      name: "Upai",
      logo: upailogo,
      percentage: "+ 3.0 %",
      absolutelogo: likeicon,
    },
  ];

  const channelsData = {
    bKash: [
      {
        name: "Bajipay",
        logo: bajilogo,
        amounts: [200, 500, 1000, 2000, 10000, 20000],
      },
      { name: "Speedpay", amounts: [200, 500, 1000, 2000, 10000, 20000] },
    ],
    NAGAD: [
      {
        name: "Bajipay",
        logo: bajilogo,
        amounts: [200, 500, 1000, 2000, 10000, 20000],
      },
      {
        name: "Paybangla",
        logo: bajilogo,
        amounts: [500, 1000, 2000, 10000, 20000],
      },

      { name: "Speedpay", amounts: [200, 500, 1000, 2000, 10000, 20000] },
    ],
    Rocket: [
      { name: "Bajipay", amounts: [200, 500, 1000, 2000, 10000, 20000] },
    ],
    Upai: [
      {
        name: "",
        logo: fastlogo,
        amounts: [200, 500, 1000, 2000, 10000, 20000],
      },
    ],
  };

  const [balance, setBalance] = useState(Math.floor(Math.random() * 1000)); // Initial Balance
  const [loading, setLoading] = useState(false);

  const reloadBalance = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setBalance(Math.floor(Math.random() * 1000)); // Generate new random balance
      setLoading(false); // Stop loading
    }, 1500); // Simulate a delay (1.5s)
  };

  // Fetch payment methods data
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setPaymentMethodsLoading(true);
      try {
        const response = await api.get("/api/payment-methods");
        if (response.data.success) {
          setApiPaymentMethods(response.data.data);
          console.log("✅ Payment methods loaded:", response.data.data);
        }
      } catch (error) {
        console.error("❌ Error fetching payment methods:", error);
      } finally {
        setPaymentMethodsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Set the default selected channel and amount when selectedMethod changes (only for static payment methods)
  useEffect(() => {
    // Only run this for static payment methods that have channels
    if (channelsData[selectedMethod]) {
      const defaultChannel = channelsData[selectedMethod]?.[0] || {};
      setSelectedChannel(defaultChannel);
      setSelectedAmount(
        defaultChannel.amounts ? defaultChannel.amounts[0] : ""
      );
    }
    // For API payment methods, don't reset the amount - let user select it
  }, [channelsData, selectedMethod]);

  return (
    <div className="bg-black min-h-screen">
      <DepositTabs
        language={language}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Balance Display */}
      <div className="max-w-3xl mx-auto px-4 lg:px-0 py-3">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white text-sm opacity-90">
                {language === "bn" ? "উপলব্ধ ব্যালেন্স" : "Available Balance"}
              </p>
              <h2 className="text-white text-3xl font-bold mt-1">
                {balanceLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  `৳${userBalance?.balance?.toFixed(2) || "0.00"}`
                )}
              </h2>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm">
                <p className="text-white text-xs opacity-90">
                  {language === "bn" ? "মোট জমা" : "Total Deposit"}
                </p>
                <p className="text-white font-semibold">
                  ৳{userBalance?.totalDeposit?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm mt-2">
                <p className="text-white text-xs opacity-90">
                  {language === "bn" ? "মোট উত্তোলন" : "Total Withdraw"}
                </p>
                <p className="text-white font-semibold">
                  ৳{userBalance?.totalWithdraw?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto  ">
        <TabDeposit
          language={language}
          activeTab={activeTab}
          paymentMethods={paymentMethods}
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          selectedBonus={selectedBonus}
          setSelectedBonus={setSelectedBonus}
          channelsData={channelsData}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          apiPaymentMethods={apiPaymentMethods}
          paymentMethodsLoading={paymentMethodsLoading}
          promotionBonus={promotionBonus}
        />

        {modalOpen && (
          <DepositModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}

        <TabWithdraw
          activeTab={activeTab}
          language={language}
          paymentMethods={paymentMethods}
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          selectedChannel={setSelectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          setSelectedBonus={setSelectedBonus}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          reloadBalance={reloadBalance}
          loading={loading}
          balance={balance}
        />
      </div>
    </div>
  );
};

export default Deposit;
