import { useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext";

const Report = () => {
  const { language } = useContext(LanguageContext);

  const text = {
    memberId: language === "bn" ? "মেম্বার আইডি" : "Member ID",
    memberCode: language === "bn" ? "মেম্বার কোড" : "Member Code",
    registerDate: language === "bn" ? "রেজিস্টার তারিখ" : "Register Date",
    firstDepositDate: language === "bn" ? "প্রথম জমার তারিখ" : "First Deposit Date",
    lastDepositDate: language === "bn" ? "সর্বশেষ জমার তারিখ" : "Last Deposit Date",
    level: language === "bn" ? "লেভেল" : "Level",
    noData: language === "bn" ? "তথ্য নেই" : "No data available",
  };

  return (
    <div className="my-4 bg-bg-primary p-4 lg:overflow-hidden md:overflow-x-auto overflow-x-auto">
      <table className="min-w-[800px] whitespace-nowrap w-full text-white border border-white text-left">
        <thead className="bg-white text-black">
          <tr>
            <th className="px-4 py-2 border">{text.memberId}</th>
            <th className="px-4 py-2 border">{text.memberCode}</th>
            <th className="px-4 py-2 border">{text.registerDate}</th>
            <th className="px-4 py-2 border">{text.firstDepositDate}</th>
            <th className="px-4 py-2 border">{text.lastDepositDate}</th>
            <th className="px-4 py-2 border">{text.level}</th>
            <th className="px-4 py-2 border">
              <input
                type="datetime-local"
                className="bg-white text-black px-2 py-1 rounded-md w-full"
              />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-black">
          <tr>
            <td colSpan="7" className="text-center py-4 border">
              {text.noData}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Report;
