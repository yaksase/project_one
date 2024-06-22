import { PiCoinsLight, PiClockLight, PiDesktopLight } from 'react-icons/pi';

import PositiveButton from '../../Components/PositiveButton/PositiveButton';

import UnknownPc from '../../assets/pc/pc_unknown.png';
import UnknownAi from '../../assets/ai/ai_unknown.png';

import s from './Home.module.css';

export default function Home() {
  return (
    <div className={s.container}>
      <div className={s.freeDropsCount}>
        1000 free PCs left
      </div>
      <div className={s.horizontalContainer}>
        <div className={s.claimPc}>
          <img src={UnknownPc}></img>
          <PositiveButton>Claim PC</PositiveButton>
        </div>
        <div className={s.aiContainer}>
          <div className={s.aiData}>
            <span><PiCoinsLight></PiCoinsLight> Shit</span>
            <span><PiClockLight></PiClockLight> Piss</span>
            <span><PiDesktopLight></PiDesktopLight> Cum</span>
          </div>
          <div className={s.aiShow}>
            <img src={UnknownAi}></img>
            <PositiveButton>Claim Ai</PositiveButton>
          </div>
        </div>
      </div>
    </div>
  )
}