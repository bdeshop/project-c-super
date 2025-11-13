import RewardBenefits from "../components/Rewards/RewardBenefits";
import RewardsDeferrent from "../components/Rewards/RewardsDeferrent";
import RewardVoucher from "../components/Rewards/RewardVoucher";


const Reward = () => {
    return (
        <div>
            <RewardVoucher/>
            <RewardBenefits/>
            <RewardsDeferrent/>
        </div>
    );
};

export default Reward;