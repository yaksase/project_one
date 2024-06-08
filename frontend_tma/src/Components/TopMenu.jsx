import { IconContext } from "react-icons/lib";
import { PiWalletLight, PiUserPlusLight, PiRankingLight } from "react-icons/pi";

import './TopMenu.css';

export default function BottomMenu() {
  return (
    <nav className="fixed top-0 transform w-full bg-black text-white">
      <ul className="flex justify-evenly">
        <li>
          <a className="" href="#refferal">
            <IconContext.Provider value={{ size:"30"}}>
              <PiUserPlusLight></PiUserPlusLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#leaderboard">
            <IconContext.Provider value={{ size:"30"}}>
              <PiRankingLight></PiRankingLight>
            </IconContext.Provider>
          </a>
        </li>
        <li>
          <a className="" href="#wallet">
            <IconContext.Provider value={{ size:"30"}}>
              <PiWalletLight></PiWalletLight>
            </IconContext.Provider>
          </a>
        </li>
      </ul>
    </nav>
  );
}
