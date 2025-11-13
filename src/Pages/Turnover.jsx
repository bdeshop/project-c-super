import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";

const Turnover = () => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="bg-black">
      <div className="mx-auto bg-black max-w-7xl">
        <div className="flex flex-row p-5 gap-5 border-b border-gray-400 items-center md:justify-center lg:justify-end relative">
          <button className="bg-bg-jaya9-logo-color w-full lg:w-auto hover:bg-common-blue rounded-sm text-white text-sm px-10 py-1">
            {language === "bn" ? "চলমান" : "Ongoing"}
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block absolute top-6 right-1/2 -translate-x-full pt-1 mr-2 lg:hidden"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1 2.13-9" />
          </svg>

          <button className="bg-gray-200 w-full lg:w-auto rounded-sm hover:bg-gray-400 px-10 text-sm py-1">
            {language === "bn" ? "সম্পন্ন" : "Completed"}
          </button>
        </div>
        <div className="bg-white min-h-screen">
        <h3 className="text-center  text-textPrimary py-4 font-semibold">
          {language === "bn"
            ? "টার্নওভার ডিসপ্লে কিছুটা বিলম্বিত হতে পারে। আপনার বেটস সেটেল হওয়ার পর ১০ মিনিট অপেক্ষা করুন"
            : "Turnover display may be delayed. Please wait 10 min after your bets are settled"}

          
        </h3>
        <h3 className="text-center  text-textPrimary py-4 font-semibold">
          
          {language === "bn"
            ? "কোনও মুলতুবি টিকিট পাওয়া যায়নি!"
            : "No Pending Ticket Found!"}
        </h3>

        </div>
        
      </div>
    </div>
  );
};

export default Turnover;
