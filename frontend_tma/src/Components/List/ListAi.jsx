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
    let input = e.target.value.replace(',', '.');

    const validChar = /^([1-9]\d*|0)?(\.\d*)?$/;

    if (validChar.test(input) || input === '') {
      const parts = input.split('.');
      if (parts[0].length > 1 && parts[0].startsWith('0') && !parts[0].startsWith('0.')) {
        parts[0] = '0';
      }
      input = parts.join('.');
      setPrice(input);  
    }
  };

  const handleBlur = () => {
    if (price.endsWith('.')) {
      setPrice(price.slice(0, -1));
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
          <input className={s.price}
            placeholder='Price'
            type='text'
            value={price}
            inputMode='decimal'
            onChange={handlePriceChange} 
            onBlur={handleBlur} />
          <div className={s.buttonContainer}>
            <GlowingButton width={'40vw'} glowSize={'0.2em'} buttonColor={'red'}>List</GlowingButton>
          </div>
        </div>
      </div>
    </PopUp>
  )
}