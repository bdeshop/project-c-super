import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import api from "../../config/api";

const Marquee = () => {
  const { language } = useContext(LanguageContext);
  const [bannerText, setBannerText] = useState({
    bn: [
      "স্ক্যাম সতর্কতা:প্রিয় সদস্যরা, আপনার অ্যাকাউন্ট সুরক্ষিত নিশ্চিত করতে দয়া করে আপনার লগইন ডিটেলস , অর্থপ্রদানের রসিদ(ক্যাশ আউট এর ছবি ) এবং ওটিপি কারও সাথে শেয়ার করবেন না। আপনার যদি সহায়তার প্রয়োজন হয়, তাহলে লাইভচ্যাটের মাধ্যমে আমাদের সাথে যোগাযোগ করুন "
    ],
    en: [
      "Scam Alert:Please do not share your login details, payment receipt (cash out image) and OTP with anyone. If you need assistance, please contact us via LiveChat."  
    ]
  });

  useEffect(() => {
    const fetchBannerText = async () => {
      try {
        const response = await api.get("/api/banner-text");
        console.log("Banner text API response:", response.data);
        
        // Update the banner text with the API response
        if (response.data.success && response.data.data.bannerText) {
          const { englishText, banglaText } = response.data.data.bannerText;
          setBannerText({
            bn: [banglaText],
            en: [englishText]
          });
        }
      } catch (err) {
        console.error("Error fetching banner text:", err);
      }
    };

    fetchBannerText();
  }, []);

  return (
    <div className="flex justify-evenly bg-bg-Secondary overflow-hidden py-2 relative">
      <div className="w-5/6 text-white overflow-hidden">
        <span className="w-full absolute top-1 left-0 md:left-8 lg:left-12 text-common-orange text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="28"
            fill="#0abab4"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm6.29-3c-.52 0-1.02-.2-1.41-.59-.78-.78-.78-2.05 0-2.83.39-.39.89-.59 1.41-.59s1.02.2 1.41.59c.78.78.78 2.05 0 2.83-.39.39-.89.59-1.41.59zM12 16c-2.76 0-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2c0 2.76-2.24 5-5 5zm5.3-4.71c-.39-.39-.39-1.02 0-1.41 1.17-1.17 1.17-3.07 0-4.24-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0 1.95 1.95 1.95 5.12 0 7.07-.39.39-1.02.39-1.41-.01z" />
          </svg>
        </span>

        <div className="w-full text-sm">
          <div className="marquee block">
            {bannerText[language]?.map((item, index) => (
              <span key={index} className="mx-4">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;