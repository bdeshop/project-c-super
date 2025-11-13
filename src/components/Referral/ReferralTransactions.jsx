import { useState, useEffect } from "react";
import { useReferral } from "../../hooks/useReferral";

const ReferralTransactions = ({ language }) => {
  const { transactions, loading, error, fetchReferralTransactions } = useReferral();
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState("");

  const translations = {
    en: {
      title: "Referral Transactions",
      date: "Date",
      referee: "Referee",
      amount: "Amount",
      status: "Status",
      pending: "Pending",
      approved: "Approved",
      paid: "Paid",
      noTransactions: "No referral transactions found",
      loading: "Loading transactions...",
      error: "Failed to load transactions"
    },
    bn: {
      title: "রেফারেল লেনদেন",
      date: "তারিখ",
      referee: "প্রস্তাবিত ব্যক্তি",
      amount: "পরিমাণ",
      status: "অবস্থা",
      pending: "মুলতুবি",
      approved: "অনুমদিত",
      paid: "পরিশোধিত",
      noTransactions: "কোন রেফারেল লেনদেন পাওয়া যায়নি",
      loading: "লেনদেন লোড হচ্ছে...",
      error: "লেনদেন লোড করতে ব্যর্থ"
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLocalLoading(true);
        setLocalError("");
        await fetchReferralTransactions();
      } catch (err) {
        console.error("Error fetching referral transactions:", err);
        setLocalError(t.error);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchData();
  }, [fetchReferralTransactions, t.error]);

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return t.pending;
      case "approved": return t.approved;
      case "paid": return t.paid;
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "paid": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const isLoading = localLoading || loading;
  const errorMsg = localError || error;

  if (isLoading) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-600">{t.loading}</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="p-4">
        <p className="text-center text-red-600">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">{t.title}</h3>
      
      {transactions.length === 0 ? (
        <p className="text-center text-gray-600 py-4">{t.noTransactions}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">{t.date}</th>
                <th className="py-2 px-4 text-left">{t.referee}</th>
                <th className="py-2 px-4 text-left">{t.amount}</th>
                <th className="py-2 px-4 text-left">{t.status}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b border-gray-200">
                  <td className="py-2 px-4">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {transaction.referee?.username || "Unknown User"}
                  </td>
                  <td className="py-2 px-4">
                    ৳{transaction.amount}
                  </td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReferralTransactions;