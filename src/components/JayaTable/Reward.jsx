import K88Image from "../../assets/K88Image.png";
import coinImage from "../../assets/coinicon.png";

const Reward = () => {
  const itemData = [
    { id: 1, coinAmount: "Free", price: "৳8", total: "৳350" },
    { id: 2, coinAmount: "Free", price: "৳16", total: "৳700" },
    { id: 3, coinAmount: "Free", price: "৳24", total: "৳1050" },
    { id: 4, coinAmount: "Free", price: "৳32", total: "৳1400" },
    { id: 5, coinAmount: "Free", price: "৳40", total: "৳1750" },
    { id: 6, coinAmount: "Free", price: "৳48", total: "৳2100" },
    { id: 7, coinAmount: "Free", price: "৳56", total: "৳2450" },
    { id: 8, coinAmount: "Free", price: "৳64", total: "৳2800" },
    { id: 9, coinAmount: "Free", price: "৳72", total: "৳3150" },
    { id: 10, coinAmount: "Free", price: "৳80", total: "৳3500" },
  ];

  return (
    <div className="px-4 pt-16 sm:px-8 md:px-16 lg:px-52  w-full  text-white flex flex-col gap-6">
      <div className="flex justify-around items-center px-2 lg:px-0 py-2 bg-jaya-bg-color bg-opacity-50 rounded-md mb-2">
        {["Level", "Reward", "Requirements"].map((item, index) => (
          <p
            key={index}
            className="flex-1 text-center font-semibold text-white"
          >
            {item}
          </p>
        ))}
      </div>

      <div className="overflow-y-auto h-screen pr-2 flex flex-col  gap-6">
        {itemData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-3 justify-items-center items-center py-2 bg-jaya-bg-color bg-opacity-50  rounded-md mb-2"
          >
            <div className=" w-[60%]  lg:w-[15%]">
              <div className="relative w-full">
                <div className="flex justify-center mx-auto items-center">
                 
                <img src={K88Image} alt="" className="w-full" />
                   
                </div>
                <p className="absolute inset-0 text-xs flex items-center justify-center text-white font-bold">
                  {item.id}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <img src={coinImage} alt="" className="w-[20%]" />
              <p>{item.coinAmount}</p>
              <p>{item.price}</p>
            </div>

            <p>{item.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reward;
