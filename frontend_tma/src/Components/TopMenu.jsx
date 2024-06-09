import { IconContext } from "react-icons/lib";
import { PiWalletLight, PiUserPlusLight, PiRankingLight } from "react-icons/pi";

import TonIcon from '../assets/ton_icon.svg';

import './TopMenu.css';

export default function BottomMenu() {
  return (
    <nav className="nav_top_menu">
      <ul className="icons_list_top_menu">
        <li>
          <div className="functional_icons_top_menu">
            <a href="#refferal">
              <IconContext.Provider value={{ size: "50" }}>
                <PiUserPlusLight className="icon"></PiUserPlusLight>
              </IconContext.Provider>
            </a>
            <a href="#leaderboard">
              <IconContext.Provider value={{ size: "50" }}>
                <PiRankingLight className="icon"></PiRankingLight>
              </IconContext.Provider>
            </a>
          </div>
        </li>
        <li>
          <a className="money_section_top_menu" href="#wallet">
            <div className="balance_top_menu">
              1234.5678
            </div>
            <div className="ton_icon_top_menu">
              <img src={TonIcon} />
            </div>
            <IconContext.Provider value={{ size: "50" }}>
              <PiWalletLight class="icon"></PiWalletLight>
            </IconContext.Provider>
          </a>
        </li>
      </ul>
    </nav>
  );
}
