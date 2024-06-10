import { IconContext } from "react-icons/lib";
import { PiTreasureChestLight, PiHouseLight, PiDesktopLight, PiShoppingCartLight } from "react-icons/pi";
import { Link } from "react-router-dom";

import './BottomMenu.css';

export default function BottomMenu() {
  const IconSize = "40";
  return (
    <nav className="nav_bottom_menu">
      <ul className="icons_list_bottom_menu">
        <li>
          <Link to={'/'}>
            <IconContext.Provider value={{ size: IconSize }}>
              <PiHouseLight></PiHouseLight>
            </IconContext.Provider>
          </Link>
        </li>
        <li className="icon_divider_bottom_menu" style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <a href="#inventory">
            <IconContext.Provider value={{ size: IconSize }}>
              <PiDesktopLight></PiDesktopLight>
            </IconContext.Provider>
          </a>
        </li>
        <li className="icon_divider_bottom_menu" style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <a href="#market">
            <IconContext.Provider value={{ size: IconSize }}>
              <PiShoppingCartLight></PiShoppingCartLight>
            </IconContext.Provider>
          </a>
        </li>
        <li className="icon_divider_bottom_menu" style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <a href="#crates">
            <IconContext.Provider value={{ size: IconSize }}>
              <PiTreasureChestLight></PiTreasureChestLight>
            </IconContext.Provider>
          </a>
        </li>
      </ul>
    </nav>
  );
}
