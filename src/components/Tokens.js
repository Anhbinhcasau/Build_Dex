import React, { useEffect, useState, useRef } from 'react';
import numeral from 'numeral';
//import Chart from 'chart.js/auto';

function Token() {
  //const chartRefs = useRef([]);
  const [assets, setAssets] = useState([]);

  const fetchAssest = async () => {
    try {
      const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/tokens?chain=eth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjlhYTVlYmVlLTYxZTAtNDE4MC04Yjc4LTdmY2YyYjY3Y2UzOCIsIm9yZ0lkIjoiMzg1NDg3IiwidXNlcklkIjoiMzk2MDk2IiwidHlwZUlkIjoiNzUzNWQ4Y2MtYTY0Ni00Njg3LWFlY2QtZmFkZjljNmYyMjFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTE4MDE5OTAsImV4cCI6NDg2NzU2MTk5MH0.Rb5aVgUAQX_EB2BJ9GAi0jpCtVr8ldLWNLLeqZfnDnA"
        }
      });
      const data = await response.json();
      setAssets(data.result);
    } catch (error) {
      console.error("Lỗi truy cập dữ liệu: ", error);
    }
  };

  useEffect(() => {
    fetchAssest();
  }, []);

  // Hook để cập nhật màu
  useEffect(() => {
    const interval = setInterval(() => {
      // Kiểm tra và cập nhật màu
      const updatedAssets = assets.map(asset => {
        const color = asset.usd_price_24hr_percent_change < 0 ? 'red' : asset.usd_price_24hr_percent_change > 0 ? 'green' : 'yellow';
        return { ...asset, color };
      });
      setAssets(updatedAssets);
    }, 2000); // Cập nhật mỗi giây

    return () => clearInterval(interval);
  }, [assets]); // Thêm assets vào dependencies để hook re-run khi assets thay đổi

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Balance</th>
            <th className="px-4 py-2">USD Price</th>
            <th className="px-4 py-2">24hr % Change</th>
            <th className="px-4 py-2">USD Value</th>
            <th className="px-4 py-2">Portfolio Percentage</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.token_address}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2 flex items-center">
                <img src={asset.thumbnail} alt={asset.logo} className="h-8 w-8 mr-2"></img>
                <span>{asset.name}</span>
              </td>
              <td className="border px-4 py-2">{asset.symbol}</td>
              <td className="border px-4 py-2">{numeral(asset.balance_formatted).format('0,0.00')}</td>
              <td className="border px-4 py-2">${numeral(asset.usd_price).format('0,0.00')}</td>
              <td className="border px-4 py-2" style={{ color: asset.color }}>
                {numeral(asset.usd_price_24hr_percent_change).format('0,0.00')}%
              </td>
              <td className="border px-4 py-2">${numeral(asset.usd_value).format('0,0.00')}</td>
              <td className="border px-4 py-2">{asset.portfolio_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Token;
