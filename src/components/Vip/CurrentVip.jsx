import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import vipCardImage from "../../assets/vipcard_asset.png";
import Image1 from "../../assets/bronze.png";
import Image2 from "../../assets/silver.png";
import Image3 from "../../assets/ruby.png";
import Image4 from "../../assets/gold.png";
import Image5 from "../../assets/diamond.png";
import Image6 from "../../assets/sapphire.png";
import Image7 from "../../assets/platinum.png";
import ImageA from "../../assets/bronze_vip.png";
import ImageB from "../../assets/silver_vip.png";
import ImageC from "../../assets/ruby_vip.png";
import ImageD from "../../assets/gold_vip.png";
import ImageE from "../../assets/diamond_vip.png";
import ImageF from "../../assets/sapphire_vip.png";
import ImageG from "../../assets/platinum_vip.png";
import { useState } from "react";

const CurrentVip = () => {

  const [currentIndex,setCurrentIndex]= useState(0);
  
  const items = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];
  const privilegesImage = [
    
    {image:ImageA,name:"Level 1  Bronze"},
    {image:ImageB,name:"Level 2  Silver"},
    {image:ImageC,name:"Level 3  Ruby"},
    {image:ImageD,name:"Level 4  Gold"},
    {image:ImageE,name:"Level 5  Diamond"},
    {image:ImageF,name:"Level 6  Sapphire"},
    {image:ImageG,name:"Level 7  Platinum"}
  ];
  const handelPrev = ()=>{
    setCurrentIndex((prevIndex)=>(prevIndex-1 + privilegesImage.length) % privilegesImage.length )
  }
  const handelNext = () => {

    setCurrentIndex((prevIndex)=>(prevIndex + 1) % privilegesImage.length)
  }

  return (
    <div className="mx-auto max-w-4xl md:px-6 lg:px-0 ">
      {/* current status */}
      <div className="flex gap-4">
        <img src={vipCardImage} alt="" className="w-[30%] hidden lg:block " />
        <div className="text-white px-2 lg:px-0 lg:w-[80%] h-10 ">
          <h3 className="pb-4">Current status</h3>
          <p className="w-full h-[10px] bg-common-orange rounded-full"></p>
          <div className="flex gap-2">
            {items.map((image, index) => (
              <div key={index} className="flex flex-col items-center ">
                <p>|</p>
                <img src={image} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
      <hr />
      </div>
     

      {/* VIP PRIVILEGES */}
      <div className="py-4  mt-20 px-2 lg:px-0 flex gap-8 items-center  lg:gap-40  text-white">
        <div className="">
         
        <h3 className="whitespace-nowrap text-xs lg:text-base text-textPrimary ">VIP PRIVILEGES</h3>
        <p className="lg:hidden text-sm py-4 md:whitespace-nowrap font-semibold ">{privilegesImage[currentIndex].name.toUpperCase()}</p>
         
        </div>
        <div className="lg:flex hidden gap-2 ">
          {privilegesImage.map((image, index) => (
            <div key={index}>
               <img src={image.image} alt="" /> 
                </div>
          ))}
        </div>
        <div className="lg:hidden md:mt-16">
          <div className="flex  items-center gap-2">

          
        <FaChevronLeft onClick={handelPrev} className="cursor-pointer"/>
          <img src={privilegesImage[currentIndex].image} alt="" className="w-[60%] md:w-[50%]" />
          </div>
          
           
          <FaChevronRight onClick={handelNext}/>
           
          
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default CurrentVip;
