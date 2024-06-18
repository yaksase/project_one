import { IconContext } from "react-icons/lib";
import { PiWalletLight, PiUserPlusLight, PiRankingLight } from "react-icons/pi";

import TonIcon from '../../assets/ton_icon.svg';
import TokenIcon from '../../assets/token_icon.png';

import './TopMenu.css';

export default function TopMenu() {
  const IconSize = "40";
  return (
    <nav className="nav_top_menu">
      <ul className="icons_list_top_menu">
        <li>
          <a className="" href="#refferal">
            <IconContext.Provider value={{ size: IconSize }}>
              <PiUserPlusLight className="icon"></PiUserPlusLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#leaderboard">
            <IconContext.Provider value={{ size: IconSize }}>
              <PiRankingLight className="icon"></PiRankingLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="money_section_top_menu" href="#wallet" >
            <IconContext.Provider value={{ size: IconSize }}>
              <PiWalletLight className="icon"></PiWalletLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <div className="balance_container_top_menu">
            <div className="balance_top_menu">
              12.356
              <span className='priceIcon'><img src={TonIcon}/></span>
            </div>
            <div className="balance_top_menu">
              1.546M
              <span className='priceIcon'><img src={TokenIcon}/></span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
