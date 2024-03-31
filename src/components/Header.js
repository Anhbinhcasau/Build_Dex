import React from "react";
import Logo from "../moralis-logo.svg";
import eth from "../eth.svg";
import {  Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem"> Swap </div>
        </Link>
        <Link to="/tokens" className="link" >
          <div className="headerItem"> Tokens </div>
        </Link>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={eth} alt="eth" className="eth"/>
          Ethereum
        </div>
        <div className="connectButton">
          Connect Wallet
        </div>
      </div>
    </header>
  );
}
export default Header;
