import bronzeImage from "../../assets/bronze_vip.png";
import bgBronze from "../../assets/bg_bronze.jpg";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const VipLevel = () => {
  return (
    <div
      className="text-white w-full bg-cover bg-no-repeat bg-center   "
      style={{ backgroundImage: `url(${bgBronze})` }}
    >
      <div className="flex justify-between w-full p-2">
        <div className="w-2/3">
          <h3 className="font-semibold">VIP LEVEL : BRONZE</h3>
          <p className="h-[10px] my-3 w-full rounded-full bg-bg-primary "></p>
          <p>Upgrade to silver level</p>
          <p>Deposit Required : ৳ 10,000</p>
          <p>Turnover Required : ৳ 1,00,000</p>
        </div>
        <div className="w-[25%]">
          <img src={bronzeImage} alt="" className="w-full" />
        </div>
      </div>
      <Link to="/vip">
        <div
          className="w-full p-2 flex justify-between items-center"
          style={{ backgroundColor: ` hsla(0, 0%, 94.1%, .5)` }}
        >
          <p>View Tier Benefits</p>
          <FaAngleRight />
        </div>
      </Link>
    </div>
  );
};

export default VipLevel;
