import { useState, useEffect, useContext, useMemo } from "react";
import image1 from "../assets/newimage1.webp";
// import image2 from "../assets/new image-2.webp";
import newimage2 from "../assets/promotiontab2logo1.jpg";
import newimage3 from "../assets/Promotion image-2.webp";
// import image3 from "../assets/new image-3.webp";
import newimage4 from "../assets/promotion image 4.webp";
import image4 from "../assets/new image-4.webp";
// import image5 from "../assets/new image-5.webp";
import image6 from "../assets/promotion image-6.webp";
import newimage6 from "../assets/Promotion new image-6.webp";
// import image7 from "../assets/image7.jpg";
import image8 from "../assets/tab1logo8.jpg";
import image9 from "../assets/tab1logo9.jpg";
import image10 from "../assets/tab1logo10.jpg";
import image11 from "../assets/tab1logo11.jpg";

import image12 from "../assets/tab1logo12.jpg";
import image13 from "../assets/tab1logo13.jpg";
import image14 from "../assets/tab1logo14.jpg";
import image15 from "../assets/tab1logo15.jpg";
import image16 from "../assets/tab1logo16.jpg";
import image17 from "../assets/tab1logo17.jpg";
import image18 from "../assets/tab1logo18.jpg";
import tab2logo1 from "../assets/promotiontab2logo1.jpg";
import Tabs from "../components/Promotion/Tabs";
import TabsContents from "../components/Promotion/TabsContents";
import { LanguageContext } from "../Context/LanguageContext";
import api from "../config/api";

const Promotion = () => {
  const { language } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState(1);
  const [promotions, setPromotions] = useState([]);
  const [apiPromotions, setApiPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = (promotion) => {
    console.log("🔍 Details clicked for promotion:", promotion);
    setSelectedPromotion(promotion);
    setIsModalOpen(true);
    console.log("✅ Modal should be open now");
  };

  const closeModal = () => {
    console.log("❌ Closing modal");
    setIsModalOpen(false);
    setSelectedPromotion(null);
  };
  const tabData = useMemo(
    () => [
      {
        id: 1,
        label: language === "bn" ? "সব" : "All",
        data: [
          {
            image: image1,
            title:
              language === "bn"
                ? "দৈনিক গিভঅ্যাওয়ে BPL ২০২৪-২০২৫"
                : "Daily Giveaway BPL 2024-2025",
            description:
              language === "bn"
                ? "প্রতিদিন ৯৯ জন সদস্যের জন্য একটি BPL গিভঅ্যাওয়ে পান !!!"
                : "Get a BPL giveaway for 99 members daily!!!",
            date: "2024-12-24 02:21:30 to 2025-02-08 14:59:59",
            countdown: "6 D 1 H এ শেষ হবে",
            details: true,
            apply: true,
          },
          {
            image: newimage3,
            title:
              language === "bn"
                ? "সুপার লিমিটেড অফার ৩৫০% স্বাগতম বোনাস"
                : "Super Limited Offer 350% Welcome Bonus",
            description:
              language === "bn"
                ? "এখনই নিন টিটো ৩৫০% বোনাস, সীমিত অফার"
                : "Claim Tito 350% Bonus now, limited offer",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: newimage4,
            title:
              language === "bn"
                ? "JAYA9 চমৎকার রেফারেল প্রোগ্রাম"
                : "JAYA9 Excellent Referral Program",
            description:
              language === "bn"
                ? "৳৯,৯৯,৯৯,৯৯৯ পর্যন্ত ২০% ডিপোজিট কমিশন"
                : "20% deposit commission up to ৳9,99,99,999",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: newimage2,
            title:
              language === "bn"
                ? "বিশেষ সীমাহীন আমানত বোনাস +৩%"
                : "Special Unlimited Deposit Bonus +3%",
            description:
              language === "bn"
                ? "জমা করুন এবং প্রতিটি জমার সাথে পান +৩% সীমাহীন বোনাস !!!"
                : "Deposit and get +3% unlimited bonus with every deposit!!!",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image4,
            title:
              language === "bn"
                ? "টুর্নামেন্ট স্লট Jili x Tito ৳৯,৯৯,৯৯৯"
                : "Tournament Slot Jili x Tito ৳9,99,999",
            description:
              language === "bn"
                ? "টুর্নামেন্টে অংশগ্রহণ করুন এবং সমস্ত পুরস্কার জিতে নিন ৳৯,৯৯,৯৯৯"
                : "Join the tournament and win all prizes worth ৳9,99,999",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 10 H এ শেষ হবে" : "Ends in 332 D 10 H",
            details: true,
            apply: false,
          },

          {
            image: newimage6,
            title:
              language === "bn"
                ? "বিনামূল্যে জন্মদিন বোনাস ৳২,০০০"
                : "Free Birthday Bonus ৳2,000",
            description:
              language === "bn"
                ? "আপনার বিশেষ দিনটিকে একটি বড় জয়ে পরিণত করুন"
                : "Turn your special day into a big win",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 10 H এ শেষ হবে" : "Ends in 332 D 10 H",
            details: true,
            apply: false,
          },
          {
            image: image6,
            title:
              language === "bn"
                ? "সাপ্তাহিক লাকি ড্র আইফোন ১৬ প্রো ম্যাক্স"
                : "Weekly Lucky Draw iPhone 16 Pro Max",
            description:
              language === "bn"
                ? "এখনই তুলে নিন, মিস করবেন না"
                : "Grab it now, don’t miss out",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 10 H এ শেষ হবে" : "Ends in 332 D 10 H",
            details: true,
            apply: false,
          },
          {
            image: image8,
            title:
              language === "bn"
                ? "স্লট 100% স্বাগতম বোনাস ৳18,000 পর্যন্ত"
                : "Slot 100% Welcome Bonus up to ৳18,000",
            description:
              language === "bn"
                ? "৳18,000 পর্যন্ত ওয়েলকাম বোনাস পান"
                : "Get a welcome bonus up to ৳18,000",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 10 H এ শেষ হবে" : "Ends in 332 D 10 H",
            details: true,
            apply: false,
          },
          {
            image: image9,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো 50% স্বাগতম বোনাস"
                : "Live Casino 50% Welcome Bonus",
            description:
              language === "bn"
                ? "৳20,000 পর্যন্ত স্বাগতম বোনাস পান"
                : "Get a welcome bonus up to ৳20,000",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 10 H এ শেষ হবে" : "Ends in 332 D 10 H",
            details: true,
            apply: false,
          },
          {
            image: image10,
            title:
              language === "bn"
                ? "স্লট 10% আনলিমিটেড ডিপোজিট বোনাস"
                : "Slot 10% Unlimited Deposit Bonus",
            description:
              language === "bn"
                ? "সীমাহীন বোনাস দাবি উপভোগ করুন এবং প্রতিবার জমা করার সময় স্লটের জন্য ৳10"
                : "Enjoy unlimited bonus claims and get ৳10 for slots every deposit",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 10 H এ শেষ হবে" : "Ends in 332 D 10 H",
            details: true,
            apply: false,
          },

          {
            image: image11,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো 5% আনলিমিটেড ডিপোজিট বোনাস"
                : "Live Casino 5% Unlimited Deposit Bonus",
            description:
              language === "bn"
                ? "সীমাহীন বোনাস দাবি উপভোগ করুন এবং প্রতিবার জমা করার সময় লাইভ ক্যাসি"
                : "Enjoy claiming unlimited bonuses and live casino on every deposit.",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image12,
            title:
              language === "bn"
                ? "20% সাপ্তাহিক রিলোড বোনাস ৳25,000 পর্যন্ত"
                : "20% Weekly Reload Bonus Up to ৳25,000",
            description:
              language === "bn"
                ? "আপনার সমস্ত প্রিয় স্লট গেমগুলির জন্য সপ্তাহের প্রথম জমাতে ৳25,000 পর্যন্ত বোনা"
                : "Get up to ৳25,000 bonus on your first weekly slot deposit.",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image13,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো 20% সাপ্তাহিক রিলোড বোনাস"
                : "Live Casino 20% Weekly Reload Bonus",
            description:
              language === "bn"
                ? "সপ্তাহের প্রথম জমাতে প্রতি সপ্তাহে ৳25,000 পর্যন্ত বোনাস উপভোগ করুন!"
                : "Enjoy up to ৳25,000 bonus every week on your first deposit!",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image14,
            title:
              language === "bn"
                ? "স্পোর্ট 20% সাপ্তাহিক রিলোড বোনাস"
                : "Sports 20% Weekly Reload Bonus",
            description:
              language === "bn"
                ? "স্পোর্টসবুকের জন্য আপনার সপ্তাহের প্রথম জমাতে প্রতি সপ্তাহে ৳25,000 পর্যন্ত"
                : "Get up to ৳25,000 bonus every week on your first sports deposit.",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image15,
            title: language === "bn" ? "JAYA র‍্যাঙ্কিং" : "JAYA Ranking",
            description:
              language === "bn"
                ? "ননস্টপ পুরস্কার এবং পুরস্কারের জন্য প্রস্তুত হন"
                : "Get ready for nonstop rewards and prizes.",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image16,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো ৫% সাপ্তাহিক ক্যাশব্যাক"
                : "Live Casino 5% Weekly Cashback",
            description:
              language === "bn"
                ? "শুধুমাত্র 3x টার্নওভার সহ 60,000 পর্যন্ত লাইভ ক্যাসিনোর জন্য ৫% সাপ্তাহিক ক্যাশ"
                : "Enjoy 5% weekly cashback up to ৳60,000 with only 3x turnover.",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image17,
            title:
              language === "bn"
                ? "স্পোর্ট ৫% সাপ্তাহিক ক্যাশব্যাক"
                : "Sports 5% Weekly Cashback",
            description:
              language === "bn"
                ? "স্পোর্টসবুকের জন্য ৫% সাপ্তাহিক ক্যাশব্যাক উপভোগ করুন মাত্র 3x টার্নওভার সহ ৳60"
                : "Get 5% weekly cashback on sportsbook with just 3x turnover up to ৳60,000.",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
          {
            image: image18,
            title:
              language === "bn"
                ? "স্লট 5% সাপ্তাহিক ক্যাশব্যাক"
                : "Slot 5% Weekly Cashback",
            description:
              language === "bn"
                ? "মাত্র 3x টার্নওভার সহ ৳60,000 পর্যন্ত স্লটের জন্য 5% সাপ্তাহিক ক্যাশব্যাক উপভোগ"
                : "Enjoy 5% weekly cashback on slots up to ৳60,000 with only 3x turnover.",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "332 D 10 H এ শেষ হবে",
            details: true,
            apply: false,
          },
        ],
      },

      {
        id: 2,
        label: language === "bn" ? "IPL" : "IPL",
        data: [
          {
            image: tab2logo1,
            title:
              language === "bn"
                ? "বিশেষ সীমাহীন আমানত বোনাস +৩%"
                : "Special Unlimited Deposit Bonus +3%",
            description:
              language === "bn"
                ? "জমা করুন এবং প্রতিটি জমার সাথে পান +৩% সীমাহীন বোনাস !!!"
                : "Deposit and get +3% unlimited bonus on each deposit!!!",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "2 D 8 H",
            details: true,
            apply: true,
          },
          {
            image: newimage6,
            title:
              language === "bn"
                ? "বিনামূল্যে জন্মদিন বোনাস ৳২,০০০"
                : "Free Birthday Bonus ৳2,000",
            description:
              language === "bn"
                ? "আপনার বিশেষ দিনটিকে একটি বড় জয়ে পরিণত করুন"
                : "Turn your special day into a big win!",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "7 D 12 H",
            details: false,
            apply: true,
          },
          {
            image: image14,
            title:
              language === "bn"
                ? "স্পোর্ট 20% সাপ্তাহিক রিলোড বোনাস"
                : "Sports 20% Weekly Reload Bonus",
            description:
              language === "bn"
                ? "স্পোর্টসবুকের জন্য আপনার সপ্তাহের প্রথম জমাতে প্রতি সপ্তাহে ৳25,000 পর্যন্ত বোনাস পান"
                : "Get up to ৳25,000 weekly bonus on your first deposit of the week for Sportsbook!",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "7 D 12 H",
            details: false,
            apply: true,
          },
          {
            image: image17,
            title:
              language === "bn"
                ? "স্পোর্ট ৫% সাপ্তাহিক ক্যাশব্যাক"
                : "Sports 5% Weekly Cashback",
            description:
              language === "bn"
                ? "স্পোর্টসবুকের জন্য ৫% সাপ্তাহিক ক্যাশব্যাক উপভোগ করুন মাত্র 3x টার্নওভার সহ"
                : "Enjoy 5% weekly cashback for Sportsbook with just 3x turnover!",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "7 D 12 H",
            details: false,
            apply: true,
          },
        ],
      },
      {
        id: 3,
        label: language === "bn" ? "স্লট" : "Slot",
        data: [
          {
            image: newimage2,
            title:
              language === "bn"
                ? "সুপার লিমিটেড অফার ৩৫০% স্বাগতম বোনাস"
                : "Super Limited Offer 350% Welcome Bonus",
            description:
              language === "bn"
                ? "এখনই নিন টিটো ৩৫০% বোনাস, সীমিত অফার"
                : "Get Tito 350% Bonus Now, Limited Offer",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 6 H এ শেষ হবে" : "Ends in 332 D 6 H",
            details: false,
            apply: true,
          },
          {
            image: image4,
            title:
              language === "bn"
                ? "টুর্নামেন্ট স্লট Jili x Tito ৳৯,৯৯,৯৯৯"
                : "Tournament Slot Jili x Tito ৳9,99,999",
            description:
              language === "bn"
                ? "টুর্নামেন্টে অংশগ্রহণ করুন এবং সমস্ত পুরস্কার জিতে নিন ৳৯,৯৯,৯৯৯"
                : "Join the tournament and win all prizes of ৳9,99,999",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 6 H এ শেষ হবে" : "Ends in 332 D 6 H",
            details: false,
            apply: true,
          },
          {
            image: newimage6,
            title:
              language === "bn"
                ? "বিনামূল্যে জন্মদিন বোনাস ৳২,০০০"
                : "Free Birthday Bonus ৳2,000",
            description:
              language === "bn"
                ? "আপনার বিশেষ দিনটিকে একটি বড় জয়ে পরিণত করুন"
                : "Make your special day a big win",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "2158 D 6 H এ শেষ হবে" : "Ends in 2158 D 6 H",
            details: false,
            apply: true,
          },
          {
            image: image8,
            title:
              language === "bn"
                ? "স্লট 100% স্বাগতম বোনাস ৳18,000 পর্যন্ত"
                : "Slot 100% Welcome Bonus up to ৳18,000",
            description:
              language === "bn"
                ? "৳18,000 পর্যন্ত ওয়েলকাম বোনাস পান"
                : "Get a welcome bonus up to ৳18,000",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 6 H এ শেষ হবে" : "Ends in 332 D 6 H",
            details: false,
            apply: true,
          },
          {
            image: image10,
            title:
              language === "bn"
                ? "স্লট 10% আনলিমিটেড ডিপোজিট বোনাস"
                : "Slot 10% Unlimited Deposit Bonus",
            description:
              language === "bn"
                ? "সীমাহীন বোনাস দাবি উপভোগ করুন এবং প্রতিবার জমা করার সময় স্লটের জন্য"
                : "Enjoy unlimited bonus claims every time you deposit for slots",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 6 H এ শেষ হবে" : "Ends in 332 D 6 H",
            details: false,
            apply: true,
          },
          {
            image: image12,
            title:
              language === "bn"
                ? "20% সাপ্তাহিক রিলোড বোনাস ৳25,000 পর্যন্ত"
                : "20% Weekly Reload Bonus up to ৳25,000",
            description:
              language === "bn"
                ? "আপনার সমস্ত প্রিয় স্লট গেমগুলির জন্য সপ্তাহের প্রথম জমাতে ৳25,000 পর্যন্ত বোনাস পান"
                : "Get up to ৳25,000 bonus on your first weekly deposit for all your favorite slot games",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 6 H এ শেষ হবে" : "Ends in 332 D 6 H",
            details: false,
            apply: true,
          },
          {
            image: image16,
            title:
              language === "bn"
                ? "স্লট 5% সাপ্তাহিক ক্যাশব্যাক"
                : "Slot 5% Weekly Cashback",
            description:
              language === "bn"
                ? "মাত্র 3x টার্নওভার সহ ৳60,000 পর্যন্ত স্লটের জন্য 5% সাপ্তাহিক ক্যাশব্যাক উপভোগ করুন"
                : "Enjoy 5% weekly cashback up to ৳60,000 for slots with just 3x turnover",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown:
              language === "bn" ? "332 D 6 H এ শেষ হবে" : "Ends in 332 D 6 H",
            details: false,
            apply: true,
          },
        ],
      },
      {
        id: 4,
        label: language === "bn" ? "লাইভ ক্যাসিনো" : "Live Casino",
        data: [
          {
            image: newimage6,
            title:
              language === "bn"
                ? "বিনামূল্যে জন্মদিন বোনাস ৳২,০০০"
                : "Free Birthday Bonus ৳2,000",
            description:
              language === "bn"
                ? "আপনার বিশেষ দিনটিকে একটি বড় জয়ে পরিণত করুন"
                : "Turn your special day into a big win",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "5 D 3 H",
            details: true,
            apply: false,
          },
          {
            image: image9,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো 50% স্বাগতম বোনাস"
                : "Live Casino 50% Welcome Bonus",
            description:
              language === "bn"
                ? "৳20,000 পর্যন্ত স্বাগতম বোনাস পান"
                : "Get up to ৳20,000 welcome bonus",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "5 D 3 H",
            details: true,
            apply: false,
          },
          {
            image: image11,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো 5% আনলিমিটেড ডিপোজিট বোনাস"
                : "Live Casino 5% Unlimited Deposit Bonus",
            description:
              language === "bn"
                ? "সীমাহীন বোনাস দাবি উপভোগ করুন এবং প্রতিবার জমা করার সময় লাইভ ক্যাসিনো"
                : "Enjoy unlimited bonus claims every time you deposit at Live Casino",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "5 D 3 H",
            details: true,
            apply: false,
          },
          {
            image: image13,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো 20% সাপ্তাহিক রিলোড বোনাস"
                : "Live Casino 20% Weekly Reload Bonus",
            description:
              language === "bn"
                ? "সপ্তাহের প্রথম জমাতে প্রতি সপ্তাহে ৳25,000 পর্যন্ত বোনাস উপভোগ করুন!"
                : "Enjoy up to ৳25,000 bonus every week on your first deposit of the week!",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "5 D 3 H",
            details: true,
            apply: false,
          },
          {
            image: image16,
            title:
              language === "bn"
                ? "লাইভ ক্যাসিনো ৫% সাপ্তাহিক ক্যাশব্যাক"
                : "Live Casino 5% Weekly Cashback",
            description:
              language === "bn"
                ? "শুধুমাত্র 3x টার্নওভার সহ 60,000 পর্যন্ত লাইভ ক্যাসিনোর জন্য ৫% সাপ্তাহিক ক্যাশব্যাক"
                : "Get 5% weekly cashback up to 60,000 with only 3x turnover for Live Casino",
            date: "2023-09-08 20:57:03 to 2025-12-31 23:59:59",
            countdown: "5 D 3 H",
            details: true,
            apply: false,
          },
        ],
      },
      { id: 8, label: language === "bn" ? "ক্র্যাশ" : "Crash", data: [] },
      { id: 8, label: language === "bn" ? "বিশেষ" : "Special", data: [] },
      { id: 7, label: language === "bn" ? "VIP" : "VIP", data: [] },
      {
        id: 5,
        label: language === "bn" ? "নতুন সদেস্য" : "New Member",
        data: [],
      },
    ],
    [language]
  );
  // Fetch promotions from API
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching promotions from API...");
        const response = await api.get("/api/promotions");
        console.log("✅ Promotions API Response:", response.data);

        if (response.data.success && response.data.data) {
          // Transform API data to match existing format
          const transformedPromotions = response.data.data.map((promo) => ({
            image: promo.promotion_image || image1, // Use API image or fallback
            title: language === "bn" ? promo.title_bd : promo.title_en,
            description:
              language === "bn" ? promo.description_bd : promo.description_en,
            date: `${promo.createdAt} to ${promo.updatedAt}`,
            countdown:
              language === "bn" ? "সক্রিয় প্রমোশন" : "Active Promotion",
            details: true,
            apply: promo.status === "Active",
            gameType: promo.game_type,
            bonusSettings: promo.bonus_settings,
            paymentMethods: promo.payment_methods,
            id: promo._id,
          }));

          setApiPromotions(transformedPromotions);
          console.log("🔄 Transformed promotions:", transformedPromotions);
        }
      } catch (error) {
        console.error("❌ Error fetching promotions:", error);
        console.log("🔍 Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [language]);

  useEffect(() => {
    const selectedTab = tabData.find((tab) => tab.id === activeTab);

    // For "All" tab (id: 1), combine API promotions with static data
    if (activeTab === 1) {
      const staticData = selectedTab?.data || [];
      const combinedData = [...apiPromotions, ...staticData];
      setPromotions(combinedData);
      console.log("📋 Combined promotions for 'All' tab:", combinedData);
    } else {
      // For other tabs, use static data and filter API promotions by game type
      const staticData = selectedTab?.data || [];
      const filteredApiPromotions = apiPromotions.filter((promo) => {
        // Map tab IDs to game types
        const gameTypeMap = {
          2: "sports", // IPL
          3: "slots", // Slot
          4: "live_casino", // Live Casino
        };
        return promo.gameType === gameTypeMap[activeTab];
      });

      const combinedData = [...filteredApiPromotions, ...staticData];
      setPromotions(combinedData);
      console.log(`📋 Promotions for tab ${activeTab}:`, combinedData);
    }
  }, [activeTab, tabData, language, apiPromotions]);

  return (
    <div className="w-full py-4">
      {/* Tabs */}
      <Tabs
        tabData={tabData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-gray-600">
              {language === "bn"
                ? "প্রমোশন লোড হচ্ছে..."
                : "Loading promotions..."}
            </p>
          </div>
        </div>
      )}

      {/* TabsContents */}
      <TabsContents
        language={language}
        promotions={promotions}
        onDetailsClick={handleDetailsClick}
      />

      {/* Promotion Details Modal */}
      {isModalOpen && selectedPromotion && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-common-blue p-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-bold text-white">
                {language === "bn" ? "প্রমোশন বিস্তারিত" : "Promotion Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Promotion Image */}
              <img
                src={selectedPromotion.image}
                alt={selectedPromotion.title}
                className="w-full rounded-lg"
              />

              {/* Title */}
              <h3 className="text-2xl font-bold text-white">
                {selectedPromotion.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-base">
                {selectedPromotion.description}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="#ffffff"
                    stroke="#666"
                    strokeWidth="2"
                  />
                  <line
                    x1="32"
                    y1="32"
                    x2="32"
                    y2="16"
                    stroke="#666"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="32"
                    y1="32"
                    x2="44"
                    y2="32"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="32" cy="32" r="3" fill="#666" />
                </svg>
                <p className="text-sm">{selectedPromotion.date}</p>
              </div>

              {/* Bonus Settings (if from API) */}
              {selectedPromotion.bonusSettings && (
                <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                  <h4 className="text-lg font-semibold text-white">
                    {language === "bn" ? "বোনাস তথ্য" : "Bonus Information"}
                  </h4>
                  <div className="text-gray-300 space-y-1">
                    <p>
                      <span className="font-medium">
                        {language === "bn" ? "বোনাস ধরন: " : "Bonus Type: "}
                      </span>
                      {selectedPromotion.bonusSettings.bonus_type === "fixed"
                        ? language === "bn"
                          ? "নির্দিষ্ট"
                          : "Fixed"
                        : language === "bn"
                        ? "শতাংশ"
                        : "Percentage"}
                    </p>
                    <p>
                      <span className="font-medium">
                        {language === "bn" ? "বোনাস মূল্য: " : "Bonus Value: "}
                      </span>
                      {selectedPromotion.bonusSettings.bonus_type === "fixed"
                        ? `৳${selectedPromotion.bonusSettings.bonus_value}`
                        : `${selectedPromotion.bonusSettings.bonus_value}%`}
                    </p>
                    {selectedPromotion.bonusSettings.max_bonus_limit > 0 && (
                      <p>
                        <span className="font-medium">
                          {language === "bn"
                            ? "সর্বোচ্চ বোনাস: "
                            : "Max Bonus: "}
                        </span>
                        ৳{selectedPromotion.bonusSettings.max_bonus_limit}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Game Type (if from API) */}
              {selectedPromotion.gameType && (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {language === "bn" ? "গেম ধরন" : "Game Type"}
                  </h4>
                  <p className="text-gray-300 capitalize">
                    {selectedPromotion.gameType.replace("_", " ")}
                  </p>
                </div>
              )}

              {/* Payment Methods (if from API) */}
              {selectedPromotion.paymentMethods &&
                selectedPromotion.paymentMethods.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {language === "bn" ? "পেমেন্ট পদ্ধতি" : "Payment Methods"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPromotion.paymentMethods.map((method, idx) => (
                        <span
                          key={idx}
                          className="bg-common-blue text-white px-3 py-1 rounded-full text-sm"
                        >
                          {language === "bn"
                            ? method.method_name_bd
                            : method.method_name_en}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Countdown */}
              <div className="bg-common-blue text-white px-4 py-2 rounded-lg text-center">
                <p className="font-semibold">{selectedPromotion.countdown}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotion;
