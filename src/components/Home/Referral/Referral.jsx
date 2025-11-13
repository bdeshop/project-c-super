import ReferralBanner from "./ReferralBanner";

const Referral = ({ language }) => {
    return (
        <div className="w-full md:px-0 px-4 mx-auto text-white max-w-[370px] md:max-w-[750px]    lg:max-w-6xl">
            <ReferralBanner language={language}/>
        </div>
    );
};

export default Referral;