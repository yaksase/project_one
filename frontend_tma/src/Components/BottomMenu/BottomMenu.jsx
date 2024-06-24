import { IconContext } from "react-icons/lib";
import { PiTreasureChestLight, PiHouseLight, PiDesktopLight, PiShoppingCartLight } from "react-icons/pi";
import { PiTreasureChestBold, PiHouseBold, PiDesktopBold, PiShoppingCartBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

import s from './BottomMenu.module.css';

export default function BottomMenu() {
  const location = useLocation();
  const IconSize = "40";

  let houseIcon = 
    <IconContext.Provider value={{ size: IconSize}}>
      <PiHouseLight></PiHouseLight>
    </IconContext.Provider>;
    
  let inventoryIcon = 
    <IconContext.Provider value={{ size: IconSize }}>
      <PiDesktopLight></PiDesktopLight>
    </IconContext.Provider>;

  let marketIcon = 
    <IconContext.Provider value={{ size: IconSize }}>
      <PiShoppingCartLight></PiShoppingCartLight>
    </IconContext.Provider>;

  let dropsIcon = 
    <IconContext.Provider value={{ size: IconSize }}>
      <PiTreasureChestLight></PiTreasureChestLight>
    </IconContext.Provider>;

  switch (location.pathname) {
    case '/':
      houseIcon = 
        <IconContext.Provider value={{ size: IconSize, className: s.glowingIcon}}>
          <PiHouseBold></PiHouseBold>
        </IconContext.Provider>;
      break;

    case '/inventory':
      inventoryIcon =
        <IconContext.Provider value={{ size: IconSize, className: s.glowingIcon}}>
          <PiDesktopBold></PiDesktopBold>
        </IconContext.Provider>;
      break;

    case '/market':
      marketIcon = 
        <IconContext.Provider value={{ size: IconSize, className: s.glowingIcon}}>
          <PiShoppingCartBold></PiShoppingCartBold>
        </IconContext.Provider>;
      break;

    case '/drops':
      dropsIcon = 
        <IconContext.Provider value={{ size: IconSize, className: s.glowingIcon}}>
          <PiTreasureChestBold></PiTreasureChestBold>
        </IconContext.Provider>;
      break;
  
    default:
      break;
  }

  return (
    <nav className={s.nav_bottom_menu}>
      <ul className={s.icons_list_bottom_menu}>
        <li>
          <Link to={'/'}>
            {houseIcon}
          </Link>
        </li>
        <li className={s.icon_divider_bottom_menu} style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <Link to={'/inventory'}>
            {inventoryIcon}
          </Link>
        </li>
        <li className={s.icon_divider_bottom_menu} style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <Link to={'/market'}>
            {marketIcon}
          </Link>
        </li>
        <li className={s.icon_divider_bottom_menu} style={{height:(+IconSize+10) + "px"}}></li>
        <li>
          <Link to={'/drops'}>
            {dropsIcon}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
