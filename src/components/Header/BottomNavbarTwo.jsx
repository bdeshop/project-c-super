
import { Link } from "react-router-dom";
import Bdlogo from "../../assets/BDTHeader.svg";
import BDTModal from "../BDTModal/BDTModal";
import ProbesKorun from "./LoginModal/Login";

const BottomNavbarTwo = ({toggleOpenLanguage,isOpenModal,setIsOpenModal,isOpenLanguage,toggleCloseLanguage}) => {
    return (
        <div>
           <div className="fixed  bottom-0 flex lg:hidden left-0 w-full bg-black text-white">
          <span className="font-semibold bg-gray-200 flex items-center justify-center w-1/3 py-2 gap-1 cursor-pointer">
            <img src={Bdlogo} alt="" className="h-6" />
            <span
              className="text-black text-center text-sm
            "
              onClick={toggleOpenLanguage}
            >
              English <br /> Bengali
            </span>
          </span>

          <button
            onClick={() => setIsOpenModal(true)}
            className="border bg-[#007874] outline-none w-1/3 py-2"
          >
            প্রবেশ করুন
          </button>

          <Link
            to="/nibondon"
            className="bg-common-orange w-1/3 py-2 flex items-center justify-center text-white"
          >
            নিবন্ধন
          </Link>
        </div> 


         <BDTModal
          isOpenLanguage={isOpenLanguage}
          toggleCloseLanguage={toggleCloseLanguage}
        />

        <ProbesKorun
          isOpenModal={isOpenModal}
          handleClose={() => setIsOpenModal(false)}
        /> 
        </div>
    );
};

export default BottomNavbarTwo;