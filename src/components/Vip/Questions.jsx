import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const Questions = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };
  return (
    <div className="mx-auto max-w-4xl py-5 md:px-6 lg:px-0">
      <hr />

      <div className="pt-4 lg:flex hidden  gap-6 text-white text-sm ">
        <div className="bg-common-orange rounded-md p-4">
          <h3 className="text-lg font-semibold py-2">
            Frequently Asked Questions
          </h3>
          <p className="leading-tight">
            1. What is the VIP program ?
            <br /> <br /> The VIP program is a loyalty program designed to offer
            Khela88 members a range of rewards and rebates.
            <br /> <br />
            2.How do I register as a Khela88 member ?
            <br /> <br />
            To register as a Khela88 member, click on the “sign up” button on
            the Khela88 website and follow the steps to complete the
            registration process, which may include providing personal
            information and verifying your account. If you encounter any issues
            during the registration process, you may contact Khela88 customer
            service for assistance.
            <br /> <br />
            3. How do I become a VIP member ?
            <br /> <br />
            You will start as a BRONZE tier member and will need to fulfil the
            requirements stated in the table provided in order to upgrade to a
            higher tier.
            <br /> <br />
            4. How do I upgrade to a higher tier ?
            <br /> <br />
            Members can upgrade to a higher tier by meeting the requirements
            specified based on the table provided. For example, BRONZE tier
            members who make total deposit ৳5,000 or more and reach ৳50,000
            turnover will be automatically upgraded to the SILVER tier.
            <br /> <br />
            5. How long does it take to upgrade to a higher tier ?
            <br /> <br />
            Members will be upgraded to a higher tier automatically once they
            fulfil the requirements in the same month.
            <br /> <br />
            6. How is the rebate given calculated ?
            <br /> <br />
            The rebate given is calculated based on daily turnover multiplied by
            rebate percentage based on the table provided. For example, ৳5,000
            turnover x 0.10% rebate in slot = ৳5 rebate bonus.
          </p>
        </div>

        <div className="bg-common-orange rounded-md p-4">
          <h3 className="text-lg font-semibold py-2">Terms and Condition</h3>
          <p className="leading-tight">
            1. This promotion is open for ALL REGISTERED MEMBER.
            <br /> <br />
            2. All member offers are limited to once per person. Meaning one per
            family, household address, IP address, email address, telephone
            number, credit or debit card and/or e-payment account, or shared
            computer.
            <br /> <br />
            3. Bonuses are valid for thirty (30) days upon issuance unless
            stated otherwise. Money won using bonus funds will be removed from
            the member’s account if prerequisites are not fulfilled within the
            given time frame.
            <br /> <br />
            4. Any bets resulting in void, tie, cancelled, or made on opposite
            sides with the same outcome or bets with odds less than DEC 1.5 or
            CN 0.5 will not be counted as a valid turnover. Turnover on all
            types of non-live table games (e.g. Blackjack, Video Poker, Craps,
            American Roulette, Baccarat, and other non-live table games) and
            non-slot games, will not count towards this turnover requirement
            unless SPECIFICALLY stated.
            <br /> <br />
            5. Participating members must accept and comply with all the terms
            mentioned above as well as all relevant rules and regulations stated
            on the Khela88 website.
            <br /> <br />
            6. Khela88 reserves the right to modify, cancel, suspend or
            terminate the promotion and/or change the terms of the promotion at
            any time without prior notice.
            <br /> <br />
            7. General Khela88 Terms & Conditions apply.
          </p>
        </div>
      </div>
      <div className="px-4 mt-4 lg:hidden text-white">
        <div>
          <div
            className="flex items-center px-2 py-2 my-2 text-xs justify-between text-white bg-common-orange"
            onClick={() => toggleSection("faq")}
          >
            <p className="font-semibold">FREQUENTLY ASKED QUESTIONS</p>
            {openSection === "faq" ? <FaCaretUp /> : <FaCaretDown />}
          </div>
          {openSection === "faq" && (
            <p className="leading-tight">
              1. What is the VIP program ?
              <br /> <br /> The VIP program is a loyalty program designed to
              offer Khela88 members a range of rewards and rebates.
              <br /> <br />
              2.How do I register as a Khela88 member ?
              <br /> <br />
              To register as a Khela88 member, click on the “sign up” button on
              the Khela88 website and follow the steps to complete the
              registration process, which may include providing personal
              information and verifying your account. If you encounter any
              issues during the registration process, you may contact Khela88
              customer service for assistance.
              <br /> <br />
              3. How do I become a VIP member ?
              <br /> <br />
              You will start as a BRONZE tier member and will need to fulfil the
              requirements stated in the table provided in order to upgrade to a
              higher tier.
              <br /> <br />
              4. How do I upgrade to a higher tier ?
              <br /> <br />
              Members can upgrade to a higher tier by meeting the requirements
              specified based on the table provided. For example, BRONZE tier
              members who make total deposit ৳5,000 or more and reach ৳50,000
              turnover will be automatically upgraded to the SILVER tier.
              <br /> <br />
              5. How long does it take to upgrade to a higher tier ?
              <br /> <br />
              Members will be upgraded to a higher tier automatically once they
              fulfil the requirements in the same month.
              <br /> <br />
              6. How is the rebate given calculated ?
              <br /> <br />
              The rebate given is calculated based on daily turnover multiplied
              by rebate percentage based on the table provided. For example,
              ৳5,000 turnover x 0.10% rebate in slot = ৳5 rebate bonus.
            </p>
          )}
        </div>

        <div className="">
          <div
            className="flex items-center px-2 py-2 my-2 text-xs justify-between text-white bg-common-orange"
            onClick={() => toggleSection("terms")}
          >
            <p className="font-semibold">TERMS AND CONDITION</p>
            {openSection === "faq" ? <FaCaretUp /> : <FaCaretDown />}
          </div>
          {openSection === "terms" && (
            <p className="leading-tight">
              1. This promotion is open for ALL REGISTERED MEMBER.
              <br /> <br />
              2. All member offers are limited to once per person. Meaning one
              per family, household address, IP address, email address,
              telephone number, credit or debit card and/or e-payment account,
              or shared computer.
              <br /> <br />
              3. Bonuses are valid for thirty (30) days upon issuance unless
              stated otherwise. Money won using bonus funds will be removed from
              the member’s account if prerequisites are not fulfilled within the
              given time frame.
              <br /> <br />
              4. Any bets resulting in void, tie, cancelled, or made on opposite
              sides with the same outcome or bets with odds less than DEC 1.5 or
              CN 0.5 will not be counted as a valid turnover. Turnover on all
              types of non-live table games (e.g. Blackjack, Video Poker, Craps,
              American Roulette, Baccarat, and other non-live table games) and
              non-slot games, will not count towards this turnover requirement
              unless SPECIFICALLY stated.
              <br /> <br />
              5. Participating members must accept and comply with all the terms
              mentioned above as well as all relevant rules and regulations
              stated on the Khela88 website.
              <br /> <br />
              6. Khela88 reserves the right to modify, cancel, suspend or
              terminate the promotion and/or change the terms of the promotion
              at any time without prior notice.
              <br /> <br />
              7. General Khela88 Terms & Conditions apply.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
