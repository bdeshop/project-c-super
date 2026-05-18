import Bg from "../../assets/How_to_Join_DesktopBg.jpg";

const VipLevel = ({ upgradeDescription }) => {
  const fallbackTitle = "VIP LEVEL UPGRADE";
  const fallbackSubtitle = "How to join?";
  const fallbackPoints = [
    "Every member will be starting from the BRONZE tier at the beginning. Members are required to fulfil the requirements stated in the table above in order to upgrade to a higher tier. For example, BRONZE tier members who make total deposit ৳5,000 or more and reach ৳50,000 turnover will be automatically upgraded to SILVER tier.",
    "Bronze, Silver, Ruby and Gold tier will not be downgraded.",
    "The rebate given is calculated based on daily turnover multiplied by rebate percentage. For example, ৳5,000 turnover x 0.10% rebate in slot = ৳5 rebate bonus."
  ];

  const title = upgradeDescription?.title || fallbackTitle;
  const subtitle = upgradeDescription?.subtitle || fallbackSubtitle;
  const points = upgradeDescription?.points && upgradeDescription.points.length > 0
    ? upgradeDescription.points
    : fallbackPoints;

  return (
    <div className="md:px-6 lg:px-0">
      {/* Mobile Branding Text */}
      <div className="lg:hidden mb-6 px-4 text-sm font-semibold text-white text-center">
        <h3 className="text-textPrimary pb-2 text-center text-xs font-bold uppercase tracking-wider">Be a KHELA88 VIP</h3>
        <p className="leading-relaxed text-slate-300">
          Khela88 is an online entertainment brand and a leading specialist of cricket exchange platform in Bangladesh.
          With over 100 games mixed with remarkable promotions and 24/7 customer support services.
        </p>
        <p className="leading-relaxed text-slate-300 mt-2">
          There are multiple deposit payment methods for Bangladesh such as BKASH, ROCKET, NAGAD and many more to come. 
          Be a Khela88 VIP and enjoy generous benefits all time long!
        </p>
      </div>
      
      <div className="lg:hidden px-4">
        <hr className="border-slate-800" />
      </div>

      {/* Upgrade Guide Section */}
      <div className="px-4 lg:px-0 pt-6 lg:pt-0">
        <div
          className="mx-auto max-w-4xl border border-textPrimary rounded-2xl px-6 py-6 lg:px-8 flex flex-col justify-center bg-cover bg-no-repeat bg-center w-full min-h-[300px] lg:h-[350px] shadow-xl"
          style={{ backgroundImage: `url(${Bg})` }}
        >
          <div className="text-white text-sm lg:w-[70%] space-y-4">
            <h3 className="text-xl text-textPrimary font-extrabold tracking-wide uppercase">{title}</h3>
            <p className="text-textPrimary text-sm font-bold tracking-wide uppercase">{subtitle}</p>
            
            <div className="space-y-3.5 text-xs lg:text-sm leading-relaxed text-slate-200">
              {points.map((pt, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="text-textPrimary font-extrabold mt-0.5">{index + 1}.</span>
                  <p className="flex-1">{pt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipLevel;
