import Jayalogo from "../../assets/logo3.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-36 h-36 border-2 rounded-full border-common-blue animate-pulse bg-black flex justify-center items-center ">
        <img src={Jayalogo} alt="" className="w-[80%]" />
      </div>
    </div>
  );
};

export default Loader;
