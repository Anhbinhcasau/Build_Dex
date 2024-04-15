import React, { useEffect, useState} from 'react'

function Tokens() {

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
    <div>
      <table class="table-auto">
        <thead>
          <tr class="block w-full">
            <th class='px-4'>#</th>
            <th class='px-4'>Name</th>
            <th class='px-4'>Price</th>
            <th class='px-4'>1h%</th>
            <th class='px-4'>24h%</th>
            <th class='px-4'>7d%</th>
            <th class='px-4'>Market Cap</th>
            <th class='px-4'>Volume(24h)</th>
            <th class='px-4'>Circulating Supply</th>
            <th class='px-4'>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={assets.token_address} class="block w-full">
              <td class="pr-6 pl-4 py-2">1</td>
              <td class="pr-2 py-2"><img src={asset.thumbnail} class="w-9"></img></td>
              <td class="pr-6 py-2">{asset.name}</td>
              <td class="pr-6 pl-4 py-2">{asset.usd_price}</td>
              <td class="pr-6 py-2">{asset.name}</td>
              <td class="pr-6 pl-4 py-2">{asset.usd_price_24hr_percent_change}</td>
              <td class="pr-6 pl-4 py-2">{asset.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tokens