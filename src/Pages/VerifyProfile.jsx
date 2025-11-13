import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import memberLogo from "../assets/memberpic.svg";
import MemberInfo from "../components/VerifyProfile/MemberInfo";
import MemberInfoDetails from "../components/VerifyProfile/MemberInfoDetails";
import { LanguageContext } from "../Context/LanguageContext";

const VerifyProfile = () => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddNumberOpen, setIsAddNumberOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(memberLogo);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [memberInfo, setMemberInfo] = useState({
    username: "",
    email: "",
    dob: "",
    mobile: "",
    currency: "",
    fullname: "",
  });
  const [formData, setFormData] = useState(memberInfo);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setProfileImageFile(file);

      // Immediately upload the image
      await uploadProfileImage(file);
    }
  };

  const uploadProfileImage = async (file) => {
    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found");
        navigate("/");
        return;
      }

      // Create FormData object with only the image
      const formDataToSend = new FormData();
      formDataToSend.append("profileImage", file);

      // Make PUT request to update profile image
      const response = await axios.put(
        `http://localhost:8000/api/users/profile/${userId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image Upload Response:", response.data);

      if (response.data.success) {
        alert("Profile image updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      // Handle authentication errors
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/");
      } else {
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(generateOtp());

  const handleChangeOtp = (e) => {
    setOtp(e.target.value);
  };

  const handleReload = () => {
    setGeneratedOtp(generateOtp());
    setOtp("");
  };

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the auth token from localStorage
        const token = localStorage.getItem("authToken");

        // Make sure token exists
        if (!token) {
          console.error("No auth token found");
          navigate("/");
          return;
        }

        // Make API request with Authorization header
        const response = await axios.get(
          "http://localhost:8000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        // Extract user data from API response
        if (response.data.success && response.data.data.user) {
          const userData = response.data.data.user;

          // Store user ID for updates
          setUserId(userData.id);

          const profileData = {
            username: userData.username || "",
            email: userData.email || "",
            dob: userData.birthday || "",
            mobile: userData.phoneNumber || "",
            currency: userData.currency || "",
            fullname: userData.name || "",
          };

          setMemberInfo(profileData);
          setFormData(profileData);

          // Set profile image if available
          if (userData.profileImage) {
            setProfileImage(userData.profileImage);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Redirect to login on authentication error
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the auth token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found");
        navigate("/");
        return;
      }

      // Create FormData object (without image since it's uploaded separately)
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("phoneNumber", formData.mobile);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("birthday", formData.dob);
      formDataToSend.append("currency", formData.currency);

      // Make PUT request to update profile
      const response = await axios.put(
        `http://localhost:8000/api/users/profile/${userId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update Response:", response.data);

      // Update local state with the response data
      if (response.data.success) {
        setMemberInfo(formData);
        setIsEditOpen(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      // Handle authentication errors
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl pb-5 lg:max-w-3xl px-4 lg:px-0 min-h-screen pt-12 relative">
      <MemberInfo
        language={language}
        profileImage={profileImage}
        handleImageChange={handleImageChange}
      />

      <div>
        <MemberInfoDetails
          language={language}
          memberInfo={memberInfo}
          setIsEditOpen={setIsEditOpen}
          isOtpOpen={isOtpOpen}
          setIsOtpOpen={setIsOtpOpen}
          setIsAddNumberOpen={setIsAddNumberOpen}
          isEditOpen={isEditOpen}
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          isAddNumberOpen={isAddNumberOpen}
          otp={otp}
          handleChangeOtp={handleChangeOtp}
          handleReload={handleReload}
          generatedOtp={generatedOtp}
        />
      </div>
    </div>
  );
};

export default VerifyProfile;
