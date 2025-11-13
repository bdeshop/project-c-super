import voucherImage from "../../assets/voucher.jpg";
import LineImage from "../../assets/Purple_line.png";

const ClaimVoucher = () => {
  return (
    <div className="w-full mx-auto max-w-xl text-textPrimary rounded-md p-4">
      <h2 className="text-xl font-semibold pb-4">Claim Voucher</h2>
      <div
        className="  bg-cover bg-center rounded-2xl bg-no-repeat"
        style={{ backgroundImage: `url(${voucherImage})` }}
      >
        <div className="p-2 flex flex-col gap-2 px-4">
          <p className="font-bold">Apply Voucher</p>
          <input
            type="text"
            name=""
            placeholder="Voucher Code"
            id=""
            className="w-full p-1 px-2 rounded-md placeholder:"
          />
        </div>
        <div
          className="flex justify-center py-4 bg-cover bg-center rounded-2xl bg-no-repeat mt-8   pt-8"
          style={{ backgroundImage: `url(${LineImage})` }}
        >
          <button className="text-white w-[70%] py-1 bg-common-orange text-center rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimVoucher;
