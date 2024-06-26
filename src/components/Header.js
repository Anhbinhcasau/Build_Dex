import React from "react";
import Logo from "../logoTeam.png";
import eth from "../eth.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const { address, isConnected, connect } = props;

  return (
    <header>
      <div className="leftH">
        <img src={Logo} alt="logo" className="logo" />
        <Link to="/" className="link">
          <div className="headerItem"> Swap </div>
        </Link>
        <Link to="/tokens" className="link">
          <div className="headerItem"> Tokens </div>
        </Link>
      </div>
      <div className="rightH">
        <a href="https://ethereum.org/vi/" target="_blank">
          <div className="headerItem">
            <img src={eth} alt="eth" className="eth" />
            Ethereum
          </div>
        </a>
        <div className="connectButton" onClick={connect}>
          {isConnected
            ? address.slice(0, 4) + "..." + address.slice(38)
            : "Connect"}
        </div>
      </div>
    </header>
  );
}
export default Header;
