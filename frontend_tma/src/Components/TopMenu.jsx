import { IconContext } from "react-icons/lib";
import { PiWalletLight, PiUserPlusLight, PiRankingLight } from "react-icons/pi";

import TonIcon from '../assets/ton_icon.svg';

import './TopMenu.css';

export default function BottomMenu() {
  const IconSize = "40";
  return (
    <nav className="nav_top_menu">
      <ul className="icons_list_top_menu">
        <li>
          <div className="functional_icons_top_menu">
            <a className="" href="#refferal">
              <IconContext.Provider value={{ size: IconSize }}>
                <PiUserPlusLight className="icon"></PiUserPlusLight>
              </IconContext.Provider>
            </a>
            <a className="" href="#leaderboard">
              <IconContext.Provider value={{ size: IconSize }}>
                <PiRankingLight className="icon"></PiRankingLight>
              </IconContext.Provider>
            </a>
          </div>
        </li>
        <li>
          <a className="money_section_top_menu" href="#wallet" >
            <div className="balance_top_menu">
              1,2M
            </div>
            
            <IconContext.Provider value={{ size: IconSize }}>
              <PiWalletLight className="icon"></PiWalletLight>
            </IconContext.Provider>
            <div className="ton_icon_top_menu">
              <img src={TonIcon} />
            </div>
          </a>
        </li>
      </ul>
    </nav>
  );
}
