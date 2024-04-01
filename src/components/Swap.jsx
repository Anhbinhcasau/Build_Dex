import React, { useState, useEffect } from "react";
import { Input, Popover, Radio } from "antd";
import {
  ArrowDownOutLined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";

function Swap() {
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);

  function handleSlippage(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
  }

  const settings = (
    <>
      <div>Slippage Tolerance:</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippage}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <div className="tradeBox">
      <div className="tradeBoxHeader">
        <h4>Swap</h4>
        <Popover
          title="Setting"
          trigger="click"
          placement="bottomRight"
          content={settings}
        >
          <SettingOutlined className="cog" />
        </Popover>
      </div>
      <div className="inputs">
        <Input placeholder="0" value={tokenOneAmount} onChange={changeAmount} />
        <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
        <div className="assetOne"></div>
        <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
        <div className="assetTwo"></div>
      </div>
    </div>
  );
}

export default Swap;
