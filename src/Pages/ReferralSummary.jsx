import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import referralBg from "../assets/referral_banner_full.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Commission from "../components/ReferralSummary/Commission";
import Report from "../components/ReferralSummary/Report";
import History from "../components/ReferralSummary/History";
import ReferralTransactions from "../components/Referral/ReferralTransactions";
import WithdrawReferral from "../components/Referral/WithdrawReferral";
import { referralAPI } from "../config/api";

const ReferralSummary = () => {
  const { language } = useContext(LanguageContext);
  const [referralInfo, setReferralInfo] = useState({
    referralEarnings: 0,
    minWithdrawAmount: 100
  });

  // ✅ ভাষা অনুযায়ী বাটনের টেক্সট সেট করা হলো
  const buttonText = {
    summary: language === "bn" ? "সারসংক্ষেপ" : "Commission",
    report: language === "bn" ? "রেফারেল রিপোর্ট" : "Referral Report",
    history: language === "bn" ? "রিডিম ইতিহাস" : "Redeem History",
    transactions: language === "bn" ? "লেনদেন" : "Transactions",
    withdraw: language === "bn" ? "উত্তোলন" : "Withdraw"
  };

  // Fetch referral info when component mounts
  useEffect(() => {
    const fetchReferralInfo = async () => {
      try {
        const response = await referralAPI.getReferralInfo();
        if (response.data && response.data.success) {
          setReferralInfo({
            referralEarnings: response.data.data.referralEarnings || 0,
            minWithdrawAmount: response.data.data.minWithdrawAmount || 100
          });
        }
      } catch (error) {
        console.error("Error fetching referral info:", error);
      }
    };

    fetchReferralInfo();
  }, []);

  return (
    <div className="bg-black">
      <div className="  mx-auto  max-w-6xl overflow-hidden min-h-screen ">
        <div className="">
          <div
            className="relative p-6  bg-no-repeat bg-cover bg-center "
            style={{ backgroundImage: `url(${referralBg})` }}
          >
            <div className="text-white pt-8 md:pt-0 md:py-0 mx-auto md:max-w-sm lg:max-w-lg ">
              <h3 className="py-4 ">Referral Program</h3>
              <p className="lg:text-base md:text-sm ">
                Join the KHELA88 Referral Program today and begin earning. The
                most lucrative referral program in Bangladesh as KHELA88 allows
                you to refer friends and family to play and in exchange for an
                unlimited commission up to 2% over your lifetime. Additionally,
                the KHELA88 referral program provides all customers with
                enticing rewards such as unlimited ৳1,000 referral bonus for
                both and instant ৳10,000 extra rewards for new referral. Don’t
                wait ! Sign up now and begin earning with the KHELA88 Referral
                Program.
              </p>
            </div>
            <Tabs className="mt-4">
              <TabList className="flex text-xs md:text-sm flex-row  whitespace-nowrap gap-2 md:gap-5 items-center md:justify-center lg:justify-end mb-0">
                {[
                  { label: buttonText.summary },
                  { label: buttonText.report },
                  { label: buttonText.history },
                  { label: buttonText.transactions },
                  { label: buttonText.withdraw }
                ].map((tab, index) => (
                  <Tab
                    key={index}
                    className="bg-gray-200 text-black w-full lg:w-auto rounded-sm px-2 md:px-10 py-1 cursor-pointer"
                    selectedClassName="bg-gray-900 outline-none text-white"
                  >
                    {tab.label}
                  </Tab>
                ))}
              </TabList>
{/* After logIn Design */}
              <TabPanel >
                <Commission/>
              </TabPanel>

              <TabPanel>
                <Report/>
              </TabPanel>

              <TabPanel>
               <History/>
              </TabPanel>

              <TabPanel>
                <ReferralTransactions language={language} />
              </TabPanel>

              <TabPanel>
                <WithdrawReferral 
                  language={language} 
                  referralEarnings={referralInfo.referralEarnings}
                  minWithdrawAmount={referralInfo.minWithdrawAmount}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
        {/* before Login */}
        {/* <div className="flex text-white p-6 h-52 flex-col justify-center items-center bg-black md:bg-[#003433]">
        <h3 className="md:block hidden">Login / register now start earning points</h3>
        <div className="flex gap-2 py-4">
          <button
            onClick={() => setIsOpenModal(true)}
            className="px-4 py-1 border border-textPrimary rounded-md bg-slate-800 hover:bg-gray-600"
          >
            Login
          </button>

          <Link to="/nibondon">
            <button className="px-4 py-1 border border-textPrimary rounded-md bg-slate-800 hover:bg-gray-600">
              Sign Up
            </button>
          </Link>
        </div>
      </div> */}
        {/* after login */}
      </div>
    </div>
  );
};

export default ReferralSummary;