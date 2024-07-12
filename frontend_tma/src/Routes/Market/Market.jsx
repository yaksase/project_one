/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { PiCaretDownBold, PiCaretUp, PiCaretUpBold } from 'react-icons/pi';

import getAiImage from '../../utils/getAiImage';
import getPcImage from '../../utils/getPcImage';

import tokenImage from '../../assets/token_icon.png';

import s from './Market.module.css';
import topSelectorStyle from './TopSelector.module.css';
import itemSelectorStyle from './ItemSelector.module.css';
import dropdownStyle from './RarityDropdown.module.css';

const raritiesData = [
  'common', 'uncommon', 'rare', 'epic', 'legendary', 'ultra', 'mythic'
];

function RarityDropdown({ imgSrc, children }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    console.log('hey');

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className={dropdownStyle.container}>
      <button className={`${itemSelectorStyle.button} ${itemSelectorStyle.active}`} onClick={() => {
        setShowDropdown((prevState) => !prevState);
      }}>
        <img src={imgSrc}></img>
        <div className={itemSelectorStyle.iconsWrapper}>
          <PiCaretUpBold style={showDropdown ? {visibility: 'visible'} : {visibility: 'hidden', height: 0}}></PiCaretUpBold>
          <PiCaretDownBold style={showDropdown ? {visibility: 'hidden', height: 0} : {visibility: 'visible'}}></PiCaretDownBold>
        </div>       
      </button>
      <div className={`${dropdownStyle.content} ${showDropdown ? dropdownStyle.contentOpen : ''}`}>
        {children}
      </div>
    </div>
    
  )
}

export default function Market() {
  const [showMarket, setShowMarket] = useState(true);

  const [showAi, setShowAi] = useState(true);
  const [curAi, setCurAi] = useState('common');

  const [showPc, setShowPc] = useState(false);
  const [curPc, setCurPc] = useState('common');

  const [showToken, setShowToken] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.topSelector}>
        <button className={`${topSelectorStyle.button} ${showMarket ? topSelectorStyle.active : ''}`} onClick={() => {
          setShowMarket(true);
        }}>Market</button>
        <button className={`${topSelectorStyle.button} ${showMarket ? '' : topSelectorStyle.active}`} onClick={() => {
          setShowMarket(false);
        }}>Listed</button>
      </div>
      <div className={s.itemSelector}>
        {
          showAi ?
          <RarityDropdown imgSrc={getAiImage(curAi)}>
            {raritiesData.map((rarity) => {
              return(
                <div key={rarity} className={s.dropdownItem} >
                  <img src={getAiImage(rarity)} style={{width: '1rem'}}></img>
                  <span className={`text-${rarity}`}>{rarity}</span>
                </div>
              )
            })}
          </RarityDropdown> :
          <button className={itemSelectorStyle.button} onClick={() => {
            setShowAi(true);
            setShowPc(false);
            setShowToken(false);
          }}>
            <img src={getAiImage(curAi)}></img>
          </button>
        }
        {
          showPc ?
          <RarityDropdown imgSrc={getPcImage(curPc)}>
            {raritiesData.map((rarity) => {
              return(
                <div key={rarity} className={s.dropdownItem}>
                  <img src={getPcImage(rarity)} style={{width: '1.5rem'}}></img>
                  <span className={`text-${rarity}`}>{rarity}</span>
                </div>
              )
            })}
          </RarityDropdown> :
          <button className={itemSelectorStyle.button} onClick={() => {
            setShowPc(true);
            setShowAi(false);
            setShowToken(false);
          }}>
            <img src={getPcImage(curPc)}></img>
            {showPc ? <PiCaretDownBold></PiCaretDownBold> : <></>}
          </button>
        }
        <button className={`${itemSelectorStyle.button} ${showToken ? itemSelectorStyle.active : ''}`} onClick={() => {
          setShowToken(true);
          setShowAi(false);
          setShowPc(false);
        }}>
          <img src={tokenImage}></img>
        </button>
      </div>
    </div>
  )
}