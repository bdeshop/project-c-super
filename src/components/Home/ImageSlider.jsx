import { useEffect, useState } from "react";
import api from "../../config/api";
import { useOutletContext } from "react-router-dom"; // To access siteSettings from context

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { siteSettings } = useOutletContext(); // Get site settings from MainLayout

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await api.get("/api/sliders");
        // Filter only active sliders
        const activeSliders = response.data.data.filter(
          (slider) => slider.status === "active"
        );
        setSliders(activeSliders);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  useEffect(() => {
    if (sliders.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [sliders.length]);

  // Log site settings for debugging
  useEffect(() => {
    console.log("ImageSlider received siteSettings:", siteSettings);
  }, [siteSettings]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-full h-32 lg:h-64 bg-gray-200 flex items-center justify-center">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (sliders.length === 0) {
    return (
      <div className="w-full">
        <div className="w-full h-32 lg:h-64 bg-gray-200 flex items-center justify-center">
          <span>No images available</span>
        </div>
      </div>
    );
  }
  console.log("ImageSlider", sliders);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src={`https://plus.unsplash.com/premium_photo-1674641194949-e154719cdc02?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          // alt={sliders[currentIndex]?.title || "Slider image"}
          className="w-full h-32 lg:h-64 object-cover slider-image"
        />

        {/* Dots indicator */}
        {sliders.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${
                  currentIndex === index ? "bg-orange-500" : "bg-white"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
