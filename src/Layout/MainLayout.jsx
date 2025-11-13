import { useState, useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Contact from "../components/Contact/Contact";
import SmallDeviceModal from "../components/SmallDeviceModal/SmallDeviceModal";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../components/Header/LoginModal/Login";
import ForgetPassword from "../components/Header/LoginModal/ForgetPassword";
import Loader from "../components/Loader/Loader";
import api from "../config/api";
import { applyThemeColors } from "../utils/settings"; // Import theme utility
import useSiteSettingsStore from "../store/siteSettingsStore"; // Import zustand store
import ErrorBoundary from "../components/ErrorBoundary"; // Import ErrorBoundary

const MainLayout = () => {
  const navigation = useNavigation(); // 👈 detect if route is loading
  const [isModal, setIsModal] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false); //login modal
  const [isOpenForgetPassword, setIsOpenForgetPassword] = useState(false); //login modal
  const { siteSettings, setSiteSettings } = useSiteSettingsStore(); // Use zustand store

  // Fetch site settings on app load
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        // First check if settings exist in zustand store
        if (siteSettings) {
          applyThemeColors(siteSettings); // Apply theme colors
        }

        // Then fetch fresh settings from API
        const response = await api.get("/api/theme-config");
        if (response.data.success) {
          const settings = response.data.data;
          setSiteSettings(settings); // Set settings in zustand store
        }
      } catch (error) {
        console.error("Error fetching site settings:", error);
        // Fallback to zustand store if API fails
        if (siteSettings) {
          applyThemeColors(siteSettings); // Apply theme colors
        }
      }
    };

    fetchSiteSettings();
  }, []);

  return (
    <div className="App">
      {/* globalLoader */}
      {navigation.state === "loading" && <Loader />} {/* 👈 show loader */}
      <SmallDeviceModal isModal={isModal} setIsModal={setIsModal} />
      <Header
        isModal={isModal}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
      <main className="bg-bg-Secondary">
        <ErrorBoundary>
          <Outlet
            context={{
              isOpenModal,
              setIsOpenModal,
              siteSettings, // Pass settings to all child components
            }}
          />
        </ErrorBoundary>
      </main>
      <Footer />
      {/* contact */}
      <Contact />
      {/* modals */}
      <Login
        isOpenModal={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        setIsOpenForgetPassword={setIsOpenForgetPassword}
      />
      <ForgetPassword
        setIsOpenModal={setIsOpenModal}
        isOpenForgetPassword={isOpenForgetPassword}
        setIsOpenForgetPassword={setIsOpenForgetPassword}
      />
    </div>
  );
};

export default MainLayout;
