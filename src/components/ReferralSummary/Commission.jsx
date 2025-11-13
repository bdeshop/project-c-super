import tier1Image from "../../assets/referral-tier1.png";
import tier2Image from "../../assets/referral-tier2.png";
import tier3Image from "../../assets/referral-tier3.png";
import QRImage from "../../assets/download qr2.png";
import { CiShare2 } from "react-icons/ci";
import { LanguageContext } from "../../Context/LanguageContext";
import { useContext } from "react";

const Commission = () => {
  const Images = [tier1Image, tier2Image, tier3Image];
  const { language } = useContext(LanguageContext);

  // ভাষা অনুযায়ী টেক্সট গুলো
  const text = {
    todayCommission: language === "bn" ? "আজকের কমিশন" : "Today Commission",
    thisMonthCommission: language === "bn" ? "এই মাসের কমিশন" : "This month Commission",
    redeemableCommission: language === "bn" ? "রিডিমযোগ্য কমিশন" : "Commission to Redeem",
    redeem: language === "bn" ? "রিডিম করুন" : "Redeem",
    referralTier: language === "bn" ? "রেফারেল স্তর" : "Referral Tier",
    total: language === "bn" ? "মোট" : "Total",
    referralBonus: language === "bn" ? "রেফারেল বোনাস" : "Referral Bonus",
    expiredDate: language === "bn" ? "মেয়াদোত্তীর্ণ তারিখ" : "Expired Date",
    freeBonus: language === "bn" ? "ফ্রি বোনাস" : "Free Bonus",
    deposit: language === "bn" ? "ডিপোজিট" : "Deposit",
    turnover: language === "bn" ? "টার্নওভার" : "Turnover",
    yourReferralStatus: language === "bn" ? " রেফারেল স্ট্যাটাস" : "Your Referral Status",
    friendsAccepted: language === "bn" ? "ফ্রেন্ড একসেপ্ট করেছে" : "Friend's Accepted",
    friendsCompleted: language === "bn" ? "ফ্রেন্ডস কমপ্লিট করেছে" : "Friend's Complete",
    shareMessage: language === "bn"
      ? "আপনার বন্ধুদের সাথে অভিজ্ঞতা শেয়ার করুন! উভয়েই বোনাস পাবেন।"
      : "Share your amazing experience with us to your friends Now! Both of you will get the bonus.",
    shareNow: language === "bn" ? "শেয়ার" : "Share Now",
    downlineReport: language === "bn" ? "ডাউনলাইন রিপোর্ট" : "Downline Report",
  };

  return (
    <div className="py-4">
      <div className="bg-bg-primary p-4 w-full flex md:flex-row flex-col gap-2">
        <div>
          <div className="flex flex-col">
            <div className="text-white lg:flex gap-2">
              <div className="w-full p-2">
                <div className="text-white pb-2">
                  <h3>{text.todayCommission}</h3>
                  <input
                    type="text"
                    placeholder="৳ 0.00"
                    readOnly
                    className="placeholder:text-bold placeholder:text-white bg-common-orange p-1 w-full rounded-md"
                  />
                  <h3>{text.thisMonthCommission}</h3>
                  <input
                    type="text"
                    placeholder="৳ 0.00"
                    readOnly
                    className="placeholder:text-bold placeholder:text-white rounded-md p-1 w-full bg-common-orange"
                  />
                </div>

                <hr />

                <div>
                  <h3>{text.redeemableCommission}</h3>
                  <div className="flex justify-between rounded-md w-full p-1 bg-white text-black">
                    <strong>৳</strong>
                    <p>0.00</p>
                  </div>
                </div>

                <div className="py-1">
                  <button className="w-full p-1 rounded-md text-center bg-common-orange">
                    {text.redeem}
                  </button>
                </div>
              </div>

              <div className="w-full bg-bg-Secondary p-4">
                <h3>{text.referralTier}</h3>
                <div className="flex gap-2 py-2">
                  <button className="w-full bg-common-orange">{text.total}</button>
                  <button className="w-full bg-common-orange">0</button>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {Images.map((img, index) => (
                    <div key={index}>
                      <img src={img} alt="" className="w-[100%]" />
                      <input
                        type="number"
                        placeholder="0"
                        readOnly
                        className="bg-common-orange placeholder:text-white w-[100%] placeholder:text-center my-2 rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-white my-2 p-4 border-2 border-textPrimary rounded-md">
              <div className="w-full text-xs whitespace-nowrap lg:text-base flex justify-between py-2 font-semibold">
                <p>{text.referralBonus}</p>
                <p>{text.expiredDate}</p>
              </div>

              <div className="lg:flex gap-4">
                <div className="flex flex-col w-full gap-4 bg-special-Color p-4">
                  {[text.freeBonus, text.deposit, text.turnover].map((label, index) => (
                    <div key={index} className="w-full text-white flex flex-col items-start">
                      <h3>{label}</h3>
                      <div className="bg-white text-black rounded-md px-3 py-2 w-full">
                        <strong>৳</strong> 0.00
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col my-4 lg:my-0 py-4 items-center w-full text-[#00000099] font-semibold bg-common-orange">
                  <h3>{text.yourReferralStatus}</h3>
                  <div className="flex gap-4 py-4 pt-10">
                    <div className="flex flex-col items-center border-[#00000099] border-dashed border-r-2 pr-4">
                      <p className="text-4xl font-bold">0</p>
                      <p className="text-sm text-center lg:text-base">{text.friendsAccepted}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-4xl font-bold">0</p>
                      <p className="text-sm text-center lg:text-base">{text.friendsCompleted}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end py-2">
                <button className="px-8 py-1 rounded-md border border-purple-600 bg-white text-black">
                  {text.downlineReport}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-Secondary p-4 min-h-screen flex flex-col items-center">
          <p className="text-center text-white p-4">
            <span className="text-textPrimary">{text.shareMessage}</span>
          </p>
          <img src={QRImage} alt="" className="w-[80%]" />
          <button className="flex gap-2 justify-center my-2 items-center text-white w-[60%] bg-common-orange rounded-md p-1">
            <CiShare2 size={25} />
            {text.shareNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Commission;
