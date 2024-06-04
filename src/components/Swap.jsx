import React, { useState, useEffect } from "react";
import { Input, Popover, Modal, Radio } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import tokenList from "../tokenList.json";
import axios from "axios";
import { useSendTransaction } from "wagmi";
import GasFees from "./GasFees";

function Swap(props) {
  const { address, isConnected } = props;
  const [gas, setGasFees] = useState(null);
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const [showGasFees, setShowGasFees] = useState(false);

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  function handleSlippage(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      fetchPrices(tokenList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(tokenOne.address, tokenList[i].address);
    }
    setIsOpen(false);
  }

  async function fetchPrices(one, two) {
    const res = await axios.get(`http://localhost:3001/tokenPrice`, {
      params: { addressOne: one, addressTwo: two },
    });

    setPrices(res.data);
  }

  async function fetchGasFees() {
    try {
      const response = await axios.get(`http://localhost:3001/gasFees`);
      setGasFees(response.data);
    } catch (error) {
      console.error("Error fetching gas fees:", error);
    }
  }

  async function fetchDexSwap() {
    try {
      const allowanceResponse = await axios.get(
        `https://api.1inch.dev/swap/v6.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
      );

      const allowanceData = allowanceResponse.data;

      if (allowanceData.allowance === "0") {
        const approveResponse = await axios.get(
          `https://api.1inch.dev/swap/v6.0/1/approve/transaction?tokenAddress=${tokenOne.address}`
        );

        const approveData = approveResponse.data;

        setTxDetails(approveData);
        console.log("Not approved");
        return;
      }

      console.log("make swap");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
    fetchGasFees();
  }, []);

  useEffect(() => {
    if (txDetails.to && isConnected) {
      sendTransaction();
    }
  }, [txDetails]);

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
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a Token"
      >
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo"></img>
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
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
          <Input
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            disabled={!prices}
          />
          <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
          <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOne" onClick={() => openModal(1)}>
            <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.ticker}
            <DownOutlined />
          </div>

          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt="assetTwoLogo" className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
        </div>
        <div
          className="swapButton"
          disabled={!tokenOneAmount || !isConnected}
          onClick={fetchDexSwap}
        >
          Swap
        </div>
        <button
          onClick={() => setShowGasFees(true)}>
          <p>Show Gas Fees</p>
        </button>
        <Modal
          title="Gas Fees"
          visible={showGasFees}
          onCancel={() => setShowGasFees(false)}
          footer={null}
        >
          <GasFees gas={gas} />
        </Modal>
      </div>
    </>
  );
}

export default Swap;
