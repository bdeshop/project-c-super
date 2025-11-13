import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { LanguageContext } from "../Context/LanguageContext";
import { useContext } from "react";

const InstantRebate = () => {
  const { language } = useContext(LanguageContext);

  // Text based on language
  const texts = {
    instantRebate: language === "bn" ? "তাত্ক্ষণিক রিবেট" : "Instant Rebate",
    rebateHistory: language === "bn" ? "রিবেট ইতিহাস" : "Rebate History",
    totalPendingClaim: language === "bn" ? "মোট মুলতুবি দাবী" : "Total Pending Claim",
    lastUpdated: language === "bn" ? "সর্বশেষ আপডেট" : "Last Updated",
    claimNow: language === "bn" ? "এখন দাবী করুন" : "Claim Now",
    lastClaimed: language === "bn" ? "সর্বশেষ দাবী" : "Last Claimed",
    startDate: language === "bn" ? "শুরুর তারিখ" : "Start Date",
    endDate: language === "bn" ? "শেষ তারিখ" : "End Date",
    search: language === "bn" ? "অনুসন্ধান" : "SEARCH",
    transferHistory: language === "bn" ? "স্থানান্তর ইতিহাস" : "Transfer History",
    transactionDate: language === "bn" ? "লেনদেনের তারিখ" : "Transaction Date",
    amount: language === "bn" ? "	পরিমাণ" : "Amount",
  };

  return (
    <div className="">
      <Tabs className="w-full text-white flex flex-col justify-center items-center">
        <TabList className="w-full flex font-semibold justify-between">
          <Tab
            className="bg-bg-jaya9-logo-color w-full text-center py-2 focus:outline-none"
            selectedClassName="bg-common-orange"
          >
            {texts.instantRebate}
          </Tab>
          <Tab
            className="bg-bg-jaya9-logo-color w-full text-center py-2 focus:outline-none"
            selectedClassName="bg-common-orange"
          >
            {texts.rebateHistory}
          </Tab>
        </TabList>

        <TabPanel className="text-white mx-auto my-2 py-2 text-center justify-items-center max-w-4xl w-full">
          <div className="mx-auto bg-special-Color flex flex-col gap-2 max-w-2xl w-full rounded-sm py-2">
            <h3 className="text-white">{texts.totalPendingClaim}</h3>
            <div className="w-[50%] md:w-full mx-auto">
              <p className="bg-white p-2 text-textPrimary rounded-md font-semibold">
                <strong>৳ </strong>0.00
              </p>
            </div>
            <p className="text-xs">{texts.lastUpdated} - -</p>
            <div className="w-[50%] md:w-full mx-auto">
              <button className="bg-black p-2 w-full rounded-md">
                {texts.claimNow}
              </button>
            </div>
            <p className="text-xs">{texts.lastClaimed} - -</p>
          </div>
        </TabPanel>

        <TabPanel className="w-full px-4">
          <div className="flex flex-col gap-2 rounded-sm">
            <div className="text-black bg-[linear-gradient(180deg,_#5d5d5d,_#1d1d1d)]">
              <div className="flex justify-between md:gap-2 px-2">
                <div className="w-full">
                  <h3 className="text-white py-1">{texts.startDate}</h3>
                  <input
                    type="date"
                    name=""
                    id=""
                    className="md:w-full w-[80%] p-2 rounded-md"
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-white py-1">{texts.endDate}</h3>
                  <input
                    type="date"
                    name=""
                    id=""
                    className="md:w-full w-[80%] p-2 rounded-md"
                  />
                </div>
              </div>
              <div className="w-full p-2 text-white">
                <button className="bg-common-orange text-center p-1 rounded-md w-full">
                  {texts.search}
                </button>
              </div>
            </div>
            <div className="bg-[linear-gradient(180deg,_#5d5d5d,_#1d1d1d)] p-2">
              <h3 className="py-2">{texts.transferHistory}</h3>
              <div className="bg-white flex text-black font-semibold p-2 w-full justify-between">
                <h3 className="w-[50%]">{texts.transactionDate}</h3>
                <p className="text-center w-[50%]">{texts.amount}</p>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default InstantRebate;
