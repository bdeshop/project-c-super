import ImageSlider from "../components/Home/ImageSlider";
import Marquee from "../components/Home/Marquee";
import HomeTabs from "../components/Home/HomeTabs";
import { LanguageContext } from "../Context/LanguageContext";
import { useContext } from "react";
import Referral from "../components/Home/Referral/Referral";
import MainTabs from "../components/Home/HomeTabsLarger/MainTabs";
import UpcomingMatch from "../components/Home/UpcomingMatch";
import HomeVideo from "../components/Home/HomeOfficialVedio/HomeVideo";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { language } = useContext(LanguageContext);
  const { siteSettings } = useOutletContext(); // Get settings from MainLayout

  // Log settings for debugging
  console.log("Home received siteSettings:", siteSettings);

  return (
    <div className="bg-bg-SecondaryTwo">
      <ImageSlider />

      <Marquee />

      <HomeTabs language={language} />
      <Referral language={language} />
      <MainTabs />
      <UpcomingMatch language={language} />
      <HomeVideo />
    </div>
  );
};

export default Home;
