import { IconContext } from "react-icons/lib";
import { PiTreasureChestLight, PiHouseLight, PiDesktopLight, PiShoppingCartLight } from "react-icons/pi";

import './BottomMenu.css';

export default function BottomMenu() {
  return (
    <nav className="fixed bottom-0 transform w-full bg-black text-white">
      <ul className="flex justify-evenly py-4 divide-x">
        <li>
          <a className="" href="#home">
            <IconContext.Provider value={{ size:"50"}}>
              <PiHouseLight></PiHouseLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#inventory">
            <IconContext.Provider value={{ size:"50"}}>
              <PiDesktopLight></PiDesktopLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#market">
            <IconContext.Provider value={{ size:"50"}}>
              <PiShoppingCartLight></PiShoppingCartLight>
            </IconContext.Provider>
          </a>
        </li>
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
