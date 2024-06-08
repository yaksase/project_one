import { IconContext } from "react-icons/lib";
import { PiTreasureChestLight, PiHouseLight, PiDesktopLight, PiShoppingCartLight } from "react-icons/pi";

import './BottomMenu.css';

export default function BottomMenu() {
  return (
    <nav class="nav_bottom_menu">
      <ul class="icons_list_bottom_menu">
        <li>
          <a className="" href="#home">
            <IconContext.Provider value={{ size:"50"}}>
              <PiHouseLight></PiHouseLight>
            </IconContext.Provider>
          </a>
        </li>
        <li class="icon_divider_bottom_menu"></li>
        <li>
          <a className="" href="#inventory">
            <IconContext.Provider value={{ size:"50"}}>
              <PiDesktopLight></PiDesktopLight>
            </IconContext.Provider>
          </a>
        </li>
        <li class="icon_divider_bottom_menu"></li>
        <li>
          <a className="" href="#market">
            <IconContext.Provider value={{ size:"50"}}>
              <PiShoppingCartLight></PiShoppingCartLight>
            </IconContext.Provider>
          </a>
        </li>
        <li class="icon_divider_bottom_menu"></li>
        <li>
          <a className="" href="#crates">
            <IconContext.Provider value={{ size:"50"}}>
              <PiTreasureChestLight></PiTreasureChestLight>
            </IconContext.Provider>
          </a>
        </li>
      </ul>
    </nav>
  );
}
