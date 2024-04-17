import React, { useEffect, useState, useRef } from 'react'
import numeral from 'numeral';
import Chart from 'chart.js/auto';

function Tokens() {
  const chartRefs = useRef([]);
  const [assets, setAssets] = useState([]);

  const fetchAssest = async () => {
    try {
      const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/0xcB1C1FdE09f811B294172696404e88E658659905/tokens?chain=eth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjlhYTVlYmVlLTYxZTAtNDE4MC04Yjc4LTdmY2YyYjY3Y2UzOCIsIm9yZ0lkIjoiMzg1NDg3IiwidXNlcklkIjoiMzk2MDk2IiwidHlwZUlkIjoiNzUzNWQ4Y2MtYTY0Ni00Njg3LWFlY2QtZmFkZjljNmYyMjFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTE4MDE5OTAsImV4cCI6NDg2NzU2MTk5MH0.Rb5aVgUAQX_EB2BJ9GAi0jpCtVr8ldLWNLLeqZfnDnA"
        }
      })
      const data = await response.json();
      setAssets(data.result);
    } catch (error) {
      console.error("Lỗi truy cập dữ liệu: ", error);
    }
  }

  useEffect(() => {
    fetchAssest()
  }, [])

  return (
    <div class="overflow-x-auto">
      <table class="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2"></th>
            <th class="px-4 py-2">Balance</th>
            <th class="px-4 py-2">USD Price</th>
            <th class="px-4 py-2">24hr % Change</th>
            <th class="px-4 py-2">USD Value</th>
            <th class="px-4 py-2">Portfolio Percentage</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.token_address}>
              <td class="border px-4 py-2">{index + 1}</td>
              <td class="border px-4 py-2 flex items-center">
                <img src={asset.thumbnail} alt={asset.logo} class="h-8 w-8 mr-2"></img>
                <span>{asset.name}</span>
              </td>
              <td class="border px-4 py-2">{asset.symbol}</td>
              <td class="border px-4 py-2">{numeral(asset.balance_formatted).format('0,0.00')}</td>
              <td class="border px-4 py-2">${numeral(asset.usd_price).format('0,0.00')}</td>
              <td class="border px-4 py-2" style={{ color: asset.usd_price_24hr_percent_change < 0 ? 'red' : asset.usd_price_24hr_percent_change > 0 ? 'green' : 'yellow' }}>
                {numeral(asset.usd_price_24hr_percent_change).format('0,0.00')}%
              </td>
              <td class="border px-4 py-2">${numeral(asset.usd_value).format('0,0.00')}</td>
              <td class="border px-4 py-2">{asset.portfolio_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tokens