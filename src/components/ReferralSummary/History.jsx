import { useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext";

const History = () => {
  const { language } = useContext(LanguageContext);

  const text = {
    date: language === "bn" ? "তারিখ" : "Date",
    memberCode: language === "bn" ? "মেম্বার কোড" : "Member Code",
    commission: language === "bn" ? "কমিশন" : "Commission",
    status: language === "bn" ? "স্ট্যাটাস" : "Status",
    noData: language === "bn" ? "তথ্য নেই" : "No data available",
  };

  return (
    <div className="my-4 bg-bg-primary p-4 lg:overflow-hidden md:overflow-x-auto overflow-x-auto">
      <table className="w-full min-w-[800px] whitespace-nowrap text-white border border-white text-left">
        <thead className="bg-white text-black">
          <tr>
            <th className="px-4 py-2 border">{text.date}</th>
            <th className="px-4 py-2 border">{text.memberCode}</th>
            <th className="px-4 py-2 border">{text.commission}</th>
            <th className="px-4 py-2 border">{text.status}</th>
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
            <td colSpan="5" className="text-center py-4 border">
              {text.noData}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default History;
