import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LanguageContext } from "../Context/LanguageContext";

const PasswordChange = () => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const isBengali = language === "bn"; // বাংলা হলে সত্য

  const passwordData = [
    { id: 1, label: isBengali ? "বর্তমান গোপন নম্বর" : "Current Password" },
    { id: 2, label: isBengali ? "গোপন নম্বর" : "New Password" },
    {
      id: 3,
      label: isBengali
        ? "নিশ্চিত করুন নতুন গোপন নম্বর"
        : "Confirm New Password",
    },
  ];

  const [passwords, setPasswords] = useState(
    passwordData.reduce((acc, item) => ({ ...acc, [item.id]: "" }), {})
  );

  const [showPasswords, setShowPasswords] = useState({
    1: false,
    2: false,
    3: false,
  });

  const handlePasswordChange = (id, value) => {
    setPasswords((prev) => ({ ...prev, [id]: value }));
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    // Validate passwords
    if (!passwords[1] || !passwords[2] || !passwords[3]) {
      alert(isBengali ? "সব ক্ষেত্র পূরণ করুন" : "Please fill all fields");
      return;
    }

    if (passwords[2] !== passwords[3]) {
      alert(
        isBengali ? "নতুন পাসওয়ার্ড মিলছে না" : "New passwords do not match"
      );
      return;
    }

    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert(isBengali ? "লগইন করুন" : "Please login");
        navigate("/");
        return;
      }

      // Make API request to change password
      const response = await axios.put(
        "http://localhost:8000/api/users/change-password",
        {
          currentPassword: passwords[1],
          newPassword: passwords[2],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Password Change Response:", response.data);

      if (response.data.success) {
        alert(
          isBengali
            ? "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে"
            : "Password changed successfully!"
        );
        // Clear the form
        setPasswords({ 1: "", 2: "", 3: "" });
      }
    } catch (error) {
      console.error("Error changing password:", error);

      // Handle authentication errors
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        alert(isBengali ? "লগইন করুন" : "Please login");
        navigate("/");
      } else if (error.response && error.response.status === 400) {
        alert(
          isBengali ? "বর্তমান পাসওয়ার্ড ভুল" : "Current password is incorrect"
        );
      } else {
        alert(
          isBengali
            ? "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে"
            : "Failed to change password. Please try again."
        );
      }
    }
  };

  return (
    <div className="bg-black py-4 min-h-screen">
      <div className="mx-auto px-2 lg:px-0 lg:m-5 max-w-5xl md:max-w-5xl lg:max-w-7xl">
        <div className="bg-informationBackground rounded-lg">
          {passwordData.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-row lg:grid lg:grid-cols-3 lg:justify-items-center items-center md:justify-around p-6 px-3 lg:px-20 md:px-6 lg:gap-x-20 lg:p-6 gap-4 md:gap-4 justify-between lg:justify-between ${
                index !== passwordData.length - 1
                  ? "border-b border-gray-600"
                  : ""
              }`}
            >
              <h3 className="lg:text-md text-sm lg:w-auto w-1/3 text-left lg:text-right text-white font-medium">
                {item.label}
              </h3>

              <input
                type={showPasswords[item.id] ? "text" : "password"}
                placeholder={
                  isBengali
                    ? "এখানে পাসওয়ার্ড পূরণ করুন"
                    : "Enter your password"
                }
                className="bg-transparent outline-none text-gray-700 placeholder-gray-500 flex-1 lg:flex-none lg:w-full border-b border-gray-600 pb-1 focus:border-common-blue transition-colors"
                value={passwords[item.id]}
                onChange={(e) => handlePasswordChange(item.id, e.target.value)}
              />

              {showPasswords[item.id] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => togglePasswordVisibility(item.id)}
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 cursor-pointer hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => togglePasswordVisibility(item.id)}
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[300px] lg:max-w-4xl mt-6 px-2 lg:px-0">
        <button
          onClick={handleSubmit}
          className="w-full p-3 text-white font-semibold justify-items-center bg-common-blue rounded-lg hover:bg-opacity-90 transition-all"
        >
          {isBengali ? "জমা দিন" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default PasswordChange;
