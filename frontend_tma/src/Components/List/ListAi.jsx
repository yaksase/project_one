/* eslint-disable react/prop-types */
import getAiImage from '../../utils/getAiImage';
import GlowingButton from '../GlowingButton/GlowingButton';
import PopUp from '../PopUp/PopUp';

import s from './List.module.css';

export default function ListAi({ ai, isActive, onClose }) {
  return (
    <PopUp isActive={isActive} onClose={onClose}>
      <div className={s.container}>
        <div className={s.image}>
          <img src={getAiImage(ai.rarity)} className={`glow-${ai.rarity}`}></img>
          <span className={`text-${ai.rarity}`}>{ai.rarity}</span>
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