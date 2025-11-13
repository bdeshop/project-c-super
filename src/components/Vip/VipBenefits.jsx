const VipBenefits = () => {
  const data = [
    [
      "Slots Rebate (%)",
      "0.10",
      "0.25",
      "0.40",
      "0.50",
      "0.70",
      "1.00",
      "1.20",
    ],
    [
      "Live Casino Rebate (%)",
      "N/A",
      "0.10",
      "0.20",
      "0.30",
      "0.60",
      "0.80",
      "1.00",
    ],
    ["Sport Rebate (%)", "N/A", "0.10", "0.20", "0.30", "0.60", "0.80", "1.00"],
  ];
  const mobileData = [
    { title: "Slots Rebate (%)", value: "0.50 %" },
    { title: "Live Casino Rebate (%)", value: "0.30 %" },
    { title: "Sport Rebate (%)", value: "0.20 %" },
  ];
  const requirementData = [
    [
      "Upgrade Deposit Requirement (৳)",
      "New Member",
      "৳ 10,000",
      "৳ 2,00,000",
      "৳ 5,00,000",
      "৳ 50,00,000",
      "৳ 1,00,00,000",
    ],
    [
      "Upgrade Turnover Requirement (৳)",
      "New Member",
      "৳ 1,00,000",
      "৳ 20,00,000",
      "৳ 50,00,000",
      "৳ 5,00,00,000",
      "৳ 9,00,00,000",
    ],
    [
      "Upgrade Bonus (৳)",
      "N/A",
      "N/A",
      "৳ 388",
      "৳ 888",
      "৳ 3,888",
      "৳ 38,888",
    ],
  ];
  const mobileRequireMentData=
    [
      { title: "Upgrade Deposit Requirement (৳)", value: "0.50 %" },
      { title: "Upgrade Turnover Requirement (৳)", value: "0.30 %" },
      { title: "Upgrade Bonus (৳)", value: "0.20 %" },
    ];
  

  const downgradeData = [
    [
      "Downgrade Criteria",
      "N/A",
      "N/A",
      "N/A",
      "Inactive for 2 months",
      "Inactive for 2 months",
      "Inactive for 2 months",
      "N/A",
    ],
  ];
   
  const mobileDowngradeData=
    [
      { title: "Downgrade Criteria", value: "N/A" },
    ];

  return (
    <div className="mx-auto max-w-4xl  md:px-6 lg:px-0   ">
      {/* benefits */}
      <div>
        <h3 className="text-textPrimary p-2 bg-bg-primary">VIP BENEFITS</h3>
        <table className="table-auto hidden lg:table w-full  border-gray-300">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {row.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={` py-2 text-sm ${
                      colIndex === 0 ? "text-white " : "text-textPrimary px-4"
                    }`}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lg:hidden p-4">
          {mobileData.map((item, index) => (
            <div key={index} className="flex py-2 text-xs text-white justify-between">
              <h3>{item.title}</h3>
              <p className="text-textPrimary">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirement */}
      <div>
        <h3 className="text-textPrimary p-2 bg-bg-primary">
          Tier Upgrade Requirement
        </h3>
        <table className="table-auto w-full hidden lg:table  border-gray-300">
          <tbody>
            {requirementData.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {row.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={` py-2 text-sm   lg:whitespace-nowrap md:whitespace-normal ${
                      colIndex === 0
                        ? "text-white "
                        : "text-textPrimary px-4 md:text-center lg:text-left"
                    }`}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lg:hidden p-4">
          {mobileRequireMentData.map((item, index) => (
            <div key={index} className="flex py-2 text-xs text-white justify-between">
              <h3>{item.title}</h3>
              <p className="text-textPrimary">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Retention Requirement */}

      <div>
        <h3 className="text-textPrimary p-2 bg-bg-primary">
          Monthly Tier Retention Requirement
        </h3>
        <table className="table-auto w-full hidden lg:table  border-gray-300">
          <tbody>
            {downgradeData.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {row.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={` py-2 text-sm   ${
                      colIndex === 0
                        ? "text-white w-[25%]  "
                        : "text-textPrimary px-4 lg:text-left md:text-center"
                    }`}
                  >
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lg:hidden p-4">
          {mobileDowngradeData.map((item, index) => (
            <div key={index} className="flex text-xs text-white justify-between">
              <h3 className="">{item.title}</h3>
              <p className="text-textPrimary">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 pt-8">
        <hr className="" />
      </div>
    </div>
  );
};

export default VipBenefits;
