import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const GasFees = ({ gas }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gasLimit, setGasLimit] = useState(21000); // Default gas limit

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    // Calculate gas fee based on the selected level
    const gasPrice = gas[level.toLowerCase()].suggestedMaxFeePerGas;
    const gasFee = (gasPrice * gasLimit) / 1e9; // Convert to ETH
    console.log(`Gas fee for ${level}: ${gasFee.toFixed(6)} ETH`);
  };

  return (
    gas && (
      <div className="w-full rounded-lg text-white">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 w-1/4">Level</th>
              <th className="px-4 py-2 w-1/4">Time (min)</th>
              <th className="px-4 py-2 w-1/4">Max Fee</th>
              <th className="px-4 py-2 w-1/4">Priority Fee</th>
            </tr>
          </thead>
          <tbody>
            {["Low", "Medium", "High"].map((level, index) => (
              <tr
                key={index}
                className={`text-center ${
                  selectedLevel === level ? "bg-gray-800" : ""
                }`}
                onClick={() => handleLevelClick(level)}
              >
                <td className="px-4 py-2">{level}</td>
                <td className="px-4 py-2">
                  {`${(gas[level.toLowerCase()].minWaitTimeEstimate / 60000).toFixed(2)} - ${(gas[level.toLowerCase()].maxWaitTimeEstimate / 60000).toFixed(2)}`}
                </td>
                <td className="px-4 py-2">{gas[level.toLowerCase()].suggestedMaxFeePerGas}</td>
                <td className="px-4 py-2">{gas[level.toLowerCase()].suggestedMaxPriorityFeePerGas}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Other Info</h3>
          <div className="flex justify-between mt-2">
            <span>Estimated Base Fee:</span>
            <span>{gas.estimatedBaseFee}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Network Congestion:</span>
            <span>{gas.networkCongestion}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Priority Fee Trend:</span>
            <span>
              {gas.priorityFeeTrend === "down" ? (
                <FaArrowDown className="inline-block text-red-500" />
              ) : (
                <FaArrowUp className="inline-block text-green-500" />
              )}
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Base Fee Trend:</span>
            <span>
              {gas.baseFeeTrend === "down" ? (
                <FaArrowDown className="inline-block text-red-500" />
              ) : (
                <FaArrowUp className="inline-block text-green-500" />
              )}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default GasFees;