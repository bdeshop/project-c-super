import coinsImage from "../../assets/coins.png";
import checkImage from "../../assets/checkin_icon.png";

const Rewards = () => {
  return (
    <div className="w-full mx-auto max-w-xl p-2  lg:p-6 text-white">
      {/* firstPart */}
      <div>
        <h2 className="text-lg font-semibold py-2">Extra Rewards</h2>
        <div className="w-full bg-white rounded-md p-4 flex justify-between items-center">
          <img src={coinsImage} alt="" />
          <div className="flex text-white gap-2 flex-col items-center">
            <p className="text-textPrimary font-bold">Deposit & Free Coin</p>
            <button className="px-6 py-1 whitespace-nowrap rounded-md bg-common-orange">
              Claim Now
            </button>
          </div>
        </div>
      </div>
      {/* second Part */}
      <div className="py-4">
        <div className="w-full bg-white rounded-md p-1 lg:p-4 flex justify-between items-center">
          <img src={checkImage} alt="" />
          <div className="flex text-white gap-2 flex-col items-center">
            <p className="text-textPrimary font-bold">Daily Check-In</p>
            <button className="px-6 py-1 rounded-md bg-common-orange whitespace-nowrap">
              Check In Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
