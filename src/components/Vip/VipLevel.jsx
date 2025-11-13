import Bg from "../../assets/How_to_Join_DesktopBg.jpg";

const VipLevel = () => {
  return (
    <div className="md:px-6 lg:px-0">

    <div className="lg:hidden mb-4 text-sm font-semibold text-white text-center">
      <h3 className="text-textPrimary pb-2 text-center text-xs">Be a kHELA88 VIP</h3>
      <p className="leading-tight">Khela88 is an online entertainment brand and a leading specialist of cricket exchange platform in Bangladesh.With over 100 games mixed with remarkable sromotions and 24/7 customer support services.</p>
      <br />
      <p className="leading-tight">
      There are multiple deposit payment methods for Bangladesh such as BKASH, ROCKET, NAGAD and many more to come. Be a Khela88 VIP and enjoy generous benefits all time long!
      </p>
    </div>
    <div className="lg:hidden">
      <hr />
    </div>
    <div className="px-4 lg:px-0 pt-2 lg:pt-0">
    
    <div
      className="mx-auto max-w-4xl border border-textPrimary    px-4 flex py-2  gap-6  bg-cover bg-no-repeat bg-center w-full h-auto lg:h-[400px] "
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="text-white text-sm lg:w-[60%]">
        <h3 className="text-lg text-textPrimary">VIP LEVEL UPGRADE</h3>
        <p className="text-textPrimary py-4">How to join?</p>
        <p>
          1. Every member will be starting from the BRONZE tier at the
          beginning. Members are required to fulfil the requirements stated in
          the table above in order to upgrade to a higher tier. For example,
          BRONZE tier members who make total deposit ৳5,000 or more and reach
          ৳50,000 turnover will be automatically upgraded to SILVER tier.
        </p>
        <br />
        <p> 2. Bronze, Silver, Ruby and Gold tier will not be downgraded.</p>
        <br />
        <p>
          3. The rebate given is calculated based on daily turnover multiplied
          by rebate percentage. For example, ৳5,000 turnover x 0.10% rebate in
          slot = ৳5 rebate bonus.
        </p>
      </div>
      
    </div>
      
    </div>
    </div>
  );
};

export default VipLevel;
