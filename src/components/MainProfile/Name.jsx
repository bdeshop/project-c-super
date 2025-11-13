
import levelImage from "../../assets/level-container.png"

const Name = () => {
    return (
        <div
          className="flex justify-between  items-center bg-common-orange gap-4 p-4 min-h-[200px]  md:min-h-[200px] lg:min-h-[180px]"
          
        >

          <div className="flex items-center gap-4">
          
          <div className="w-16 h-16 bg-black text-textPrimary flex items-center justify-center text-3xl font-bold rounded-full">
            R
          </div>
          {/* Full Name */}
          <span className="text-white text-xl font-semibold">Rohan</span>
            
          </div>

          <div className="text-white">
            <h3 className="text-xs lg:text-base">Khela k88 pass level</h3>
            <div className="w-24 relative">
             
            <img src={levelImage} alt="" />
             <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-xs text-black ">Level 1</p>
            </div>
          </div>
        </div>
    );
};

export default Name;