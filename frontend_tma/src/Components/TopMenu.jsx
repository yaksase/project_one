import { IconContext } from "react-icons/lib";
import { PiWalletLight, PiUserPlusLight, PiRankingLight } from "react-icons/pi";

import TonIcon from '../assets/ton_icon.svg';

import './TopMenu.css';

export default function BottomMenu() {
  return (
    <nav class="nav_top_menu">
      <ul class="icons_list_top_menu">
        <li>
          <div class="functional_icons_top_menu">
            <a className="" href="#refferal">
              <IconContext.Provider value={{ size: "50" }}>
                <PiUserPlusLight class="icon"></PiUserPlusLight>
              </IconContext.Provider>
            </a>
            <a className="" href="#leaderboard">
              <IconContext.Provider value={{ size: "50" }}>
                <PiRankingLight class="icon"></PiRankingLight>
              </IconContext.Provider>
            </a>
          </div>
        </li>
        <li>
          <a className="" href="#wallet" class="money_section_top_menu">
            <div class="balance_top_menu">
              1234.5678
            </div>
            <div class="ton_icon_top_menu">
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
