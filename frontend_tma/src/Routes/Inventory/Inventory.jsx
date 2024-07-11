/* eslint-disable react/prop-types */
import { useState } from 'react';
import { PiCoinVerticalLight, PiInfoLight, PiPercentLight, PiDesktopLight, PiArrowsClockwiseLight, PiClockLight, PiClockBold, PiDesktopBold } from 'react-icons/pi';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import PopUp from '../../Components/PopUp/PopUp';
import ListAi from '../../Components/List/ListAi';

import getAiImage from '../../utils/getAiImage';
import getPcImage from '../../utils/getPcImage';

import tokenIcon from '../../assets/token_icon.png';

import s from './Inventory.module.css';
import actSelStyle from './ActivatedSelector.module.css';
import typeSelStyle from './TypeSelector.module.css';
import infoPopUpStyle from './InfoPopUp.module.css';
import ConnectPc from '../../Components/ConnectPc/ConnectPc';
import ListPc from '../../Components/List/ListPc';

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

function ItemAi({ ai, onInfoClick, onConnectClick, onSellClick }) {
  return (
    <div className={s.item}>
      <div className={s.itemIcon}>
        <div className={`${s.itemImage} ${s.border}`}>
          <img className={ai.state ? `glow-${ai.rarity}` : ''} src={getAiImage(ai.rarity)}></img>
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
              <GlowingButton glowSize={'0.3rem'} buttonColor={'white'} width={'50%'} onClick={onConnectClick}>
                <span>
                  <PiArrowsClockwiseLight></PiArrowsClockwiseLight>
                  Replace
                </span>
              </GlowingButton>
              <GlowingButton glowSize={'0.3rem'} buttonColor={'red'} width={'40%'} onClick={onSellClick}>
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
              <GlowingButton glowSize={'0.3rem'} width={'50%'} onClick={onConnectClick}>Connect PC</GlowingButton>
              <GlowingButton glowSize={'0.3rem'} buttonColor={'red'} width={'40%'} onClick={onSellClick}>
                <span>
                  <PiCoinVerticalLight></PiCoinVerticalLight>
                  Sell
                </span>
              </GlowingButton>
            </div>
            <GlowingButton glowSize={'0.3rem'} buttonColor={'white'} width={'50%'} onClick={onInfoClick}>
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

function ItemPc({ pc, onInfoClick, onSellClick }) {
  return (
    <div className={s.item}>
      <div className={s.itemIcon}>
        <div className={`${s.itemImage} ${s.border}`}>
          <img className={pc.state ? `glow-${pc.rarity}` : ''} src={getPcImage(pc.rarity)}></img>
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
            <GlowingButton glowSize={'0.3rem'} buttonColor={'white'} width={'50%'} onClick={onInfoClick}>
              <span>
                <PiInfoLight></PiInfoLight>
                Info
              </span>
            </GlowingButton>
            <GlowingButton glowSize={'0.3rem'} buttonColor={'red'} width={'40%'} onClick={onSellClick}>
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

  const [showAiInfo, setShowAiInfo] = useState(false);
  const [aiInfo, setAiInfo] = useState({});

  const [showPcInfo, setShowPcInfo] = useState(false);
  const [pcInfo, setPcInfo] = useState({});

  const [connectAi, setConnectAi] = useState(false);
  const [aiConnectionData, setAiConnectionData] = useState({});

  const [sellAi, setSellAi] = useState(false);
  const [listingAi, setListingAi] = useState({});

  const [sellPc, setSellPc] = useState(false);
  const [listingPc, setListingPc] = useState({});

  function closeAiInfo() {
    setShowAiInfo(false);
    setAiInfo({});
  }

  function closePcInfo() {
    setShowPcInfo(false);
    setPcInfo({});
  }

  function closeAiConnection() {
    setConnectAi(false);
    setAiConnectionData({});
  }

  function closeAiSell() {
    setSellAi(false);
    setListingAi({});
  }

  function closePcSell() {
    setSellPc(false);
    setListingPc({});
  }

  return (
    <>
      <ConnectPc isActive={connectAi} onClose={closeAiConnection} curAi={aiConnectionData}></ConnectPc>
      <PopUp isActive={showAiInfo} onClose={closeAiInfo}>
        <div className={infoPopUpStyle.container}>
          <div className={infoPopUpStyle.image}>
            <img src={getAiImage(aiInfo.rarity)} className={`glow-${aiInfo.rarity}`}></img>
          </div>
          <div className={infoPopUpStyle.centeredText}>
            Rarity: <span className={`text-${aiInfo.rarity}`} style={{fontWeight: 'bold', fontSize: 'large'}}>{aiInfo.rarity}</span>
          </div>
          <div className={infoPopUpStyle.centeredText}>
            This <span className={infoPopUpStyle.greenHighlight}>AI</span> has not been used yet. <span className={infoPopUpStyle.greenHighlight}>Connect PC</span> to it to start using. Then the AI will start to bring you profit
          </div>
          Every PC connected to this AI will be farming tokens during this time:<br />
          <span className={`${infoPopUpStyle.iconWrapper} ${infoPopUpStyle.greenHighlight}`}>
            <PiClockBold></PiClockBold>
            {aiInfo.timer} Hours
          </span>
          <br />
          You can link this many PCs to the AI:
          <span className={`${infoPopUpStyle.iconWrapper} text-common`}>
            <PiDesktopBold></PiDesktopBold>
            N Common PCs
          </span>
          <span className={`${infoPopUpStyle.iconWrapper} text-uncommon`}>
            <PiDesktopBold></PiDesktopBold>
            N Uncommon PCs
          </span>
          <span className={`${infoPopUpStyle.iconWrapper} text-rare`}>
            <PiDesktopBold></PiDesktopBold>
            N Rare PCs
          </span>
          <span className={`${infoPopUpStyle.iconWrapper} text-epic`}>
            <PiDesktopBold></PiDesktopBold>
            N Epic PCs
          </span>
          <span className={`${infoPopUpStyle.iconWrapper} text-legendary`}>
            <PiDesktopBold></PiDesktopBold>
            N Legendary PCs
          </span>
          <span className={`${infoPopUpStyle.iconWrapper} text-ultra`}>
            <PiDesktopBold></PiDesktopBold>
            N Ultra PCs
          </span>
          <span className={`${infoPopUpStyle.iconWrapper} text-mythic`}>
            <PiDesktopBold></PiDesktopBold>
            N Mythic PCs
          </span>
          
        </div>
        <div className={infoPopUpStyle.buttonContainer}>
          <GlowingButton>Connect PC</GlowingButton>
        </div>
      </PopUp>

      <PopUp isActive={showPcInfo} onClose={closePcInfo}>
        <div className={infoPopUpStyle.container}>
          <div className={infoPopUpStyle.image}>
            <img src={getPcImage(pcInfo.rarity)} className={`glow-${pcInfo.rarity}`}></img>
          </div>
          <div className={infoPopUpStyle.centeredText}>
            Rarity: <span className={`text-${pcInfo.rarity}`} style={{fontWeight: 'bold', fontSize: 'large'}}>{pcInfo.rarity}</span>
          </div>
          <div className={infoPopUpStyle.centeredText}>
            While the <span className={infoPopUpStyle.greenHighlight}>PC is not activated</span>, you can sell it. As soon as you start using it, you will not be able to list it on the market
          </div>
          Earnings per hour:<br />
          <span className={`priceWrapper ${infoPopUpStyle.greenHighlight}`} style={{fontSize: 'x-large'}}>
            <img src={tokenIcon} style={{marginRight: '0.2em', marginLeft: '0em'}}></img>
            {pcInfo.tokenCount}/hour
          </span>
          <br />
          PC duration:<br />
          <span className={`${infoPopUpStyle.iconWrapper} ${infoPopUpStyle.greenHighlight}`}>
            <PiClockBold></PiClockBold>
            N Hours
          </span>
          <br />
          This PC takes up this many slots for each AI:
          <span className={`${infoPopUpStyle.aiSlotsWrapper} text-common`}>
            <img src={getAiImage('common')} className='glow-common'></img>
            N for common AI
          </span>
          <span className={`${infoPopUpStyle.aiSlotsWrapper} text-uncommon`}>
            <img src={getAiImage('uncommon')} className='glow-uncommon'></img>
            N for uncommon AI
          </span>
          <span className={`${infoPopUpStyle.aiSlotsWrapper} text-rare`}>
            <img src={getAiImage('rare')} className='glow-rare'></img>
            N for rare AI
          </span>
          <span className={`${infoPopUpStyle.aiSlotsWrapper} text-epic`}>
            <img src={getAiImage('epic')} className='glow-epic'></img>
            N for epic AI
          </span>
          <span className={`${infoPopUpStyle.aiSlotsWrapper} text-legendary`}>
            <img src={getAiImage('legendary')} className='glow-legendary'></img>
            N for legendary AI
          </span>
          <span className={`${infoPopUpStyle.aiSlotsWrapper} text-ultra`}>
            <img src={getAiImage('ultra')} className='glow-ultra'></img>
            N for ultra AI
          </span>
          <span className={`${infoPopUpStyle.aiSlotsWrapper} text-mythic`}>
            <img src={getAiImage('mythic')} className='glow-mythic'></img>
            N for mythic AI
          </span>
          
        </div>
      </PopUp>

      <ListAi ai={listingAi} isActive={sellAi} onClose={closeAiSell}></ListAi>

      <ListPc pc={listingPc} isActive={sellPc} onClose={closePcSell}></ListPc>

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
            return <ItemAi key={ai.id} ai={ai} 
            onConnectClick={() => {
              setAiConnectionData(ai);
              setConnectAi(true);
            }}
            onInfoClick={() => {
              setAiInfo(ai);
              setShowAiInfo(true);
            }}
            onSellClick={() => {
              setListingAi(ai);
              setSellAi(true);
            }}></ItemAi>
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
            return <ItemPc key={pc.id} pc={pc} 
            onInfoClick={() => {
              setPcInfo(pc);
              setShowPcInfo(true);
            }}
            onSellClick={() => {
              setListingPc(pc);
              setSellPc(true);
            }}></ItemPc>
          }) :
          <></>
        }
      </div>
    </>
  )
}