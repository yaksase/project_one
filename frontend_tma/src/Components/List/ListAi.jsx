/* eslint-disable react/prop-types */
import { useState } from 'react';
import getAiImage from '../../utils/getAiImage';
import GlowingButton from '../GlowingButton/GlowingButton';
import PopUp from '../PopUp/PopUp';

import s from './List.module.css';

export default function ListAi({ ai, isActive, onClose }) {
  // function for checking validity of input
  const [price, setPrice] = useState('');
  const handlePriceChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/gm.test(input)) {
      setPrice(input);
    }
  };

  return (
    <PopUp isActive={isActive} onClose={onClose}>
      <div className={s.container}>
        <div className={s.image}>
          <img src={getAiImage(ai.rarity)} className={`glow-${ai.rarity}`}></img>
          <span className={`text-${ai.rarity}`}>{ai.rarity}</span>
        </div>
        <div className={s.controlsContainer}>
          <input className={s.price} placeholder='Price' type='text' value={price} onChange={handlePriceChange}></input>
          <div className={s.buttonContainer}>
            <GlowingButton width={'40vw'} glowSize={'0.2em'} buttonColor={'red'}>List</GlowingButton>
          </div>
        </div>
      </div>
    </PopUp>
  )
}