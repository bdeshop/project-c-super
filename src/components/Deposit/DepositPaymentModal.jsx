import { useState } from "react";
import api from "../../config/api";

const DepositPaymentModal = ({
  isOpen,
  onClose,
  selectedMethod,
  selectedChannel,
  selectedAmount,
  selectedBonus,
  language,
  apiPaymentMethods,
  totalAmount,
  promotionBonus,
}) => {
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Use totalAmount if provided (with bonus), otherwise use selectedAmount
  const displayAmount = totalAmount || selectedAmount;
  const hasBonus = selectedBonus === "promotion" && promotionBonus;

  // Find the selected payment method from API data
  const paymentMethod = apiPaymentMethods?.find(
    (method) =>
      (language === "bn" ? method.method_name_bd : method.method_name_en) ===
      selectedMethod
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Get auth token and fetch user profile to get user_id
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert(language === "bn" ? "লগইন করুন" : "Please login");
        return;
      }

      // Fetch user profile to get user_id
      let userId = null;
      let userWalletNumber = "01712345678"; // Default fallback

      try {
        const profileResponse = await api.get("/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileResponse.data.success && profileResponse.data.data.user) {
          userId = profileResponse.data.data.user.id;
          userWalletNumber =
            profileResponse.data.data.user.phoneNumber || userWalletNumber;
          console.log("✅ User ID fetched:", userId);
          console.log("📱 User phone:", userWalletNumber);
        }
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        alert(
          language === "bn"
            ? "ব্যবহারকারীর তথ্য পাওয়া যায়নি"
            : "Could not fetch user information"
        );
        return;
      }

      if (!userId) {
        alert(
          language === "bn"
            ? "ব্যবহারকারী আইডি পাওয়া যায়নি"
            : "User ID not found"
        );
        return;
      }

      // Prepare transaction data
      const transactionData = {
        user_id: userId, // Add user_id
        amount: parseInt(displayAmount), // Use total amount (with bonus if selected)
        wallet_provider: selectedMethod, // e.g., "bKash", "Nogod"
        transaction_id: formData.transactionId,
        wallet_number: userWalletNumber,
        status: "Pending",
        transaction_type: "Deposit",
        description: `User deposit via ${selectedMethod}${
          hasBonus ? ` with promotion bonus` : selectedBonus ? ` with bonus code ${selectedBonus}` : ""
        }`,
        bonusCode: selectedBonus !== "promotion" ? selectedBonus : null,
        promotionId: selectedBonus === "promotion" ? promotionBonus?.id : null,
        bonus_applied: hasBonus || (selectedBonus && selectedBonus !== "promotion"),
        original_amount: hasBonus
          ? parseInt(selectedAmount)
          : parseInt(displayAmount),
        bonus_amount: hasBonus
          ? parseInt(displayAmount) - parseInt(selectedAmount)
          : 0,
      };

      console.log("📤 Submitting transaction:", transactionData);
      console.log("👤 User ID:", userId);
      console.log("💰 Original Amount:", selectedAmount);
      console.log("🎁 Total Amount (with bonus):", displayAmount);

      // Make API call to create transaction
      const response = await api.post("/api/transactions", transactionData);

      console.log("✅ Transaction created successfully:", response.data);

      // Show success message (you can add a toast notification here)
      alert(
        language === "bn"
          ? "আপনার ডিপোজিট অনুরোধ সফলভাবে জমা দেওয়া হয়েছে!"
          : "Your deposit request has been submitted successfully!"
      );

      // Close modal after successful processing
      onClose();
    } catch (error) {
      console.error("❌ Deposit processing error:", error);

      // Show error message
      const errorMessage = error.response?.data?.message || error.message;
      alert(
        language === "bn" ? `ত্রুটি: ${errorMessage}` : `Error: ${errorMessage}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">BDT {selectedAmount}</h2>
            {hasBonus && (
              <p className="text-sm bg-yellow-500 text-black px-2 py-1 rounded mt-1 inline-block">
                🎁 {language === "bn" ? "বোনাস সহ মোট: " : "Total with Bonus: "}
                BDT {displayAmount}
              </p>
            )}
            <p className="text-sm opacity-90 mt-1">
              {language === "bn"
                ? "কম বা বেশি ক্যাশআউট করবেন না"
                : "Do not cash out more or less"}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="bg-white text-green-600 px-2 py-1 rounded text-xs font-semibold">
              Oracle Pay
            </span>
            <span className="bg-white text-green-600 px-2 py-1 rounded text-xs font-semibold">
              SERVICE
            </span>
            <span className="bg-white text-green-600 px-2 py-1 rounded text-xs font-semibold">
              {language === "bn" ? "বাংলা" : "EN"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Message */}
          <div className="mb-6">
            <p className="text-red-600 text-sm">
              {language === "bn"
                ? `আপনি যদি ঠিকার পরিমাণ পরিবর্তন করেন (BDT ${selectedAmount})। আপনি ক্রেডিট পেতে সক্ষম হবেন না।`
                : `If you change the exact amount (BDT ${selectedAmount}), you will not be able to get credit.`}
            </p>
          </div>

          {/* Bonus Information */}
          {hasBonus && (
            <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg">
              <h3 className="text-sm font-semibold text-green-700 mb-2">
                🎁{" "}
                {language === "bn"
                  ? "প্রমোশন বোনাস প্রয়োগ করা হয়েছে"
                  : "Promotion Bonus Applied"}
              </h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">
                    {language === "bn" ? "মূল পরিমাণ: " : "Original Amount: "}
                  </span>
                  ৳{selectedAmount}
                </p>
                <p>
                  <span className="font-medium">
                    {language === "bn" ? "বোনাস: " : "Bonus: "}
                  </span>
                  ৳
                  {(
                    parseFloat(displayAmount) - parseFloat(selectedAmount)
                  ).toFixed(2)}
                </p>
                <p className="font-bold text-green-700 pt-2 border-t border-green-300">
                  <span>
                    {language === "bn" ? "মোট পরিমাণ: " : "Total Amount: "}
                  </span>
                  ৳{displayAmount}
                </p>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Agent Number */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-800">
                {language === "bn" ? "ওয়ালেট নম্বর*" : "Wallet Number*"}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {language === "bn"
                  ? "এই নাম্বারে অর্থ্যুমার ক্যাশআউট গ্রহণ করা হয়"
                  : "This number accepts cash out transfers"}
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={paymentMethod?.agent_wallet_number || "01853875893"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📋
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-800">
                {language === "bn" ? "ওয়ালেট প্রোভাইডার" : "Wallet Provider"}
              </h3>
              <p className="text-xs text-gray-600 mb-2">Method</p>
              <div className="bg-pink-600 text-white p-3 rounded-md flex items-center justify-center">
                <span className="text-sm font-semibold">
                  🦋 {language === "bn" ? "বিকাশ এজেন্ট" : "Bkash Agent"}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction ID Input */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2 text-red-600">
              {language === "bn"
                ? "ট্রানজেকশন আইডি (প্রয়োজন)"
                : "Transaction ID (Required)"}
            </h3>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId || ""}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={language === "bn" ? "TRXID লিখুন" : "Enter TRXID"}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !formData.transactionId}
              className="w-full px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isProcessing
                ? language === "bn"
                  ? "প্রক্রিয়াকরণ..."
                  : "Processing..."
                : language === "bn"
                ? "নিশ্চিত"
                : "Confirm"}
            </button>
          </div>

          {/* Warning Note */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-sm text-red-700">
              <strong>{language === "bn" ? "সতর্কতা:" : "Warning:"}</strong>{" "}
              {language === "bn"
                ? "আপনার ট্রানজেকশনটি সঠিকভাবে পূরণ করতে হবে, অন্যথায় অর্থ হারিয়ে যাবে! অনুগ্রহ করে কেবল নিচে দেয়া নির্দিষ্ট নাম্বারে আপনার বিকাশ এজেন্ট ডিপোজিট ক্যাশআউট করুন। এই নাম্বারে অন্য কোনো ওয়ালেট থেকে কাজ পাঠাবেন না।"
                : "You must complete your transaction correctly, otherwise money will be lost! Please only cash out your Bkash agent deposit to the specific number given below. Do not send work from any other wallet to this number."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPaymentModal;
