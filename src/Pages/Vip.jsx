import bgImage from "../assets/VIP_big_banner_Desktop.jpg";
import CurrentVip from "../components/Vip/CurrentVip";
import Questions from "../components/Vip/Questions";
import VipBenefits from "../components/Vip/VipBenefits";
import VipLevel from "../components/Vip/VipLevel";

const Vip = () => {
    return (
        <div>
           <img src={bgImage} alt="" />
           <div className="bg-bg-primary bg-opacity-40">
            <div className="mx-auto md:px-6 lg:px-0 lg:max-w-4xl">
            <h3 className="text-textPrimary pb-6 text-lg">Benefits as our VIP</h3>
            </div>
            <CurrentVip/>
            <VipBenefits/>
            <VipLevel/>
            <Questions/>
           </div>
        </div>
    );
};

export default Vip;