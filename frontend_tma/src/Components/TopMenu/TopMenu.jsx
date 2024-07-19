/* eslint-disable react/prop-types */
import { IconContext } from "react-icons/lib";
import { PiWalletLight, PiUserPlusLight, PiRankingLight } from "react-icons/pi";

import TonIcon from '../../assets/ton_icon.svg';
import TokenIcon from '../../assets/token_icon.png';

import s from './TopMenu.module.css';

export default function TopMenu({ onInviteClick, onLeaderboardClick, onWalletClick}) {
  const IconSize = "40";
  return (
    <nav className={s.nav_top_menu}>
      <ul className={s.icons_list_top_menu}>
        <li>
          <a onClick={onInviteClick}>
            <IconContext.Provider value={{ size: IconSize }}>
              <PiUserPlusLight className={s.icon}></PiUserPlusLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a onClick={onLeaderboardClick}>
            <IconContext.Provider value={{ size: IconSize }}>
              <PiRankingLight className={s.icon}></PiRankingLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className={s.money_section_top_menu} onClick={onWalletClick}>
            <IconContext.Provider value={{ size: IconSize }}>
              <PiWalletLight className={s.icon}></PiWalletLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <div className={s.balance_container_top_menu}>
            <div className={s.balance_top_menu}>
              <span className="priceWrapper">
                12.356
                <img src={TonIcon}/>
              </span>
              
            </div>
            <div className={s.balance_top_menu}>
              <span className="priceWrapper">
                1.546M
                <img src={TokenIcon}/>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
