import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from "react-icons/lib";
import { PiWalletLight, PiUserPlusLight, PiRankingLight } from "react-icons/pi";

import TonIcon from '../../assets/ton_icon.svg';
import TokenIcon from '../../assets/token_icon.png';

import axiosInstance from '../../axios';

import s from './TopMenu.module.css';

TopMenu.propTypes = {
  onInviteClick: PropTypes.func.isRequired,
  onLeaderboardClick: PropTypes.func.isRequired,
  onWalletClick: PropTypes.func.isRequired
}

export default function TopMenu({ onInviteClick, onLeaderboardClick, onWalletClick}) {
  const [tokens, setTokens] = useState(0);
  const [tons, setTons] = useState(0);

  useEffect(() => {
    axiosInstance.get('/api/me')
      .then((res) => {
        setTokens(res.data['tokens']);
        setTons(res.data['tons']);
      })
      .catch((err) => console.log(err))
  }, []);

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
                {tons}
                <img src={TonIcon}/>
              </span>
              
            </div>
            <div className={s.balance_top_menu}>
              <span className="priceWrapper">
                {tokens}
                <img src={TokenIcon}/>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
