import { useState, useEffect } from "react";
import api from "../config/api";
import bgImage from "../assets/VIP_big_banner_Desktop.jpg";
import CurrentVip from "../components/Vip/CurrentVip";
import Questions from "../components/Vip/Questions";
import VipBenefits from "../components/Vip/VipBenefits";
import VipLevel from "../components/Vip/VipLevel";

const Vip = () => {
    const [vipSettings, setVipSettings] = useState(null);

    useEffect(() => {
        const fetchVipSettings = async () => {
            try {
                const response = await api.get("/vip-settings");
                if (response.data) {
                    setVipSettings(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch VIP settings from database:", error);
            }
        };
        fetchVipSettings();
    }, []);

    return (
        <div>
           <img src={bgImage} alt="VIP Banner" className="w-full h-auto" />
           <div className="bg-bg-primary bg-opacity-40">
                <div className="mx-auto md:px-6 lg:px-0 lg:max-w-4xl pt-6">
                    <h3 className="text-textPrimary pb-4 px-2 lg:px-0 text-lg font-bold">Benefits as our VIP</h3>
                </div>
                <CurrentVip levels={vipSettings?.levels} />
                <VipBenefits levels={vipSettings?.levels} />
                <VipLevel upgradeDescription={vipSettings?.upgradeDescription} />
                <Questions 
                    faqs={vipSettings?.faqs} 
                    termsAndConditions={vipSettings?.termsAndConditions} 
                />
           </div>
        </div>
    );
};

export default Vip;