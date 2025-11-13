import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import warninglogo from "../../assets/warning.svg";
import explannationImage from "../../assets/white-exclamation-mark.png";

const TabWithdraw = ({
  activeTab,
  language,
  paymentMethods,
  selectedMethod,
  setSelectedMethod,
  setSelectedAmount,
  setSelectedBonus,
  selectedAmount,
}) => {
  const [withdrawalMethods, setWithdrawalMethods] = useState([]);
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Fetch withdrawal methods from API
  useEffect(() => {
    const fetchWithdrawalMethods = async () => {
      setWithdrawalLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/withdrawal-methods"
        );

        if (response.data.success) {
          console.log("✅ Withdrawal methods fetched:", response.data.data);
          setWithdrawalMethods(response.data.data);
        }
      } catch (error) {
        console.error("❌ Error fetching withdrawal methods:", error);
      } finally {
        setWithdrawalLoading(false);
      }
    };

    if (activeTab === "withdraw") {
      fetchWithdrawalMethods();
      fetchUserBalance();
    }
  }, [activeTab]);

  // Fetch user balance
  const fetchUserBalance = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(
        "http://localhost:8000/api/users/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserBalance(response.data.data);
        console.log("✅ User balance:", response.data.data.balance);
      }
    } catch (error) {
      console.error("❌ Error fetching balance:", error);
    }
  };

  // Handle withdrawal request
  const handleWithdrawRequest = async () => {
    // Validation checks
    if (!selectedChannel) {
      alert(
        language === "bn"
          ? "উত্তোলন পদ্ধতি নির্বাচন করুন"
          : "Please select withdrawal method"
      );
      return;
    }

    if (!selectedAmount || parseFloat(selectedAmount) <= 0) {
      alert(language === "bn" ? "পরিমাণ লিখুন" : "Please enter amount");
      return;
    }

    if (!phoneNumber) {
      alert(
        language === "bn" ? "মোবাইল নম্বর লিখুন" : "Please enter phone number"
      );
      return;
    }

    const amount = parseFloat(selectedAmount);

    // Check min/max limits
    if (amount < selectedChannel.min_withdrawal) {
      alert(
        language === "bn"
          ? `সর্বনিম্ন উত্তোলন ৳${selectedChannel.min_withdrawal}`
          : `Minimum withdrawal is ৳${selectedChannel.min_withdrawal}`
      );
      return;
    }

    if (amount > selectedChannel.max_withdrawal) {
      alert(
        language === "bn"
          ? `সর্বোচ্চ উত্তোলন ৳${selectedChannel.max_withdrawal}`
          : `Maximum withdrawal is ৳${selectedChannel.max_withdrawal}`
      );
      return;
    }

    // Calculate total amount with fee
    const withdrawalFee =
      selectedChannel.fee_type === "fixed"
        ? selectedChannel.withdrawal_fee
        : (amount * selectedChannel.withdrawal_fee) / 100;

    const totalAmount = amount + withdrawalFee;

    // Check sufficient balance
    if (userBalance && totalAmount > userBalance.balance) {
      alert(
        language === "bn"
          ? `অপর্যাপ্ত ব্যালেন্স। আপনার ব্যালেন্স: ৳${userBalance.balance.toFixed(
              2
            )}, প্রয়োজন: ৳${totalAmount.toFixed(2)} (ফি সহ)`
          : `Insufficient balance. Your balance: ৳${userBalance.balance.toFixed(
              2
            )}, Required: ৳${totalAmount.toFixed(2)} (including fee)`
      );
      return;
    }

    // Check if method is active

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert(language === "bn" ? "লগইন করুন" : "Please login");
        return;
      }

      const requestData = {
        withdrawal_method_id: selectedChannel._id,
        amount: amount,
        phone_number: phoneNumber,
      };

      console.log("📤 Submitting withdrawal request:", requestData);
      console.log("📤 Selected Channel:", selectedChannel);

      const response = await axios.post(
        "http://localhost:8000/api/withdrawal-requests",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Withdrawal request submitted:", response.data);

      if (response.data.success) {
        alert(
          language === "bn"
            ? `উত্তোলন অনুরোধ সফলভাবে জমা দেওয়া হয়েছে!\nপরিমাণ: ৳${amount}\nফি: ৳${withdrawalFee.toFixed(
                2
              )}\nমোট: ৳${totalAmount.toFixed(2)}`
            : `Withdrawal request submitted successfully!\nAmount: ৳${amount}\nFee: ৳${withdrawalFee.toFixed(
                2
              )}\nTotal: ৳${totalAmount.toFixed(2)}`
        );

        // Reset form
        setSelectedMethod("");
        setSelectedChannel(null);
        setSelectedAmount("");
        setPhoneNumber("");

        // Refresh balance
        fetchUserBalance();
      }
    } catch (error) {
      console.error("❌ Error submitting withdrawal:", error);

      const errorMessage = error.response?.data?.message || error.message;
      alert(
        language === "bn" ? `ত্রুটি: ${errorMessage}` : `Error: ${errorMessage}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-textPrimary ">
      {activeTab === "withdraw" && (
        <div className="px-4 rounded-b-md">
          <div className="text-white py-2 cursor-pointer  flex items-center justify-center">
            <img src={explannationImage} alt="" className="w-6 h-6" />
            <h3 className="underline ">
              {language === "en" ? "HOW To Deposit?" : "কিভাবে জমা করবেন"}
            </h3>
          </div>

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
              {language === "bn" ? "মূল্য উত্তোলন পদ্ধতি" : "Withdrawal Method"}
            </h3>

            {withdrawalLoading ? (
              <div className="text-center py-4">
                <p>{language === "bn" ? "লোড হচ্ছে..." : "Loading..."}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
                {/* Show API Withdrawal Methods */}
                {withdrawalMethods.length > 0
                  ? withdrawalMethods.map((method) => (
                      <div
                        key={method._id}
                        className={`relative shadow-md p-2 rounded-lg cursor-pointer transition-all ${
                          selectedMethod ===
                          (language === "bn"
                            ? method.method_name_bd
                            : method.method_name_en)
                            ? "bg-common-blue text-black"
                            : "bg-gray-200"
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
                          setSelectedChannel(method); // Store the full method object
                          setSelectedAmount(""); // Reset amount on method change
                          setSelectedBonus(""); // Reset bonus
                        }}
                      >
                        {/* Withdrawal Fee Badge */}
                        {method.withdrawal_fee > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                            {method.fee_type === "fixed"
                              ? `৳${method.withdrawal_fee}`
                              : `${method.withdrawal_fee}%`}
                          </span>
                        )}

                        {method.method_image && (
                          <img
                            src={method.method_image}
                            alt={
                              language === "bn"
                                ? method.method_name_bd
                                : method.method_name_en
                            }
                            className={`h-8 mx-auto mb-2 ${
                              selectedMethod ===
                              (language === "bn"
                                ? method.method_name_bd
                                : method.method_name_en)
                                ? "brightness-0 invert"
                                : ""
                            }`}
                          />
                        )}
                        <h4 className="text-center text-sm font-semibold">
                          {language === "bn"
                            ? method.method_name_bd
                            : method.method_name_en}
                        </h4>
                        <p className="text-center text-xs opacity-75 mt-1">
                          {language === "bn" ? "সর্বনিম্ন" : "Min"}: ৳
                          {method.min_withdrawal}
                        </p>
                      </div>
                    ))
                  : // Fallback to static payment methods if no API data
                    paymentMethods.map((method) => (
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
                          setSelectedAmount(""); // Reset amount on method change
                          setSelectedBonus(""); // Reset bonus
                        }}
                      >
                        <span className="absolute -top-2 -right-2 bg-common-orange text-black text-xs px-1 rounded-md">
                          {method.percentage}
                        </span>
                        <img
                          src={method.logo}
                          alt={method.name}
                          className={`h-6 mx-auto mb-2 ${
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

          {selectedChannel && (
            <>
              <div className="bg-bg-jaya9-logo-color p-3 mt-2">
                <h3 className="text-lg font-semibold mb-3 py-2 border-b border-black">
                  {language === "bn" ? "পরিমাণ" : "Amount"}
                </h3>
              </div>

              <div className="mb-4 p-3 bg-bg-jaya9-logo-color flex flex-row items-center">
                <label className="text-2xl mb-2 h-auto text-green-700 font-medium">
                  ৳
                </label>
                <input
                  type="number"
                  value={selectedAmount || ""}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  placeholder={
                    selectedChannel.min_withdrawal
                      ? `${language === "bn" ? "ন্যূনতম" : "Min"} ৳${
                          selectedChannel.min_withdrawal
                        } - ${language === "bn" ? "সর্বোচ্চ" : "Max"} ৳${
                          selectedChannel.max_withdrawal
                        }`
                      : "ন্যূনতম ৳ 500.00 - সর্বোচ্চ ৳ 25,000.00"
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-bg-jaya9-logo-color p-3">
                <h3 className="text-lg font-semibold mb-3 border-b border-black">
                  {language === "bn" ? "মোবাইল নম্বর" : "Phone Number"}
                </h3>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-4 py-2 bg-white border border-gray-500 rounded-md text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Show calculated fee */}
            </>
          )}

          <button
            onClick={handleWithdrawRequest}
            className="w-full bg-common-orange text-black py-2 my-2 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            disabled={
              !selectedChannel ||
              !selectedAmount ||
              !phoneNumber ||
              isSubmitting
            }
          >
            {isSubmitting
              ? language === "bn"
                ? "প্রক্রিয়াকরণ..."
                : "Processing..."
              : language === "bn"
              ? "উত্তোলন"
              : "Withdraw"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TabWithdraw;
