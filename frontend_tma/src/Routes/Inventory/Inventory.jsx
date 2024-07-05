/* eslint-disable react/prop-types */
import { useState } from 'react';
import { PiCoinVerticalLight, PiInfoLight, PiPercentLight, PiDesktopLight, PiArrowsClockwiseLight, PiClockLight } from 'react-icons/pi';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';

import getAiImage from '../../utils/getAiImage';
import getPcImage from '../../utils/getPcImage';

import tokenIcon from '../../assets/token_icon.png';

import s from './Inventory.module.css';
import actSelStyle from './ActivatedSelector.module.css';
import typeSelStyle from './TypeSelector.module.css';

// 1 is activated 0 is not activated
const aiData = [
  {
    id: 9922,
    rarity: 'common',
    state: 1,
    timer: 2,
    maxSlots: 8,
    slots: 5,
  },
  {
    id: 12,
    rarity: 'uncommon',
    state: 0,
    timer: 4,
    maxSlots: 10,
    slots: 5,
  },
  {
    id: 444,
    rarity: 'ultra',
    state: 1,
    timer: 8,
    maxSlots: 20,
    slots: 18,
  },
  {
    id: 99221,
    rarity: 'epic',
    state: 1,
    timer: 10,
    maxSlots: 15,
    slots: 12,
  },
  {
    id: 121,
    rarity: 'rare',
    state: 0,
    timer: 6,
    maxSlots: 12,
    slots: 10,
  },
  {
    id: 4414,
    rarity: 'legendary',
    state: 1,
    timer: 12,
    maxSlots: 18,
    slots: 18,
  },
  {
    id: 444112312321,
    rarity: 'mythic',
    state: 1,
    timer: 20,
    maxSlots: 40,
    slots: 35,
  },
];

const pcData = [
  {
    id: 123,
    rarity: 'common',
    state: 1,
    tokenCount: 1,
    slotsCount: 1,
    health: 50,
  },
  {
    id: 2,
    rarity: 'ultra',
    state: 1,
    tokenCount: 50,
    slotsCount: 6,
    health: 75,
  },
  {
    id: 9,
    rarity: 'mythic',
    state: 0,
    tokenCount: 100,
    slotsCount: 7,
    health: 12,
  },
  {
    id: 1231,
    rarity: 'uncommon',
    state: 1,
    tokenCount: 2,
    slotsCount: 2,
    health: 89,
  },
  {
    id: 21,
    rarity: 'rare',
    state: 1,
    tokenCount: 3,
    slotsCount: 3,
    health: 12,
  },
  {
    id: 91,
    rarity: 'legendary',
    state: 0,
    tokenCount: 20,
    slotsCount: 5,
    health: 98,
  },
  {
    id: 911,
    rarity: 'epic',
    state: 0,
    tokenCount: 10,
    slotsCount: 4,
    health: 43,
  }
];

function ActivatedSelector({ active, setActive, notActive, setNotActive }) {
  function onActivePress() {
    if (notActive) {
      setNotActive(false);
      setActive(true);
    } else {
      setActive(!active);
    }
  }

  function onNotActivePress() {
    if (active) {
      setActive(false);
      setNotActive(true);
    } else {
      setNotActive(!notActive);
    }
  }

  return (
    <div className={s.activatedSelector}>
      <button className={`${actSelStyle.button} ${active ? actSelStyle.active : ''}`} onClick={onActivePress}>Activated</button>
      <button className={`${actSelStyle.button} ${notActive ? actSelStyle.active : ''}`} onClick={onNotActivePress}>Not Activated</button>
    </div>
  )
}

function TypeSelector({ showPc, setShowPc, showAi, setShowAi }) {
  function onShowPcPress() {
    if (showAi) {
      setShowAi(false);
      setShowPc(true);
    } else {
      setShowPc(!showPc);
    }
  }

  function onShowAiPress() {
    if (showPc) {
      setShowPc(false);
      setShowAi(true);
    } else {
      setShowAi(!showAi);
    }
  }

  return (
    <div className={s.activatedSelector}>
      <button className={`${typeSelStyle.button} ${showPc ? typeSelStyle.active : ''}`} onClick={onShowPcPress}>PC</button>
      <button className={`${typeSelStyle.button} ${showAi ? typeSelStyle.active : ''}`} onClick={onShowAiPress}>AI</button>
    </div>
  )
}

function ItemAi({ ai }) {
  return (
    <div className={s.item}>
      <div className={s.itemIcon}>
        <div className={`${s.itemImage} ${s.border}`}>
          <img className={`glow-${ai.rarity}`} src={getAiImage(ai.rarity)}></img>
        </div>
        <div className={`${s.itemRarity} ${s.border} text-${ai.rarity}`}>
          {ai.rarity}
        </div>
      </div>
      <div className={s.itemMenu}>
        {
          ai.state ?
          <>
            <div className={s.buttonsRow}>
              <GlowingButton glowSize={'0.3rem'} buttonColor={'white'} width={'50%'}>
                <span>
                  <PiArrowsClockwiseLight></PiArrowsClockwiseLight>
                  Replace
                </span>
              </GlowingButton>
              <GlowingButton glowSize={'0.3rem'} buttonColor={'red'} width={'40%'}>
                <span>
                  <PiCoinVerticalLight></PiCoinVerticalLight>
                  Sell
                </span>
              </GlowingButton>
            </div>
            <div className={s.buttonsRow}> 
              <div style={{width: '50%'}}>
                <span className={`${s.border} ${s.infoWrapper}`} >
                  <PiClockLight></PiClockLight>
                  {ai.timer} hours
                </span>
              </div>
              <div style={{width: '40%'}}>
                <span className={`${s.border} ${s.infoWrapper}`} >
                  <PiDesktopLight></PiDesktopLight>
                  {ai.slots}/{ai.maxSlots}
                </span>
              </div>
            </div>
          </> :
          <>
            <div className={s.buttonsRow}>
              <GlowingButton glowSize={'0.3rem'} width={'50%'}>Connect PC</GlowingButton>
              <GlowingButton glowSize={'0.3rem'} buttonColor={'red'} width={'40%'}>
                <span>
                  <PiCoinVerticalLight></PiCoinVerticalLight>
                  Sell
                </span>
              </GlowingButton>
            </div>
            <GlowingButton glowSize={'0.3rem'} buttonColor={'white'} width={'50%'}>
              <span>
                <PiInfoLight></PiInfoLight>
                Info
              </span>
            </GlowingButton>
          </>
        }
      </div>
    </div>
  )
}

function ItemPc({ pc }) {
  return (
    <div className={s.item}>
      <div className={s.itemIcon}>
        <div className={`${s.itemImage} ${s.border}`}>
          <img className={`glow-${pc.rarity}`} src={getPcImage(pc.rarity)}></img>
        </div>
        <div className={`${s.itemRarity} ${s.border} text-${pc.rarity}`}>
          {pc.rarity}
        </div>
      </div>
      <div className={s.itemMenu}>
        {
          pc.state ?
          <>
            <div className={s.buttonsRow}>
              <div style={{width: '45%'}}>
                <span className={`priceWrapper ${s.border} ${s.infoWrapper}`} >
                  <img src={tokenIcon}></img>
                  {pc.tokenCount}/hour
                </span>
              </div>
              <div style={{width: '45%'}}>
                <span className={`${s.border} ${s.infoWrapper}`}>
                  <PiPercentLight></PiPercentLight>
                  {pc.health}
                </span>
              </div>
            </div>
            <div className={s.buttonsRow}>
              <div style={{width: '45%'}}>
                <span className={`priceWrapper ${s.border} ${s.infoWrapper}`} >
                  <PiDesktopLight></PiDesktopLight>
                  {pc.slotsCount}
                </span>
              </div>
            </div>
          </> :
          <div className={s.buttonsRow}>
            <GlowingButton glowSize={'0.3rem'} buttonColor={'white'} width={'50%'}>
              <span>
                <PiInfoLight></PiInfoLight>
                Info
              </span>
            </GlowingButton>
            <GlowingButton glowSize={'0.3rem'} buttonColor={'red'} width={'40%'}>
              <span>
                <PiCoinVerticalLight></PiCoinVerticalLight>
                Sell
              </span>
            </GlowingButton>
          </div>
        }
      </div>
    </div>
  )
}

export default function Inventory() {
  const [active, setActive] = useState(false);
  const [notActive, setNotActive] = useState(false);

  const [showPc, setShowPc] = useState(false);
  const [showAi, setShowAi] = useState(false);

  return (
    <div className={s.container}>
      <ActivatedSelector active={active} setActive={setActive} notActive={notActive} setNotActive={setNotActive}></ActivatedSelector>
      <TypeSelector showPc={showPc} setShowPc={setShowPc} showAi={showAi} setShowAi={setShowAi}></TypeSelector>
      {
        showAi || showAi == showPc ?
        aiData.map((ai) => {
          if (active && !ai.state) {
            return <></>
          }
          if (notActive && ai.state) {
            return <></>
          }
          return <ItemAi key={ai.id} ai={ai}></ItemAi>
        }) :
        <></>
      }
      {
        showPc || showAi == showPc ?
        pcData.map((pc) => {
          if (active && !pc.state) {
            return <></>
          }
          if (notActive && pc.state) {
            return <></>
          }
          return <ItemPc key={pc.id} pc={pc}></ItemPc>
        }) :
        <></>
      }
    </div>
  )
}