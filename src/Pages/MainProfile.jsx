import { useContext, useState, createContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import iconDeposit from "../assets/profile-deposit.png";
import iconWithdraw from "../assets/profile-withdraw.png";
import iconBonus from "../assets/profile-bonus.png";
import iconVoucher from "../assets/icon_Claim Voucher.png";
import bajilogo from "../assets/profile-betting-record.png";
import transferlogo from "../assets/profile-transfer-record.png";
import bonuslogo from "../assets/profile-bonus.png";
import transactionlogo from "../assets/profile-transaction-record.png";
import reedemLogo from "../assets/profile-referral-bonus.png";
import rewardLogo from "../assets/icon-depositfreecoin.png";
import checkLogo from "../assets/icon_Daily Check In.png";
import wofLogo from "../assets/icon-wof.png";
import maniaLogo from "../assets/icon-card-mania.png";

import infologo from "../assets/profile-personal-info.png";

import passwordresetlogo from "../assets/profile-personal-info (1).png";

import bankdetailslogo from "../assets/profile-bank-details (1).png";

import inboxlogo from "../assets/profile-inbox-message.png";
import referellogo from "../assets/profile-referral.png";

import supportlogo from "../assets/profile-supports.png";
import whatsapplogo from "../assets/profile-email.png";
import telegramlogo from "../assets/icon-telegram.png";
import fblogo from "../assets/profile-fb.png";
import downloadlogo from "../assets/profile-logout.png";
import logouticon from "../assets/profile-logout.png";

import { useNavigate } from "react-router-dom";
import Navigation from "../components/MainProfile/Navigation";
import Name from "../components/MainProfile/Name";
import MainWallet from "../components/MainProfile/MainWallet";
import MainProfileTabs from "../components/MainProfile/MainProfileTabs";
import { LanguageContext } from "../Context/LanguageContext";
import VipLevel from "../components/MainProfile/VipLevel";
import useReferralStore from "../store/referralStore"; // Import the referral store

// Create context for referral data (kept for backward compatibility)
export const ReferralContext = createContext();

const MainProfile = ({ children }) => {
  // Accept children prop
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(Math.floor(Math.random() * 1000)); // Initial Balance

  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [contactUrls, setContactUrls] = useState({
    service247Url: "",
    whatsappUrl: "",
    telegramUrl: "",
    facebookUrl: "",
  });
  const [apkDownloadUrl, setApkDownloadUrl] = useState("");

  // Use the referral store
  const { referralData } = useReferralStore();

  // Fetch contact URLs from API
  useEffect(() => {
    const fetchContactUrls = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/contact");
        if (response.data.success && response.data.data) {
          setContactUrls({
            service247Url: response.data.data.service247Url || "",
            whatsappUrl: response.data.data.whatsappUrl || "",
            telegramUrl: response.data.data.telegramUrl || "",
            facebookUrl: response.data.data.facebookUrl || "",
          });
        }
      } catch (error) {
        console.error("Error fetching contact URLs:", error);
      }
    };

    fetchContactUrls();
  }, []);

  // Fetch APK download URL from API
  useEffect(() => {
    const fetchApkUrl = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/apk");
        if (
          response.data.success &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          const apkData = response.data.data[0];
          setApkDownloadUrl(`http://localhost:8000${apkData.downloadUrl}`);
        }
      } catch (error) {
        console.error("Error fetching APK URL:", error);
      }
    };

    fetchApkUrl();
  }, []);

  const reloadBalance = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setBalance(Math.floor(Math.random() * 1000)); // Generate new random balance
      setLoading(false); // Stop loading
    }, 1500); // Simulate a delay (1.5s)
  };

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev); // Toggle show/hide
  };
  const dataBn = [
    {
      title: "তহবিল",
      titleClass: "text-white",
      gridClass: " grid-cols-5 ",
      items: [
        {
          imgSrc: iconDeposit,
          label: "আমানত",
          path: "/amanot",
          imgClass: "w-[20%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconWithdraw,
          label: "উত্তোলন",
          path: "/amanot",
          imgClass: "w-[20%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconBonus,
          label: "তাৎক্ষণিক রিবেট",
          path: "/instantRebate",
          imgClass: "w-[20%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconVoucher,
          label: "দাবি ভাউচার",
          path: "/voucher",
          imgClass: "w-[25%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconVoucher,
          label: "রেফারেল কোড",
          path: "/referralcode",
          imgClass: "w-[25%]",
          labelClass: "text-white text-xs lg:text:md",
        },
      ],
    },
    {
      title: "  ইতিহাস ",
      titleClass: "text-white",
      gridClass:
        "grid-cols-2 justify-items-center lg:justify-items-center    lg:grid-cols-6 ",
      sectionClass: "mt-2",
      items: [
        {
          imgSrc: bajilogo,
          label: "বাজি রেকর্ড",
          path: "/baji",
          imgClass: "w-[25%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: bajilogo,
          label: "টার্নওভার",
          path: "/turnover",
          imgClass: "w-[25%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: transferlogo,
          label: "স্থানান্তর রেকর্ড",
          path: "/sthanantor",
          imgClass: "w-[30%]",
          labelClass: " whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: bonuslogo,
          label: "বোনাস",
          path: "/bonus",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: transactionlogo,
          label: "লেনদেন রেকর্ড",
          path: "/lenden",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: reedemLogo,
          label: "ইতিহাস রিডিম",
          path: "/referralsummary",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
      ],
    },
    {
      title: "পুরস্কার",
      titleClass: "text-white",
      gridClass: " grid-cols-4 ",
      items: [
        {
          imgSrc: rewardLogo,
          label: "Deposit & Free Coin",
          path: "/dabivoutcher",
          imgClass: "w-10",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: checkLogo,
          label: "দৈনিক চেক ইন",
          path: "/puroskar",
          imgClass: "w-12 lg:w-12",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: wofLogo,
          label: "ফরচুন স্পিন",
          path: "/puroskar",
          imgClass: "w-12 lg:w-12",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: maniaLogo,
          label: "কার্ড ম্যানিয়া",
          path: "/puroskar",
          imgClass: "w-12 lg:w-12",
          labelClass: "text-white text-xs lg:text:md",
        },
      ],
    },
    {
      title: "  প্রোফাইল ",
      titleClass: "text-white",
      gridClass:
        "grid-cols-2  justify-items-center lg:justify-items-center    lg:grid-cols-5 ",
      sectionClass: "mt-2",
      items: [
        {
          imgSrc: infologo,
          label: "ব্যাক্তিগত তথ্য",
          path: "/jachaikoron",
          imgClass: "w-[20%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: passwordresetlogo,
          label: "পাসওয়ার্ড পরিবর্তন  করুন",
          path: "/passwordchange",
          imgClass: "w-[20%]",
          labelClass: " whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: bankdetailslogo,
          label: "ব্যাংক বিবরণ",
          path: "/bankdetails",
          imgClass: "w-[25%]",
          labelClass: " whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: inboxlogo,
          label: "ইনবক্স বার্তা",
          path: "/inbox",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: referellogo,
          label: "সুপারিশ",
          path: "/referralsummary",
          imgClass: "w-[25%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        // {
        //   imgSrc: referellogo,
        //   label: "Referral Bonus",
        //   path: "/refferelbonus",
        //   imgClass: "",
        //   labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        // },
      ],
    },
    {
      title: "  যোগাযোগ করুন ",
      titleClass: "text-white",
      gridClass: "grid-cols-2     lg:grid-cols-4 ",
      sectionClass: "mt-2",
      items: [
        {
          imgSrc: supportlogo,
          label: "24/7 সমর্থন",
          imgClass: "w-[20%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.service247Url,
        },

        {
          imgSrc: telegramlogo,
          label: "Telegram",
          imgClass: "w-10",
          labelClass: " whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.telegramUrl,
        },
        {
          imgSrc: fblogo,
          label: "ফেসবুক",
          imgClass: "w-10",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.facebookUrl,
        },
        {
          imgSrc: whatsapplogo,
          label: "হোয়াটসঅ্যাপ",
          imgClass: "w-10",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.whatsappUrl,
        },
      ],
    },
    {
      title: "ডাউনলোড করুন",
      titleClass: "text-white",
      gridClass: " grid-cols-1 ",
      items: [
        {
          imgSrc: downloadlogo,
          label: "অ্যান্ড্রয়েড ডাউনলোড করুন",
          imgClass: "w-12",
          labelClass: "text-white text-xs lg:text:md",
          downloadUrl: apkDownloadUrl,
        },
      ],
    },
    {
      title: "",
      titleClass: "",
      gridClass: " grid-cols-1 ",
      items: [
        {
          onClick: () => navigate(-1),
          imgSrc: logouticon,
          label: "প্রস্থান",
          imgClass: "w-10",
          labelClass: "text-white text-xs lg:text:md",
        },
      ],
    },
  ];
  const dataEn = [
    {
      title: "Funds",
      titleClass: "text-white",
      gridClass: " grid-cols-4 ",
      items: [
        {
          imgSrc: iconDeposit,
          label: "Deposit",
          path: "/amanot",
          imgClass: "w-[20%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconWithdraw,
          label: "Withdraw",
          path: "/amanot",
          imgClass: "w-[20%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconBonus,
          label: "Instant Rebate",
          path: "/instantRebate",
          imgClass: "w-[20%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconVoucher,
          label: "Claim Voucher",
          path: "/amanot",
          imgClass: "w-[25%]",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: iconVoucher,
          label: "Referral Code",
          path: "/referralcode",
          imgClass: "w-[25%]",
          labelClass: "text-white text-xs lg:text:md",
        },
      ],
    },
    {
      title: "History",
      titleClass: "text-white",
      gridClass:
        "grid-cols-2 justify-items-center lg:justify-items-center lg:grid-cols-6",
      sectionClass: "mt-2",
      items: [
        {
          imgSrc: bajilogo,
          label: "Bet Record",
          path: "/baji",
          imgClass: "w-[25%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: bajilogo,
          label: "Turnover",
          path: "/turnover",
          imgClass: "w-[25%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: transferlogo,
          label: "Transfer Record",
          path: "/sthanantor",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: bonuslogo,
          label: "Bonus",
          path: "/bonus",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: transactionlogo,
          label: "Transaction Record",
          path: "/lenden",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: reedemLogo,
          label: "Reedem History",
          path: "/referralsummary",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
      ],
    },
    {
      title: "Events",
      titleClass: "text-white",
      gridClass: " grid-cols-4 ",
      items: [
        {
          imgSrc: rewardLogo,
          label: "Deposit & Free Coin",
          path: "/dabivoutcher",
          imgClass: "w-10",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: checkLogo,
          label: "Daily Check In",
          path: "/puroskar",
          imgClass: "w-12 lg:w-12",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: wofLogo,
          label: "kspin",
          path: "/puroskar",
          imgClass: "w-12 lg:w-12",
          labelClass: "text-white text-xs lg:text:md",
        },
        {
          imgSrc: maniaLogo,
          label: "cardmania",
          path: "/puroskar",
          imgClass: "w-12 lg:w-12",
          labelClass: "text-white text-xs lg:text:md",
        },
      ],
    },
    {
      title: "Profile",
      titleClass: "text-white",
      gridClass:
        "grid-cols-2 justify-items-center lg:justify-items-center lg:grid-cols-5",
      sectionClass: "mt-2",
      items: [
        {
          imgSrc: infologo,
          label: "Personal Info",
          path: "/jachaikoron",
          imgClass: "w-[20%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: passwordresetlogo,
          label: "Change Password",
          path: "/passwordchange",
          imgClass: "w-[20%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: bankdetailslogo,
          label: "Bank Details",
          path: "/bankdetails",
          imgClass: "w-[25%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: inboxlogo,
          label: "Inbox Messages",
          path: "/inbox",
          imgClass: "w-[30%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        {
          imgSrc: referellogo,
          label: "Recommendation",
          path: "/refference",
          imgClass: "w-[25%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        },
        // {
        //     imgSrc: referellogo,
        //     label: "Referral Bonus",
        //     path: "/refferelbonus",
        //     imgClass: "",
        //     labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
        // },
      ],
    },
    {
      title: "Contact Us",
      titleClass: "text-white",
      gridClass: "grid-cols-2 lg:grid-cols-4",
      sectionClass: "mt-2",
      items: [
        {
          imgSrc: supportlogo,
          label: "24/7 Support",
          imgClass: "w-[20%]",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.service247Url,
        },

        {
          imgSrc: telegramlogo,
          label: "Telegram",
          imgClass: "w-10",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.telegramUrl,
        },
        {
          imgSrc: fblogo,
          label: "Facebook",
          imgClass: "w-10",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.facebookUrl,
        },
        {
          imgSrc: whatsapplogo,
          label: "WhatsApp",
          imgClass: "w-10",
          labelClass: "whitespace-nowrap text-white text-xs lg:text:md",
          externalUrl: contactUrls.whatsappUrl,
        },
      ],
    },
    {
      title: "Download",
      titleClass: "text-white",
      gridClass: " grid-cols-1 ",
      items: [
        {
          imgSrc: downloadlogo,
          label: "Download Android",
          imgClass: "w-12",
          labelClass: "text-white text-xs lg:text:md",
          downloadUrl: apkDownloadUrl,
        },
      ],
    },
    {
      title: "",
      titleClass: "",
      gridClass: " grid-cols-1 ",
      items: [
        {
          onClick: () => navigate(-1),
          imgSrc: logouticon,
          label: "Logout",
          imgClass: "w-10",
          labelClass: "text-white text-xs lg:text:md",
        },
      ],
    },
  ];
  const data = language === "bn" ? dataBn : dataEn;
  return (
    <ReferralContext.Provider
      value={{ referralData, loading: useReferralStore.getState().loading }}
    >
      <AnimatePresence>
        <motion.div
          key="main-profile"
          initial={{ opacity: 0, y: 50 }} // Entry Animation (নিচ থেকে আসবে)
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth Timing
          className="bg-black min-h-screen pb-10 relative overflow-hidden "
        >
          <div className="mx-auto  lg:max-w-3xl min-h-screen   ">
            <Navigation navigate={navigate} />

            <Name />

            <div className="px-3 lg:px-0">
              <VipLevel />
              <MainWallet
                reloadBalance={reloadBalance}
                loading={loading}
                toggleBalanceVisibility={toggleBalanceVisibility}
                showBalance={showBalance}
                balance={balance}
                language={language}
              />

              {children ? (
                // If children are provided, render them (for the referral page)
                <div className="mt-4">{children}</div>
              ) : (
                // Otherwise, render the default tabs (for the main profile page)
                <MainProfileTabs data={data} />
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </ReferralContext.Provider>
  );
};

export default MainProfile;
