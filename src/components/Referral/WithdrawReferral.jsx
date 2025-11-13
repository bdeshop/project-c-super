import { useState, useEffect } from "react";
import { useReferral } from "../../hooks/useReferral";

const WithdrawReferral = ({ language, referralEarnings = 0, minWithdrawAmount = 100 }) => {
  const { referralInfo, loading, error, fetchReferralInfo, withdrawReferralEarnings } = useReferral();
  const [amount, setAmount] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");

  const translations = {
    en: {
      title: "Withdraw Referral Earnings",
      balance: "Available Balance",
      minAmount: "Minimum Withdrawal Amount",
      amount: "Withdrawal Amount",
      placeholder: "Enter amount",
      withdraw: "Withdraw",
      withdrawing: "Processing...",
      invalidAmount: "Please enter a valid amount",
      insufficientBalance: "Insufficient balance for withdrawal",
      belowMinimum: `Amount must be at least ৳${minWithdrawAmount}`,
      success: "Withdrawal request submitted successfully!",
      error: "Failed to process withdrawal. Please try again."
    },
    bn: {
      title: "রেফারেল উপার্জন উত্তোলন করুন",
      balance: "উপলব্ধ ব্যালেন্স",
      minAmount: "সর্বনিম্ন উত্তোলন পরিমাণ",
      amount: "উত্তোলন পরিমাণ",
      placeholder: "পরিমাণ লিখুন",
      withdraw: "উত্তোলন করুন",
      withdrawing: "প্রক্রিয়া করা হচ্ছে...",
      invalidAmount: "একটি বৈধ পরিমাণ লিখুন",
      insufficientBalance: "উত্তোলনের জন্য অপর্যাপ্ত ব্যালেন্স",
      belowMinimum: `পরিমাণ অবশ্যই ৳${minWithdrawAmount} হতে হবে`,
      success: "উত্তোলনের অনুরোধ সফলভাবে জমা দেওয়া হয়েছে!",
      error: "উত্তোলন প্রক্রিয়া করতে ব্যর্থ। আবার চেষ্টা করুন।"
    }
  };

  const t = translations[language] || translations.en;

  // Fetch referral info when component mounts
  useEffect(() => {
    fetchReferralInfo();
  }, [fetchReferralInfo]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccess("");

    // Validate amount
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setLocalError(t.invalidAmount);
      return;
    }

    if (withdrawAmount > (referralInfo.referralEarnings || referralEarnings)) {
      setLocalError(t.insufficientBalance);
      return;
    }

    if (withdrawAmount < minWithdrawAmount) {
      setLocalError(t.belowMinimum);
      return;
    }

    try {
      setLocalLoading(true);
      const result = await withdrawReferralEarnings(withdrawAmount);
      
      if (result.success) {
        setSuccess(t.success);
        setAmount("");
      } else {
        setLocalError(result.message);
      }
    } catch (err) {
      console.error("Withdrawal error:", err);
      setLocalError(t.error);
    } finally {
      setLocalLoading(false);
    }
  };

  const isLoading = localLoading || loading;
  const errorMsg = localError || error;
  const currentEarnings = referralInfo.referralEarnings || referralEarnings;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{t.title}</h3>
      
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <div className="flex justify-between">
          <span>{t.balance}:</span>
          <span className="font-semibold">৳{currentEarnings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>{t.minAmount}:</span>
          <span className="font-semibold">৳{minWithdrawAmount}</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMsg}
        </div>
      )}

      {success && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleWithdraw}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.amount}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t.placeholder}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || currentEarnings < minWithdrawAmount}
          className="w-full bg-common-orange text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t.withdrawing : t.withdraw}
        </button>
      </form>
    </div>
  );
};

export default WithdrawReferral;