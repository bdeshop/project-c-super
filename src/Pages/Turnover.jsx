import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import api from "../config/api";

const Turnover = () => {
  const { language } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("running"); // 'running' or 'completed'
  const [wageringData, setWageringData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWageringProgress = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError(language === "bn" ? "অনুগ্রহ করে লগইন করুন" : "Please login");
        setLoading(false);
        return;
      }

      const status = activeTab === "running" ? "active" : "completed";
      const response = await api.get(`/api/bonus-wagering/my-progress?status=${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setWageringData(response.data);
      } else {
        setError(response.data.message || "Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching wagering progress:", err);
      setError(language === "bn" ? "ডেটা লোড করতে ব্যর্থ হয়েছে" : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWageringProgress();
  }, [activeTab]);

  const refreshData = () => {
    fetchWageringProgress();
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto bg-black max-w-7xl">
        {/* Tabs */}
        <div className="flex flex-row p-5 gap-5 border-b border-gray-800 items-center justify-center relative">
          <button
            onClick={() => setActiveTab("running")}
            className={`w-full lg:w-auto rounded-sm text-sm px-10 py-2 transition-all ${
              activeTab === "running"
                ? "bg-common-blue text-black font-bold"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {language === "bn" ? "চলমান" : "Running"}
          </button>

          <button
            onClick={() => setActiveTab("completed")}
            className={`w-full lg:w-auto rounded-sm text-sm px-10 py-2 transition-all ${
              activeTab === "completed"
                ? "bg-common-blue text-black font-bold"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {language === "bn" ? "সম্পন্ন" : "Completed"}
          </button>

          <button
            onClick={refreshData}
            className="absolute right-5 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            title={language === "bn" ? "রিফ্রেশ" : "Refresh"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="bg-black p-4 min-h-[70vh]">
          <div className="mb-6 p-3 bg-gray-900 border-l-4 border-common-blue rounded text-sm text-gray-300">
            {language === "bn"
              ? "টার্নওভার ডিসপ্লে কিছুটা বিলম্বিত হতে পারে। আপনার বেটস সেটেল হওয়ার পর ১০ মিনিট অপেক্ষা করুন।"
              : "Turnover display may be delayed. Please wait 10 min after your bets are settled."}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-common-blue"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchWageringProgress}
                className="mt-4 text-common-blue underline"
              >
                {language === "bn" ? "আবার চেষ্টা করুন" : "Try Again"}
              </button>
            </div>
          ) : !wageringData || wageringData.wageringRecords.length === 0 ? (
            <div className="text-center py-20 bg-gray-900 rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-400">
                {language === "bn" ? "কোনো রেকর্ড পাওয়া যায়নি" : "No records found"}
              </h3>
              <p className="text-gray-500 mt-2">
                {activeTab === "running"
                  ? language === "bn"
                    ? "আপনার বর্তমানে কোনো সক্রিয় টার্নওভার নেই।"
                    : "You don't have any active turnover requirements."
                  : language === "bn"
                  ? "আপনার সম্পন্ন করা টার্নওভারের ইতিহাস এখানে দেখা যাবে।"
                  : "Your completed turnover history will appear here."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wageringData.wageringRecords.map((record) => (
                <div
                  key={record._id}
                  className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-common-blue">
                          {record.bonusName}
                        </h4>
                        <p className="text-xs text-gray-400">Code: {record.bonusCode}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          record.status === "active"
                            ? "bg-green-900 text-green-300"
                            : record.status === "completed"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span className="font-bold text-common-blue">
                          {record.wageringProgress.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-common-blue h-2 rounded-full shadow-[0_0_8px_rgba(30,144,255,0.6)] transition-all duration-500"
                          style={{ width: `${record.wageringProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-black/40 p-2 rounded">
                        <p className="text-gray-500 mb-1">Bonus Amount</p>
                        <p className="font-bold">৳{record.bonusAmount.toFixed(2)}</p>
                      </div>
                      <div className="bg-black/40 p-2 rounded">
                        <p className="text-gray-500 mb-1">Required</p>
                        <p className="font-bold">৳{record.requiredWageringAmount.toFixed(2)}</p>
                      </div>
                      <div className="bg-black/40 p-2 rounded">
                        <p className="text-gray-500 mb-1">Current</p>
                        <p className="font-bold text-green-400">
                          ৳{record.currentWageringAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-black/40 p-2 rounded">
                        <p className="text-gray-500 mb-1">Remaining</p>
                        <p className="font-bold text-red-400">
                          ৳{record.remainingWagering.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500">
                      <span>Started: {new Date(record.createdAt).toLocaleDateString()}</span>
                      {record.status === "active" && (
                        <span className="text-orange-400">
                          Expires: {new Date(record.expiresAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Turnover;
