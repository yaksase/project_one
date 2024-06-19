import { IconContext } from "react-icons/lib";
import { PiTreasureChestLight, PiHouseLight, PiDesktopLight, PiShoppingCartLight } from "react-icons/pi";
import { Link } from "react-router-dom";

import s from './BottomMenu.module.css';

export default function BottomMenu() {
  const IconSize = "40";
  return (
    <nav className={s.nav_bottom_menu}>
      <ul className={s.icons_list_bottom_menu}>
        <li>
          <Link to={'/'}>
            <IconContext.Provider value={{ size: IconSize, className: "glowing_icon" }}>
              <PiHouseLight></PiHouseLight>
            </IconContext.Provider>
          </Link>
        </li>
        <li className={s.icon_divider_bottom_menu} style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <Link to={'/inventory'}>
            <IconContext.Provider value={{ size: IconSize }}>
              <PiDesktopLight></PiDesktopLight>
            </IconContext.Provider>
          </Link>
        </li>
        <li className={s.icon_divider_bottom_menu} style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <Link to={'/market'}>
            <IconContext.Provider value={{ size: IconSize }}>
              <PiShoppingCartLight></PiShoppingCartLight>
            </IconContext.Provider>
          </Link>
        </li>
        <li className={s.icon_divider_bottom_menu} style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <Link to={'/drops'}>
            <IconContext.Provider value={{ size: IconSize }}>
              <PiTreasureChestLight></PiTreasureChestLight>
            </IconContext.Provider>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
