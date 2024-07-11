/* eslint-disable react/prop-types */
import getPcImage from '../../utils/getPcImage';
import GlowingButton from '../GlowingButton/GlowingButton';
import PopUp from '../PopUp/PopUp';

import s from './List.module.css';

export default function ListPc({ pc, isActive, onClose }) {
  return (
    <PopUp isActive={isActive} onClose={onClose}>
      <div className={s.container}>
        <div className={s.image}>
          <img src={getPcImage(pc.rarity)} className={`glow-${pc.rarity}`}></img>
          <span className={`text-${pc.rarity}`}>{pc.rarity}</span>
        </div>
        <div className={s.controlsContainer}>
          <input className={s.price} placeholder='Price'></input>
          <div className={s.buttonContainer}>
            <GlowingButton width={'40vw'} glowSize={'0.2em'} buttonColor={'red'}>List</GlowingButton>
          </div>
        </div>
      </div>
    </PopUp>
  )
}