import wheelImage from "../../assets/wheel.png";

const Benefits = () => {
  return (
    <div className="w-full mx-auto max-w-xl bg-[linear-gradient(180deg,_#5d5d5d,_#1d1d1d)] p-4 lg:p-6 text-white">
      <div>
        <h2 className="text-lg font-semibold py-2">Extra Benefits</h2>
        <div className="w-full bg-white rounded-md p-4 flex justify-between items-center">
          <img src={wheelImage} alt="" />
          <div className="flex text-white gap-2 flex-col items-center">
            <p className="text-textPrimary font-bold">kspin</p>
            <button className="px-6 py-1 whitespace-nowrap rounded-md bg-common-orange">Spin Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
