import voucherImage from "../../assets/voucher.jpg";
import rewardImage from "../../assets/coinicon.png";
import LineImage from "../../assets/Purple_line.png";

const RewardVoucher = () => {
  return (
    <div className="w-full mx-auto max-w-xl text-textPrimary rounded-md p-4">
      <h2 className="text-xl font-semibold pb-4">Daily Check In</h2>
      <div
        className="  bg-cover bg-center rounded-2xl bg-no-repeat"
        style={{ backgroundImage: `url(${voucherImage})` }}
      >
        <div className="flex items-center p-8">
          <img src={rewardImage} alt="" className="w-[10%]" />
          <p>0</p>
        </div>
        <div className="py-10">
         
        <div
          className="flex justify-center py-4 bg-cover bg-center rounded-2xl bg-no-repeat   pt-8"
          style={{ backgroundImage: `url(${LineImage})` }}
        >
          <button className="text-white w-[70%] py-1 bg-common-orange text-center rounded-md">
            Check In Today
          </button>
        </div>
           
        </div>
      </div>
    </div>
  );
};

export default RewardVoucher;
