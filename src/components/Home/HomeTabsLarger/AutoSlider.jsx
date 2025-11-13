import { useEffect, useRef } from "react";
import cashIcon from "../../../assets/cashIcon.svg"; // Import korbo jodi same icon use kori

const AutoSlider = ({ items }) => {
  const containerRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 1;
        if (
          containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full pb-2  overflow-x-auto flex gap-4 scrollbar-hide"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-bg-primary  lg:w-[15%] p-2 rounded-lg flex-shrink-0"
        >
          <img src={item.img} alt={`img-${index}`} className="w-full h-32 object-cover rounded" />
          <div className="flex flex-col items-center gap-1 mt-2 text-white">
            <h3 className="font-semibold">{item.title}</h3>
            <p>{item.user}</p>
            <p className="text-[#0ABAB4]">{item.datetime}</p>
            <div className="flex gap-1 items-center">
              <img src={cashIcon} alt="cash" className="w-4 h-4" />
              <p>{item.amount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AutoSlider;
