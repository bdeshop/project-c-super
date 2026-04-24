import { Link } from "react-router-dom";
import { useState } from "react";
import warninglogo from "../../assets/warning.svg";
import explannationImage from "../../assets/white-exclamation-mark.png";
import DepositPaymentModal from "./DepositPaymentModal";

const TabDeposit = ({
  activeTab,
  language,
  paymentMethods,
  selectedMethod,
  setSelectedMethod,
  setSelectedChannel,
  setSelectedAmount,
  setSelectedBonus,
  channelsData,
  selectedChannel,
  selectedAmount,
  selectedBonus,
  modalOpen,
  setModalOpen,
  apiPaymentMethods,
  paymentMethodsLoading,
  promotionBonus,
  activeBonuses,
  bonusesLoading,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Calculate total amount with bonus only when promotion bonus is selected
  const calculateTotalAmount = () => {
    // 1. Check if a DepositBonus is selected (from the new model)
    if (selectedBonus && selectedBonus !== "promotion") {
      const bonus = activeBonuses?.find((b) => b.bonusCode === selectedBonus);
      if (bonus) {
        const amount = parseFloat(selectedAmount) || 0;
        const bonusAmount = (amount * bonus.percentageValue) / 100;
        return amount + bonusAmount;
      }
    }

    // 2. Check if a Promotion bonus is selected (existing logic)
    if (selectedBonus === "promotion" && promotionBonus) {
      const amount = parseFloat(selectedAmount) || 0;
      const bonusValue = promotionBonus.bonus_value || 0;

      if (promotionBonus.bonus_type === "fixed") {
        return amount + bonusValue;
      } else if (promotionBonus.bonus_type === "percentage") {
        const bonusAmount = (amount * bonusValue) / 100;
        const maxLimit = promotionBonus.max_bonus_limit || Infinity;
        const actualBonus = Math.min(bonusAmount, maxLimit);
        return amount + actualBonus;
      }
    }

    return parseFloat(selectedAmount) || 0;
  };

  const totalAmount = calculateTotalAmount();

  // Create promotion bonus option label
  const getPromotionBonusLabel = () => {
    if (!promotionBonus) return "";

    if (promotionBonus.bonus_type === "fixed") {
      return `${language === "bn" ? "প্রমোশন বোনাস" : "Promotion Bonus"} - ৳${
        promotionBonus.bonus_value
      }`;
    } else {
      return `${language === "bn" ? "প্রমোশন বোনাস" : "Promotion Bonus"} - ${
        promotionBonus.bonus_value
      }%`;
    }
  };

  // Safety checks to prevent crashes
  const safeApiPaymentMethods = apiPaymentMethods || [];
  const safePaymentMethods = paymentMethods || [];
  const safeChannelsData = channelsData || {};

  try {
    return (
      <div className="text-textPrimary">
        {activeTab === "deposit" && (
          <div className="p-4 rounded-b-md  ">
            <div className="flex flex-row items-center gap-4 mb-2 bg-bg-jaya9-logo-color p-3">
              <img src={warninglogo} alt="" className="w-8 h-auto" />
              <h3>
                {language === "en"
                  ? "Phone number is not verified. Please proceed with the verification process before making a deposit"
                  : "আপনার মোবাইল নম্বরটি ভেরিফাই করা হয়নি। ডিপোজিট করার আগে ভেরিফাই পদ্ধতি অনুসরণ করে নম্বরটি ভেরিফাই করেন।"}
              </h3>
              <Link to="/jachaikoron">
                <p className="text-common-orange underline  text-sm">
                  {language === "bn" ? "যাচাই করুন" : "Verify"}
                </p>
              </Link>
            </div>
            <div className="bg-bg-jaya9-logo-color p-3 relative">
              <h3 className="text-lg font-semibold mb-3 py-2 border-b border-black">
                {language === "bn" ? "মূল্য পরিশোধ পদ্ধতি" : "Payment Method"}
              </h3>
              {paymentMethodsLoading ? (
                <div className="text-center py-4">
                  <p>{language === "bn" ? "লোড হচ্ছে..." : "Loading..."}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
                  {/* Show API Payment Methods */}
                  {safeApiPaymentMethods.map((method) => (
                    <div
                      key={method._id}
                      className={`relative shadow-md p-1 rounded-lg cursor-pointer transition-all ${
                        selectedMethod ===
                        (language === "bn"
                          ? method.method_name_bd
                          : method.method_name_en)
                          ? "bg-common-blue text-black"
                          : "bg-gray-200 "
                      }`}
                      style={{
                        backgroundColor:
                          selectedMethod ===
                          (language === "bn"
                            ? method.method_name_bd
                            : method.method_name_en)
                            ? method.button_color || "#007bff"
                            : method.background_color || "#f5f5f5",
                        color:
                          selectedMethod ===
                          (language === "bn"
                            ? method.method_name_bd
                            : method.method_name_en)
                            ? "#ffffff"
                            : method.text_color || "#000000",
                      }}
                      onClick={() => {
                        setSelectedMethod(
                          language === "bn"
                            ? method.method_name_bd
                            : method.method_name_en
                        );
                        setSelectedChannel(null);
                        setSelectedAmount(""); // Reset the amount on method change
                        setSelectedBonus(""); // Reset bonus when changing method
                      }}
                    >
                      {method.method_image && (
                        <img
                          src={method.method_image}
                          alt={
                            language === "bn"
                              ? method.method_name_bd
                              : method.method_name_en
                          }
                          className={`h-6 mx-auto mb-2 hover:opacity-70 ${
                            selectedMethod ===
                            (language === "bn"
                              ? method.method_name_bd
                              : method.method_name_en)
                              ? "brightness-0 invert"
                              : ""
                          }`}
                        />
                      )}
                      <h4 className="text-center text-md font-semibold">
                        {language === "bn"
                          ? method.method_name_bd
                          : method.method_name_en}
                      </h4>
                    </div>
                  ))}

                  {/* Show Static Payment Methods as fallback */}
                  {safeApiPaymentMethods.length === 0 &&
                    safePaymentMethods.map((method) => (
                      <div
                        key={method.name}
                        className={`relative shadow-md p-1 rounded-lg cursor-pointer transition-all ${
                          selectedMethod === method.name
                            ? "bg-common-blue text-black"
                            : "bg-gray-200 "
                        }`}
                        onClick={() => {
                          setSelectedMethod(method.name);
                          setSelectedChannel(null);
                          setSelectedAmount(""); // Reset the amount on method change
                          setSelectedBonus(""); // Reset bonus when changing method
                        }}
                      >
                        {/* Absolute Positioned Text */}
                        <span className="absolute -top-2 -right-2 bg-common-orange text-black text-xs px-1  rounded-md">
                          {method.percentage}
                        </span>

                        <img
                          src={method.logo}
                          alt={method.name}
                          className={`h-6 mx-auto mb-2 hover:opacity-70 ${
                            selectedMethod === method.name
                              ? "brightness-0 invert"
                              : ""
                          }`}
                        />
                        <h4 className="text-center text-md font-semibold">
                          {method.name}
                        </h4>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Promotions Section */}

            {/* Show channels only for static payment methods */}
            {selectedMethod && safeChannelsData[selectedMethod] && (
              <>
                <div className="bg-bg-jaya9-logo-color p-3 mt-2">
                  <h3 className="text-lg font-semibold mb-3 py-2 border-b border-black">
                    {language === "bn" ? "আমানত চ্যানেল" : "Deposit Channel"}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4 items-center bg-bg-jaya9-logo-color">
                    {safeChannelsData[selectedMethod]?.map((channel, index) => (
                      <div
                        key={index}
                        className={`shadow-md p-2 rounded-lg cursor-pointer transition-all ${
                          selectedChannel?.name === channel.name
                            ? "bg-common-blue text-black"
                            : "bg-gray-200 "
                        }`}
                        onClick={() => {
                          setSelectedChannel(channel);
                          if (channel.amounts && channel.amounts.length > 0) {
                            setSelectedAmount(channel.amounts[0]); // Default first amount
                          }
                        }}
                      >
                        <div className="flex flex-row items-center justify-center">
                          {channel.logo && (
                            <img
                              src={channel.logo}
                              alt={channel.name}
                              className="h-6 mx-auto"
                            />
                          )}
                          <h4 className="text-center text-md font-semibold">
                            {channel.name}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* For API Payment Methods - Show amount selection directly */}
            {selectedMethod &&
              safeApiPaymentMethods.some(
                (method) =>
                  (language === "bn"
                    ? method.method_name_bd
                    : method.method_name_en) === selectedMethod
              ) && (
                <div className="bg-bg-jaya9-logo-color p-3 mt-2">
                  <h3 className="text-lg font-semibold mb-3 py-2 border-b border-black">
                    {language === "bn" ? "পরিমাণ" : "Amount"}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
                    {[200, 500, 1000, 2000, 5000, 10000].map((amount) => (
                      <div
                        key={amount}
                        className={`shadow-md p-2 rounded-lg cursor-pointer transition-all ${
                          selectedAmount === amount
                            ? "bg-common-blue text-black"
                            : "bg-gray-200 "
                        }`}
                        onClick={() => {
                          setSelectedAmount(amount);
                        }}
                      >
                        <h4 className="text-center text-sm font-semibold">
                          ৳ {amount}
                        </h4>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4 p-3 border-b border-black bg-bg-jaya9-logo-color flex flex-row items-center ">
                    <label className=" text-2xl mb-2 h-auto text-green-700 font-medium">
                      {" "}
                      ৳
                    </label>
                    <input
                      type="number"
                      value={selectedAmount || ""}
                      onChange={(e) => setSelectedAmount(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>

                  {/* Bonus Select Field */}
                  <div className="mb-4 p-3 bg-bg-jaya9-logo-color mt-2">
                    <label className="block text-lg font-semibold mb-3 py-2 border-b border-black">
                      {language === "bn" ? "আমানত বোনাস" : "Deposit Bonus"}
                    </label>
                    <select
                      value={selectedBonus}
                      onChange={(e) => setSelectedBonus(e.target.value)}
                      className="w-full lg:w-auto h-full px-3 py-1 border-2 border-black text-xs  truncate  md:text-base font-semibold"
                    >
                      <option className="text-sm md:text-base" value="">
                        No Bonus
                      </option>
                      {activeBonuses?.map((bonus) => (
                        <option
                          key={bonus._id}
                          className="text-sm md:text-base"
                          value={bonus.bonusCode}
                        >
                          {bonus.welcomeBonusName} ({bonus.percentageValue}% -{" "}
                          {bonus.wageringRequirement}x)
                        </option>
                      ))}
                      {promotionBonus && (
                        <option
                          className="text-sm md:text-base"
                          value="promotion"
                        >
                          {getPromotionBonusLabel()}
                        </option>
                      )}
                    </select>
                    {selectedBonus && selectedAmount && (
                      <div className="mt-3 p-3 bg-green-900 bg-opacity-30 border border-green-500 rounded">
                        <p className="text-green-300 font-bold">
                          {language === "bn"
                            ? "মোট পরিমাণ: "
                            : "Total Amount: "}
                          ৳{totalAmount.toFixed(2)}
                        </p>
                        {selectedBonus !== "promotion" && (
                          <p className="text-xs text-gray-300 mt-1">
                            {language === "bn"
                              ? `বোনাস: ৳${(totalAmount - parseFloat(selectedAmount)).toFixed(2)}`
                              : `Bonus: ৳${(totalAmount - parseFloat(selectedAmount)).toFixed(2)}`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Show amount and bonus for static payment methods (when channel is selected) */}
            {selectedChannel &&
              selectedChannel.amounts &&
              Array.isArray(selectedChannel.amounts) &&
              !safeApiPaymentMethods.some(
                (method) =>
                  (language === "bn"
                    ? method.method_name_bd
                    : method.method_name_en) === selectedMethod
              ) && (
                <>
                  <div className="bg-bg-jaya9-logo-color p-3 mt-2">
                    <h3 className="text-lg font-semibold mb-3 py-2 border-b border-black">
                      {language === "bn" ? "পরিমাণ" : "Amount"}
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
                      {selectedChannel.amounts.map((amount) => (
                        <div
                          key={amount}
                          className={`shadow-md p-2 rounded-lg cursor-pointer transition-all ${
                            selectedAmount === amount
                              ? "bg-common-blue text-black"
                              : "bg-gray-200 "
                          }`}
                          onClick={() => {
                            setSelectedAmount(amount);
                          }}
                        >
                          <h4 className="text-center text-sm font-semibold">
                            ৳ {amount}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 p-3 border-b border-black bg-bg-jaya9-logo-color flex flex-row items-center ">
                    <label className=" text-2xl mb-2 h-auto text-green-700 font-medium">
                      {" "}
                      ৳
                    </label>
                    <input
                      type="number"
                      value={selectedAmount || ""}
                      onChange={(e) => setSelectedAmount(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>

                  {/* Bonus Select Field */}
                  <div className="mb-4 p-3 bg-bg-jaya9-logo-color mt-2">
                    <label className="block text-lg font-semibold mb-3 py-2 border-b border-black">
                      {language === "bn" ? "আমানত বোনাস" : "Deposit Bonus"}
                    </label>
                    <select
                      value={selectedBonus}
                      onChange={(e) => setSelectedBonus(e.target.value)}
                      className="w-full lg:w-auto h-full px-3 py-1 border-2 border-black text-xs  truncate  md:text-base font-semibold"
                    >
                      <option className="text-sm md:text-base" value="">
                        No Bonus
                      </option>
                      {activeBonuses?.map((bonus) => (
                        <option
                          key={bonus._id}
                          className="text-sm md:text-base"
                          value={bonus.bonusCode}
                        >
                          {bonus.welcomeBonusName} ({bonus.percentageValue}% -{" "}
                          {bonus.wageringRequirement}x)
                        </option>
                      ))}
                      {promotionBonus && (
                        <option
                          className="text-sm md:text-base"
                          value="promotion"
                        >
                          {getPromotionBonusLabel()}
                        </option>
                      )}
                    </select>
                    {selectedBonus && selectedAmount && (
                      <div className="mt-3 p-3 bg-green-900 bg-opacity-30 border border-green-500 rounded">
                        <p className="text-green-300 font-bold">
                          {language === "bn"
                            ? "মোট পরিমাণ: "
                            : "Total Amount: "}
                          ৳{totalAmount.toFixed(2)}
                        </p>
                        {selectedBonus !== "promotion" && (
                          <p className="text-xs text-gray-300 mt-1">
                            {language === "bn"
                              ? `বোনাস: ৳${(totalAmount - parseFloat(selectedAmount)).toFixed(2)}`
                              : `Bonus: ৳${(totalAmount - parseFloat(selectedAmount)).toFixed(2)}`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

            <button
              className="w-full bg-common-blue text-black py-2 rounded-md"
              disabled={!selectedMethod || !selectedAmount}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              {language === "bn" ? "আমানত " : "Deposit "}
            </button>

            {/* Payment Modal */}
            <DepositPaymentModal
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              selectedMethod={selectedMethod}
              selectedChannel={selectedChannel}
              selectedAmount={selectedAmount}
              selectedBonus={selectedBonus}
              language={language}
              apiPaymentMethods={safeApiPaymentMethods}
              totalAmount={totalAmount}
              promotionBonus={promotionBonus}
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("TabDeposit Error:", error);
    return (
      <div className="text-textPrimary p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> Something went wrong loading the deposit form.
          <br />
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

export default TabDeposit;
