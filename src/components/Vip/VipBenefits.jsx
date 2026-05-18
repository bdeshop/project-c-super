import { useState } from "react";

const VipBenefits = ({ levels }) => {
  const [selectedMobileLevelIdx, setSelectedMobileLevelIdx] = useState(0);

  const fallbackData = [
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

  const fallbackRequirementData = [
    [
      "Upgrade Deposit Requirement (৳)",
      "New Member",
      "৳ 10,000",
      "৳ 2,00,000",
      "৳ 5,00,000",
      "৳ 50,00,000",
      "৳ 1,00,00,000",
      "৳ 2,50,00,000",
    ],
    [
      "Upgrade Turnover Requirement (৳)",
      "New Member",
      "৳ 1,00,000",
      "৳ 20,00,000",
      "৳ 50,00,000",
      "৳ 5,00,00,000",
      "৳ 9,00,00,000",
      "৳ 18,00,00,000",
    ],
    [
      "Upgrade Bonus (৳)",
      "N/A",
      "N/A",
      "৳ 388",
      "৳ 888",
      "৳ 3,888",
      "৳ 38,888",
      "৳ 88,888",
    ],
  ];

  const fallbackDowngradeData = [
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

  // Dynamically resolve columns
  const levelNames = levels && levels.length > 0
    ? ["Level", ...levels.map(l => l.name)]
    : ["Level", "Bronze", "Silver", "Ruby", "Gold", "Diamond", "Sapphire", "Platinum"];

  const data = levels && levels.length > 0 ? [
    ["Slots Rebate (%)", ...levels.map(l => l.slotsRebate)],
    ["Live Casino Rebate (%)", ...levels.map(l => l.liveCasinoRebate)],
    ["Sport Rebate (%)", ...levels.map(l => l.sportRebate)]
  ] : fallbackData;

  const requirementData = levels && levels.length > 0 ? [
    ["Upgrade Deposit Requirement (৳)", ...levels.map(l => l.upgradeDepositRequirement)],
    ["Upgrade Turnover Requirement (৳)", ...levels.map(l => l.upgradeTurnoverRequirement)],
    ["Upgrade Bonus (৳)", ...levels.map(l => l.upgradeBonus)]
  ] : fallbackRequirementData;

  const downgradeData = levels && levels.length > 0 ? [
    ["Downgrade Criteria", ...levels.map(l => l.downgradeCriteria)]
  ] : fallbackDowngradeData;

  // Active level for mobile card rendering
  const activeLevel = levels && levels.length > 0
    ? levels[selectedMobileLevelIdx % levels.length]
    : {
        name: levelNames[selectedMobileLevelIdx + 1] || "Bronze",
        slotsRebate: data[0][selectedMobileLevelIdx + 1] || "0.10",
        liveCasinoRebate: data[1][selectedMobileLevelIdx + 1] || "N/A",
        sportRebate: data[2][selectedMobileLevelIdx + 1] || "N/A",
        upgradeDepositRequirement: requirementData[0][selectedMobileLevelIdx + 1] || "N/A",
        upgradeTurnoverRequirement: requirementData[1][selectedMobileLevelIdx + 1] || "N/A",
        upgradeBonus: requirementData[2][selectedMobileLevelIdx + 1] || "N/A",
        downgradeCriteria: downgradeData[0][selectedMobileLevelIdx + 1] || "N/A"
      };

  return (
    <div className="mx-auto max-w-4xl md:px-6 lg:px-0 mt-8">
      {/* 1. VIP BENEFITS TABLE */}
      <div className="mb-6">
        <h3 className="text-textPrimary p-2.5 bg-bg-primary text-sm font-bold tracking-wide uppercase">
          VIP BENEFITS & REBATES
        </h3>
        
        {/* Desktop View Table */}
        <div className="hidden lg:block overflow-x-auto w-full">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                {levelNames.map((name, idx) => (
                  <th 
                    key={idx} 
                    className={`py-3 text-left text-xs font-bold ${
                      idx === 0 ? "text-white w-[25%]" : "text-common-orange px-4 text-center"
                    }`}
                  >
                    {name.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-800/40 hover:bg-slate-900/10">
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-3 text-xs ${
                        colIndex === 0 ? "text-white font-medium" : "text-textPrimary px-4 text-center"
                      }`}
                    >
                      {colIndex > 0 && col !== "N/A" && !col.endsWith("%") ? `${col}%` : col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. TIER UPGRADE REQUIREMENTS TABLE */}
      <div className="mb-6">
        <h3 className="text-textPrimary p-2.5 bg-bg-primary text-sm font-bold tracking-wide uppercase">
          Tier Upgrade Requirement
        </h3>
        
        {/* Desktop View Table */}
        <div className="hidden lg:block overflow-x-auto w-full">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                {levelNames.map((name, idx) => (
                  <th 
                    key={idx} 
                    className={`py-3 text-left text-xs font-bold ${
                      idx === 0 ? "text-white w-[25%]" : "text-common-orange px-4 text-center"
                    }`}
                  >
                    {name.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requirementData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-800/40 hover:bg-slate-900/10">
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-3 text-xs ${
                        colIndex === 0 ? "text-white font-medium" : "text-textPrimary px-4 text-center"
                      }`}
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. TIER RETENTION REQUIREMENTS TABLE */}
      <div className="mb-8">
        <h3 className="text-textPrimary p-2.5 bg-bg-primary text-sm font-bold tracking-wide uppercase">
          Monthly Tier Retention Requirement
        </h3>
        
        {/* Desktop View Table */}
        <div className="hidden lg:block overflow-x-auto w-full">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                {levelNames.map((name, idx) => (
                  <th 
                    key={idx} 
                    className={`py-3 text-left text-xs font-bold ${
                      idx === 0 ? "text-white w-[25%]" : "text-common-orange px-4 text-center"
                    }`}
                  >
                    {name.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {downgradeData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-800/40 hover:bg-slate-900/10">
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-3 text-xs ${
                        colIndex === 0 ? "text-white font-medium" : "text-textPrimary px-4 text-center"
                      }`}
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE PREMIUM VIEW (Dynamic Selector + Summary Cards) */}
      <div className="lg:hidden px-2 mb-6">
        <div className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-thin">
          {levelNames.slice(1).map((name, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMobileLevelIdx(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                selectedMobileLevelIdx === idx
                  ? "bg-common-orange text-white border-common-orange"
                  : "bg-slate-900/40 text-slate-400 border-slate-800"
              }`}
            >
              {name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dynamic Mobile Level Info Card */}
        <div className="bg-slate-900/30 p-4 border border-slate-800/60 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
            <h4 className="text-sm font-bold text-white uppercase">{activeLevel.name} Benefits</h4>
            <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded">
              Tier {selectedMobileLevelIdx + 1}
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Slots Rebate</span>
              <span className="text-white font-semibold">
                {activeLevel.slotsRebate && !activeLevel.slotsRebate.endsWith("%") && activeLevel.slotsRebate !== "N/A" 
                  ? `${activeLevel.slotsRebate}%` 
                  : activeLevel.slotsRebate}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Live Casino Rebate</span>
              <span className="text-white font-semibold">
                {activeLevel.liveCasinoRebate && !activeLevel.liveCasinoRebate.endsWith("%") && activeLevel.liveCasinoRebate !== "N/A" 
                  ? `${activeLevel.liveCasinoRebate}%` 
                  : activeLevel.liveCasinoRebate}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Sports Rebate</span>
              <span className="text-white font-semibold">
                {activeLevel.sportRebate && !activeLevel.sportRebate.endsWith("%") && activeLevel.sportRebate !== "N/A" 
                  ? `${activeLevel.sportRebate}%` 
                  : activeLevel.sportRebate}
              </span>
            </div>
            <div className="border-t border-slate-800/50 my-2 pt-2"></div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Min. Upgrade Deposit</span>
              <span className="text-common-orange font-semibold">{activeLevel.upgradeDepositRequirement}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Min. Upgrade Turnover</span>
              <span className="text-common-orange font-semibold">{activeLevel.upgradeTurnoverRequirement}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Upgrade Bonus Reward</span>
              <span className="text-green-400 font-semibold">{activeLevel.upgradeBonus}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Monthly Retention</span>
              <span className="text-white font-semibold">{activeLevel.downgradeCriteria}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 pt-4 px-2 lg:px-0">
        <hr className="border-slate-800" />
      </div>
    </div>
  );
};

export default VipBenefits;
