import { useState } from "react";
import { referralAPI } from "../config/api";

// Custom hook for managing referral data
export const useReferral = () => {
  const [referralInfo, setReferralInfo] = useState({
    referralEarnings: 0,
    referredUsers: [],
    referralCode: ""
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch referral info
  const fetchReferralInfo = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await referralAPI.getReferralInfo();
      if (response.data && response.data.success) {
        setReferralInfo(response.data.data || {
          referralEarnings: 0,
          referredUsers: [],
          referralCode: ""
        });
      }
    } catch (err) {
      console.error("Error fetching referral info:", err);
      setError("Failed to fetch referral information");
    } finally {
      setLoading(false);
    }
  };

  // Fetch referral transactions
  const fetchReferralTransactions = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await referralAPI.getReferralTransactions();
      if (response.data && response.data.success) {
        setTransactions(response.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching referral transactions:", err);
      setError("Failed to fetch referral transactions");
    } finally {
      setLoading(false);
    }
  };

  // Withdraw referral earnings
  const withdrawReferralEarnings = async (amount) => {
    try {
      setLoading(true);
      setError("");
      const response = await referralAPI.withdrawReferralEarnings({ amount });
      if (response.data && response.data.success) {
        // Refresh referral info after withdrawal
        await fetchReferralInfo();
        return { success: true, message: "Withdrawal successful" };
      }
    } catch (err) {
      console.error("Error withdrawing referral earnings:", err);
      const errorMessage = err.response?.data?.message || "Failed to process withdrawal";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Admin: Update transaction status
  const updateTransactionStatus = async (transactionId, status) => {
    try {
      setLoading(true);
      setError("");
      const response = await referralAPI.updateTransactionStatus(transactionId, { status });
      if (response.data && response.data.success) {
        // Refresh transactions after update
        await fetchReferralTransactions();
        return { success: true, message: "Transaction status updated successfully" };
      }
    } catch (err) {
      console.error("Error updating transaction status:", err);
      const errorMessage = err.response?.data?.message || "Failed to update transaction status";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    referralInfo,
    transactions,
    loading,
    error,
    fetchReferralInfo,
    fetchReferralTransactions,
    withdrawReferralEarnings,
    updateTransactionStatus
  };
};