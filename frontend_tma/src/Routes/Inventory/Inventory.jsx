import { useState } from 'react';

import CommonAi from '../../assets/ai/ai_common.png';


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

        </div>
      </div>
    </div>
  )
}