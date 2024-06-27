import { useState } from 'react';

import CommonAi from '../../assets/ai/ai_common.png';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';

import s from './Inventory.module.css';

export default function Inventory() {
  return (
    <div style={{ overflowX: 'hidden' }} className={s.blockOfContent}>
      <div className={s.inventoryItemComponent}>
        <div className={s.imageStatusContainer}>
          <div className={`${s.imageContainer} ${s.uncommonBorder}`}>
            <img src={CommonAi} className='glow-common'></img>
          </div>
          <div className={`${s.statusDescription} text-common ${s.uncommonBorder}`}>
            Common
          </div>
        </div>
        <div className={s.buttonsContainer}>
          <div className={s.button}>
            <GlowingButton>Use AI</GlowingButton>
          </div>
          <div className={s.button}>
            <GlowingButton>Sell</GlowingButton>
          </div>
          <div className={s.button}>
            <GlowingButton>Ne ebu</GlowingButton>
          </div>
          <div className={s.button}>
            <GlowingButton>Ne ebu</GlowingButton>
          </div>
        </div>
      </div>
    </div>
  )
}