import { IconContext } from "react-icons/lib";
import { PiTreasureChestLight, PiHouseLight, PiDesktopLight, PiShoppingCartLight } from "react-icons/pi";

export default function BottomMenu() {
  return (
    <nav className="fixed outline-slate-500 bottom-0 transform w-full bg-black text-white">
      <ul className="flex justify-evenly  py-4">
        <li>
          <a className="" href="#contact">
            <IconContext.Provider value={{ size:"50"}}>
              <PiHouseLight></PiHouseLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#contact">
            <IconContext.Provider value={{ size:"50"}}>
              <PiDesktopLight></PiDesktopLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#contact">
            <IconContext.Provider value={{ size:"50"}}>
              <PiShoppingCartLight></PiShoppingCartLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#contact">
            <IconContext.Provider value={{ size:"50"}}>
              <PiTreasureChestLight></PiTreasureChestLight>
            </IconContext.Provider>
          </a>
        </li>
      </ul>
    </nav>
  );
}
