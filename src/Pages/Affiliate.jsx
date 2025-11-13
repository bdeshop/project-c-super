import { useContext, useState } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Affiliate = () => {
  const { language } = useContext(LanguageContext);
  const [step, setStep] = useState(1); // <-- Step state added

  const [formData, setFormData] = useState({
    username: "",
    realName: "",
    date: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const translations = {
    en: {
      title: "Affiliate Register",
      username: "Agent Id",
      password: "Password",
      confirmPassword: "Confirm Password",
      placeholder: "Enter here",
      submit: "Next",
      name: "Real Name (must be same with NID) *",
      phoneNumber: "Phone Number",
      countryCode: "Country Code",
      email: "Email",
      verificationCode: "Verification Code",
      referralCode: "Referral Code (optional)",
      legal: "I am of legal age and agree to the",
      terms: "Terms & Conditions",
      back: "Back",
      finalSubmit: "JOIN NOw",
    },
    bn: {
      title: "Affiliate Register",
      username: "এজেন্ট আইডি",
      password: "গোপন নম্বর",
      confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
      placeholder: "এখানে পূরণ করুন",
      submit: "পরবর্তী",
      name: "এজেন্ট আইডি",
      phoneNumber: "ফোন নম্বর",
      countryCode: "কান্ট্রি কোড",
      email: "ইমেইল",
      verificationCode: "যাচাইকরণ কোড",
      referralCode: "রেফারেল কোড (ঐচ্ছিক)",
      legal: "আমি বৈধ বয়সের এবং সম্মত আছি",
      terms: "শর্তাবলী ও নিয়মাবলি",
      back: "পেছনে ",
      finalSubmit: "সম্পূর্ণ",
    },
  };

  const t = translations[language] || translations.bn;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // Move to next step
    } else {
      console.log("Final Form Data:", formData);
    }
  };
  window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="py-5  mx-auto lg:max-w-2xl bg-white text-black">
      <div className="flex flex-col lg:flex-row gap-4  p-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl  space-y-6">
          <div>
            <h3 className="text-black text-lg font-semibold flex text-center justify-center  ">
              {t.title}
            </h3>
          </div>
          <div className="text-black pt-8 cursor-pointer  flex items-center justify-center">
                <h3 className="underline ">
                  {language === "en"
                    ? "HOW To Affiliate?"
                    : "কিভাবে অ্যাফিলিয়েট নিবন্ধন করবেন"}
                </h3>
              </div>

          {/* Step 1 */}
          {step === 1 && (
            <>
              
              <div>
                <h3>{t.username}</h3>
                <input
                  type="text"
                  name="username"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.realName}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <h3>{t.password}</h3>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-x-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-textPrimary text-2xl" />
                  ) : (
                    <FaEye className="text-textPrimary text-2xl" />
                  )}
                </div>
              </div>

              <div className="relative">
                <h3>{t.confirmPassword}</h3>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-x-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-textPrimary text-2xl" />
                  ) : (
                    <FaEye className="text-textPrimary text-2xl" />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div>
                <h3>আসল নাম (NID এর সাথে একই হতে হবে) </h3>
                <input
                  type="text"
                  name="username"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <h3>NID </h3>
                <input
                  type="text"
                  name="username"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3>date of birth</h3>
                <input
                  type="date"
                  name="username"
                  placeholder={t.placeholder}
                  className="w-full p-2 border text-black border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div>
                <h3>{t.email}</h3>
                <input
                  type="email"
                  name="email"
                  placeholder={t.placeholder}
                  className="w-full p-2 text-black border border-gray-400 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <h3>phone Number</h3>
                <input
                  type="text"
                  name="number"
                  placeholder={t.placeholder}
                  className="w-full p-2 text-black border border-gray-400 rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <h3>পেআউট ওয়ালেট</h3>
                <select
                  name="currency"
                  className="w-full p-2 text-black border border-gray-400 rounded-md"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="BDT">Bkash</option>
                  <option value="USD">Nagad</option>
                  <option value="INR">Rocket</option>
                </select>
              </div>
              <div>
                <h3>ওয়ালেট নম্বর (BKASH, NAGAD, ROCKET)</h3>
                <input
                  type="text"
                  name="number"
                  placeholder={t.placeholder}
                  className="w-full p-2 text-black border border-gray-400 rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="flex  text-sm items-center space-x-2">
                <input
                  type="checkbox"
                  name=""
                  checked={formData.agreed}
                  onChange={handleChange}
                  className=""
                />

                <label>
                  {t.legal}{" "}
                  <Link
                    className="text-black  whitespace-nowrap   font-semibold underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.terms}
                  </Link>
                </label>
              </div>
            </>
          )}

          {/* buttons */}

          <div className="flex flex-col justify-between gap-6 text-sm items-center">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-bg-Secondary w-full text-white px-4 py-2 rounded-md"
              >
                {t.back}
              </button>
            )}
            <div className="w-full">
              <button
                type="submit"
                className="bg-common-orange w-full text-white px-6 py-2 rounded-md ml-auto"
              >
                {step === 1 ? t.submit : t.finalSubmit}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Affiliate;
