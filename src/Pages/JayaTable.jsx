import { useContext } from "react";
import bgimage from "../assets/jayabg.jpeg";
import JayaLoginRegister from "../components/JayaTable/JayaLoginRegister";
import { LanguageContext } from "../Context/LanguageContext";
import { useOutletContext } from "react-router-dom";
import Reward from "../components/JayaTable/Reward";

const Jayatable = () => {
  const { language } = useContext(LanguageContext);
  const {isOpenModal, setIsOpenModal} = useOutletContext();

  
  return (
    <div
      style={{ backgroundImage: `url(${bgimage})` }}
      className="bg-cover bg-center"
    >
      {/* jayaLoginRegister */}
      <JayaLoginRegister 
      language={language}
       isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal} 
        />

      {/* rewardSection */}
      <Reward/>
    </div>
  );
};

export default Jayatable;
