import Login from "../Header/LoginModal/Login";
import { Link } from "react-router-dom";

const JayaLoginRegister = ({ isOpenModal, setIsOpenModal, language }) => {

  
  
  return (
    <div className="px-4 pt-16 sm:px-8 md:px-16 lg:px-52  w-full flex flex-col gap-6 text-white">
      <div className="flex  py-8 rounded-xl text-white space-y-6 flex-col justify-center bg-jaya-bg-color bg-opacity-50 items-center">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-sans font-bold text-center">
            Join or Login now to get this benefit today!
          </h3>
        </div>
        <div className="px-5 flex  lg:gap-40 gap-4 justify-center w-full">
          <Link to="/nibondon">
            <button className="bg-common-orange px-8 py-2 rounded-md w-full ">
              {language === "bn" ? "নিবন্ধন" : "Join"}
            </button>
          </Link>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsOpenModal(true)}
              className="border border-white px-6 py-1 hover:border-textPrimary whitespace-nowrap outline-none rounded-sm text-white"
            >
              {language === "bn" ? "প্রবেশ করুন" : "Login"}
            </button>

            <Login
              isOpenModal={isOpenModal}
              handleClose={() => setIsOpenModal(false)}
            />
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default JayaLoginRegister;
