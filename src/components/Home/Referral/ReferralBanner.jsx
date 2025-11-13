// import banner from "../../../assets/Mobile_Before_Login (1).jpg";
import QrImage from "../../../assets/QrCode.png";
// import personImage from "../../../assets/person.png";
import referralBg from "../../../assets/bg_desktop.png";
// import { Link } from "react-router-dom";
import { IoIosCopy } from "react-icons/io";
import { GoShareAndroid } from "react-icons/go";

const ReferralBanner = ({ language }) => {
  const tierData = [
    { id: 1, tier: "TIER 1", percentage: "1.0%" },
    { id: 2, tier: "TIER 2", percentage: "0.8%" },
    { id: 3, tier: "TIER 3", percentage: "0.5%" },
  ];

  return (
    <div className="lg:px-4">
      <h3 className="py-2">
        {language === "bn" ? "রেফারেল প্রোগ্রাম" : "Referral Program"}
      </h3>
      {/* before login design */}
      {/* <Link to ="/referralsummary"> */}
      {/* <div className="lg:hidden">
        <img src={banner} alt="" className="w-full  " />
      </div> */}
      <div
        className=" px-4 lg:flex items-center  gap-6 py-3 bg-cover bg-no-repeat bg-center w-full "
        style={{ backgroundImage: `url(${referralBg})` }}
      >

        <div className="lg:hidden text-xs mb-2">
          <p>EARN FREE UNLIMITED  <span className="text-sm text-textPrimary font-semibold">
          ৳1,000 + 2% LIFETIME UNLIMITED  DEPOSIT COMMISSION
            </span></p>
        </div>
        <div className="w-1/2 lg:flex flex-col hidden gap-6 font-semibold">
          <h3 className="lg:text-4xl   ">EARN FREE UNLIMITED</h3>

          <div className="flex gap-2 items-center text-textPrimary">
            <p className=" lg:text-6xl">৳1,000 + 2% </p>
            <div className="flex flex-col whitespace-nowrap  text-sm">
              <p>LIFETIME UNLIMITED </p>
              <p>DEPOSIT COMMISSION</p>
            </div>
          </div>

          <div className="flex  gap-2">
            {tierData.map((item) => (
              <div key={item.id} className="flex  text-3xl">
                <p className="bg-common-orange p-1 rounded-l-md">{item.tier}</p>
                <p className="bg-white text-textPrimary p-1 rounded-r-md">
                  {item.percentage}
                </p>
              </div>
            ))}
          </div>
          <div className="">
            <div className="  text-2xl">
              <p>REFER & EARN WITH FRIENDS & FAMILY</p>
            </div>
            <div className="flex items-start ">
              <button className="bg-referral-button p-2 rounded-md border border-textPrimary text-2xl">
                REFER NOW
              </button>
            </div>
          </div>
        </div>
        {/* before login design */}
        {/* <div className=" w-1/2  ">
          <img src={personImage} alt="" className="" />
        </div> */}
        <div className="lg:w-1/2  flex rounded-md md:flex-row flex-col items-center bg-[linear-gradient(90deg,hsla(0,0%,100%,0.2256197479),hsla(0,0%,100%,0.65)_35%,hsla(0,0%,100%,0.853284))] p-4 font-semibold gap-2">
          <img src={QrImage} alt="" className="w-[50%] lg:w-[50%] " />
          <div className="text-[#007874] md:w-full flex flex-col gap-2">
            <p>Referral Code</p>
            <div className="relative">
              <input
                type="text"
                name=""
                id=""
                placeholder="GMO0PW0916"
                readOnly
                className="placeholder:text-textPrimary  px-2 py-1 rounded-md border w-full border-black"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2">
                <IoIosCopy />
              </span>
            </div>
            <p>Today Commission</p>
            <input
              type="text"
              name=""
              id=""
              placeholder="৳ 0"
              readOnly
              className="placeholder:text-textPrimary px-2 py-1 rounded-md border border-black"
            />
            <button className="flex items-center justify-center gap-2 w-full py-1 bg-bg-primary text-white">
              <GoShareAndroid className="text-white text-2xl rounded-sm" />
              Share Now
            </button>
            <button className="bg-common-orange py-1 rounded-sm text-white">
              Referral Report
            </button>
          </div>
        </div>
      </div>
      {/* before login design */}
      {/* </Link> */}
    </div>
  );
};

export default ReferralBanner;
