import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Questions = ({ faqs, termsAndConditions }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const fallbackFaqs = [
    {
      question: "What is the VIP program ?",
      answer: "The VIP program is a loyalty program designed to offer Khela88 members a range of rewards and rebates."
    },
    {
      question: "How do I register as a Khela88 member ?",
      answer: "To register as a Khela88 member, click on the “sign up” button on the Khela88 website and follow the steps to complete the registration process, which may include providing personal information and verifying your account. If you encounter any issues during the registration process, you may contact Khela88 customer service for assistance."
    },
    {
      question: "How do I become a VIP member ?",
      answer: "You will start as a BRONZE tier member and will need to fulfil the requirements stated in the table provided in order to upgrade to a higher tier."
    },
    {
      question: "How do I upgrade to a higher tier ?",
      answer: "Members can upgrade to a higher tier by meeting the requirements specified based on the table provided. For example, BRONZE tier members who make total deposit ৳5,000 or more and reach ৳50,000 turnover will be automatically upgraded to the SILVER tier."
    },
    {
      question: "How long does it take to upgrade to a higher tier ?",
      answer: "Members will be upgraded to a higher tier automatically once they fulfil the requirements in the same month."
    },
    {
      question: "How is the rebate given calculated ?",
      answer: "The rebate given is calculated based on daily turnover multiplied by rebate percentage based on the table provided. For example, ৳5,000 turnover x 0.10% rebate in slot = ৳5 rebate bonus."
    }
  ];

  const fallbackTerms = [
    "This promotion is open for ALL REGISTERED MEMBER.",
    "All member offers are limited to once per person. Meaning one per family, household address, IP address, email address, telephone number, credit or debit card and/or e-payment account, or shared computer.",
    "Bonuses are valid for thirty (30) days upon issuance unless stated otherwise. Money won using bonus funds will be removed from the member’s account if prerequisites are not fulfilled within the given time frame.",
    "Any bets resulting in void, tie, cancelled, or made on opposite sides with the same outcome or bets with odds less than DEC 1.5 or CN 0.5 will not be counted as a valid turnover. Turnover on all types of non-live table games (e.g. Blackjack, Video Poker, Craps, American Roulette, Baccarat, and other non-live table games) and non-slot games, will not count towards this turnover requirement unless SPECIFICALLY stated.",
    "Participating members must accept and comply with all the terms mentioned above as well as all relevant rules and regulations stated on the Khela88 website.",
    "Khela88 reserves the right to modify, cancel, suspend or terminate the promotion and/or change the terms of the promotion at any time without prior notice.",
    "General Khela88 Terms & Conditions apply."
  ];

  const faqList = faqs && faqs.length > 0 ? faqs : fallbackFaqs;
  const termList = termsAndConditions && termsAndConditions.length > 0 ? termsAndConditions : fallbackTerms;

  return (
    <div className="mx-auto max-w-4xl py-6 md:px-6 lg:px-0">
      <div className="px-2 lg:px-0">
        <hr className="border-slate-800" />
      </div>

      {/* DESKTOP SPLIT COLUMN VIEW */}
      <div className="pt-6 lg:flex hidden gap-6 text-white text-sm">
        {/* FAQs */}
        <div className="bg-common-orange rounded-xl p-5 flex-1 shadow-lg">
          <h3 className="text-base font-extrabold pb-4 border-b border-white/20 uppercase tracking-wide">
            Frequently Asked Questions
          </h3>
          <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {faqList.map((item, index) => (
              <div key={index} className="space-y-1">
                <h4 className="font-bold text-xs text-amber-200">
                  {index + 1}. {item.question}
                </h4>
                <p className="text-xs text-slate-100 leading-relaxed font-medium pl-3">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-common-orange rounded-xl p-5 flex-1 shadow-lg">
          <h3 className="text-base font-extrabold pb-4 border-b border-white/20 uppercase tracking-wide">
            Terms & Conditions
          </h3>
          <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {termList.map((item, index) => (
              <div key={index} className="flex gap-2.5 items-start text-xs text-slate-100 leading-relaxed">
                <span className="font-bold text-amber-200 mt-0.5 min-w-[15px]">{index + 1}.</span>
                <p className="font-medium flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE COLLAPSIBLE VIEW */}
      <div className="px-4 mt-2 lg:hidden text-white space-y-3">
        {/* FAQs Collapsible Card */}
        <div className="border border-slate-800 rounded-xl overflow-hidden shadow-md">
          <div
            className="flex items-center px-4 py-3 text-xs justify-between text-white bg-common-orange font-bold uppercase tracking-wider cursor-pointer"
            onClick={() => toggleSection("faq")}
          >
            <p>FREQUENTLY ASKED QUESTIONS</p>
            {openSection === "faq" ? <FaCaretUp className="text-sm" /> : <FaCaretDown className="text-sm" />}
          </div>
          {openSection === "faq" && (
            <div className="bg-slate-900/40 p-4 space-y-4 border-t border-slate-800 animate-fade-in max-h-[400px] overflow-y-auto">
              {faqList.map((item, index) => (
                <div key={index} className="space-y-1">
                  <h4 className="font-bold text-xs text-common-orange">
                    {index + 1}. {item.question}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3 font-medium">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Terms and Conditions Collapsible Card */}
        <div className="border border-slate-800 rounded-xl overflow-hidden shadow-md">
          <div
            className="flex items-center px-4 py-3 text-xs justify-between text-white bg-common-orange font-bold uppercase tracking-wider cursor-pointer"
            onClick={() => toggleSection("terms")}
          >
            <p>TERMS AND CONDITION</p>
            {openSection === "terms" ? <FaCaretUp className="text-sm" /> : <FaCaretDown className="text-sm" />}
          </div>
          {openSection === "terms" && (
            <div className="bg-slate-900/40 p-4 space-y-3.5 border-t border-slate-800 animate-fade-in max-h-[400px] overflow-y-auto">
              {termList.map((item, index) => (
                <div key={index} className="flex gap-2.5 items-start text-xs text-slate-300 leading-relaxed font-medium">
                  <span className="font-bold text-common-orange mt-0.5 min-w-[12px]">{index + 1}.</span>
                  <p className="flex-1">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
