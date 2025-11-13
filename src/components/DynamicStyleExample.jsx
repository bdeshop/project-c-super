import { useOutletContext } from "react-router-dom";

/**
 * Example component showing how to use dynamic styling from siteSettings
 * This can be used as a reference for updating other components
 */
const DynamicStyleExample = () => {
  const { siteSettings } = useOutletContext() || {};

  // Extract dynamic styles
  const headerBgColor = siteSettings?.header?.bgColor || "#001";
  const headerTextColor = siteSettings?.header?.textColor || "#ffffff";
  const webMenuHoverColor = siteSettings?.webMenu?.hoverColor || "#09bda2";
  const footerBgColor = siteSettings?.footer?.bgColor || "#001a1a";
  const globalFontFamily =
    siteSettings?.fontSettings?.globalFontFamily || "Poppins, sans-serif";

  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor: headerBgColor,
        color: headerTextColor,
        fontFamily: globalFontFamily,
      }}
    >
      <h2 className="text-xl font-bold mb-4">Dynamic Styling Example</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Header Background:</h3>
          <div
            className="w-20 h-10 rounded border"
            style={{ backgroundColor: headerBgColor }}
          ></div>
          <p className="text-sm">{headerBgColor}</p>
        </div>

        <div>
          <h3 className="font-semibold">Hover Color:</h3>
          <div
            className="w-20 h-10 rounded border"
            style={{ backgroundColor: webMenuHoverColor }}
          ></div>
          <p className="text-sm">{webMenuHoverColor}</p>
        </div>

        <div>
          <h3 className="font-semibold">Footer Background:</h3>
          <div
            className="w-20 h-10 rounded border"
            style={{ backgroundColor: footerBgColor }}
          ></div>
          <p className="text-sm">{footerBgColor}</p>
        </div>

        <button
          className="px-4 py-2 rounded transition-colors"
          style={{
            backgroundColor: webMenuHoverColor,
            color: headerTextColor,
          }}
        >
          Dynamic Button
        </button>
      </div>
    </div>
  );
};

export default DynamicStyleExample;
