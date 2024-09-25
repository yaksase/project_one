import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PiCoinVerticalLight, PiInfoLight, PiPercentLight, PiDesktopLight, PiArrowsClockwiseLight, PiClockLight, PiCheckBold } from 'react-icons/pi';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import PopUp from '../../Components/PopUp/PopUp';
import ConnectPc from '../../Components/ConnectPc/ConnectPc';
import PositiveNotification from '../../Components/PositiveNotification/PositiveNotification';
import Input from '../../Components/Input/Input';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen.jsx';
import AiGeneralInfo from '../../Components/ItemGeneralInfo/AiGeneralInfo.jsx';
import PcGeneralInfo from '../../Components/ItemGeneralInfo/PcGeneralInfo.jsx';

import getRarity from '../../utils/getRarity.js';
import getAiImage from '../../utils/getAiImage.js';
import getPcImage from '../../utils/getPcImage.js';

import tokenIcon from '../../assets/token_icon.png';

import s from './Inventory.module.css';
import actSelStyle from './ActivatedSelector.module.css';
import typeSelStyle from './TypeSelector.module.css';
import infoPopUpStyle from './InfoPopUp.module.css';
import listStyle from './List.module.css';
import axiosInstance from '../../axios.js';

 ActivatedSelector.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  notActive: PropTypes.bool.isRequired,
  setNotActive: PropTypes.func.isRequired
 }

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

TypeSelector.propTypes = {
  showPc: PropTypes.bool.isRequired,
  setShowPc: PropTypes.func.isRequired,
  showAi: PropTypes.bool.isRequired,
  setShowAi: PropTypes.func.isRequired
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

ItemAi.propTypes = {
  ai: PropTypes.object.isRequired,
  onInfoClick: PropTypes.func.isRequired,
  onConnectClick: PropTypes.func.isRequired,
  onSellClick: PropTypes.func.isRequired
}

function ItemAi({ ai, onInfoClick, onConnectClick, onSellClick }) {
  return (
    <div className={s.item}>
      <div className={s.itemIcon}>
        <div className={`${s.itemImage} ${s.border}`}>
          <img className={ai.state ? `glow-${getRarity(ai.rarity)}` : ''} src={getAiImage(getRarity(ai.rarity))}></img>
        </div>
        <div className={`${s.itemRarity} ${s.border} text-${getRarity(ai.rarity)}`}>
          {getRarity(ai.rarity)}
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
                <div style={{ width: '50%' }}>
                  <span className={`${s.border} ${s.infoWrapper}`} >
                    <PiClockLight></PiClockLight>
                    {ai.timer} hours
                  </span>
                </div>
                <div style={{ width: '40%' }}>
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

ItemPc.propTypes = {
  pc: PropTypes.object.isRequired,
  onInfoClick: PropTypes.func.isRequired,
  onSellClick: PropTypes.func.isRequired
}

function ItemPc({ pc, onInfoClick, onSellClick }) {
  return (
    <div className={s.item}>
      <div className={s.itemIcon}>
        <div className={`${s.itemImage} ${s.border}`}>
          <img className={pc.state ? `glow-${getRarity(pc.rarity)}` : ''} src={getPcImage(getRarity(pc.rarity))}></img>
        </div>
        <div className={`${s.itemRarity} ${s.border} text-${getRarity(pc.rarity)}`}>
          {getRarity(pc.rarity)}
        </div>
      </div>
      <div className={s.itemMenu}>
        {
          pc.state ?
            <>
              <div className={s.buttonsRow}>
                <div style={{ width: '45%' }}>
                  <span className={`priceWrapper ${s.border} ${s.infoWrapper}`} >
                    <img src={tokenIcon}></img>
                    {pc.tokenCount}/hour
                  </span>
                </div>
                <div style={{ width: '45%' }}>
                  <span className={`${s.border} ${s.infoWrapper}`}>
                    <PiPercentLight></PiPercentLight>
                    {pc.health}
                  </span>
                </div>
              </div>
              <div className={s.buttonsRow}>
                <div style={{ width: '45%' }}>
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

ListAi.propTypes = {
  ai: PropTypes.object.isRequired,
  setAi: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired
}

function ListAi({ ai, setAi, isActive, setIsActive }) {
  const [notification, setNotification] = useState(false);
  const [price, setPrice] = useState('');

  return (
    <>
      <PositiveNotification isActive={notification} onClose={() => {
        setNotification(false);
        setAi({});
      }}>
        <img src={getAiImage(getRarity(ai.rarity))} className={`glow-${getRarity(ai.rarity)}`}></img>
        <span>
          Listed
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PopUp isActive={isActive} onClose={() => {
        setIsActive(false);
        setPrice('');
      }}>
        <div className={listStyle.container}>
          <div className={listStyle.image}>
            <img src={getAiImage(getRarity(ai.rarity))} className={`glow-${getRarity(ai.rarity)}`}></img>
            <span className={`text-${getRarity(ai.rarity)}`}>{getRarity(ai.rarity)}</span>
          </div>
          <div className={listStyle.controlsContainer}>
            <Input value={price} setValue={setPrice} placeholder='Price'></Input>
            <div className={listStyle.buttonContainer}>
              {
                price == '' || price == '0' ?
                <GlowingButton width={'40vw'} glowSize={'0.2em'} buttonColor={'orange'} disabled={true}>List</GlowingButton> :
                <GlowingButton width={'40vw'} glowSize={'0.2em'} buttonColor={'orange'} 
                onClick={() => {
                  setPrice('');
                  setNotification(true);
                  setIsActive(false);
                }}>List</GlowingButton>
              }
            </div>
          </div>
        </div>
      </PopUp>
    </>
  )
}

ListPc.propTypes = {
  pc: PropTypes.object.isRequired,
  setPc: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired
}

function ListPc({ pc, setPc, isActive, setIsActive }) {
  const [notification, setNotification] = useState(false);
  const [price, setPrice] = useState('');

  return (
    <>
      <PositiveNotification isActive={notification} onClose={() => {
        setNotification(false);
        setPc({});
      }}>
        <img src={getPcImage(getRarity(pc.rarity))} className={`glow-${getRarity(pc.rarity)}`}></img>
        <span>
          Listed
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PopUp isActive={isActive} onClose={() => {
        setPrice('');
        setIsActive(false);
      }}>
        <div className={listStyle.container}>
          <div className={listStyle.image}>
            <img src={getPcImage(getRarity(pc.rarity))} className={`glow-${getRarity(pc.rarity)}`}></img>
            <span className={`text-${getRarity(pc.rarity)}`}>{getRarity(pc.rarity)}</span>
          </div>
          <div className={listStyle.controlsContainer}>
            <Input value={price} setValue={setPrice} placeholder='Price'></Input>
            <div className={listStyle.buttonContainer}>
              {
                price == '' || price == '0' ?
                <GlowingButton width={'40vw'} glowSize={'0.2em'} buttonColor={'orange'} disabled={true}>List</GlowingButton> :
                <GlowingButton width={'40vw'} glowSize={'0.2em'} buttonColor={'orange'} 
                onClick={() => {
                  setPrice('');
                  setNotification(true);
                  setIsActive(false);
                }}>List</GlowingButton>
              }
            </div>
          </div>
        </div>
      </PopUp>
    </>
  )
}

export default function Inventory() {
  const [aiData, setAiData] = useState(null);
  const [pcData, setPcData] = useState(null);

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

  useEffect(() => {
    axiosInstance.get('/api/inventory/pc')
      .then((res) => {
        setPcData(res.data);
      })

    axiosInstance.get('/api/inventory/ai')
      .then((res) => {
        setAiData(res.data);
      })
  }, [])

  if (!pcData + !aiData) {
    return (
      <LoadingScreen></LoadingScreen>
    )
  }

  return (
    <>
      <ConnectPc isActive={connectAi} setIsActive={setConnectAi} curAi={aiConnectionData} setCurAi={setAiConnectionData}></ConnectPc>
      <PopUp isActive={showAiInfo} onClose={closeAiInfo}>
        <div className={infoPopUpStyle.container}>
          <AiGeneralInfo aiInfo={aiInfo}></AiGeneralInfo>
        </div>
        <div className={infoPopUpStyle.buttonContainer}>
          <GlowingButton onClick={() => {
            setShowAiInfo(false);
            setConnectAi(true);
            setAiConnectionData(aiInfo);
            setAiInfo({});
          }}>Connect PC</GlowingButton>
        </div>
      </PopUp>

      <PopUp isActive={showPcInfo} onClose={closePcInfo}>
        <div className={infoPopUpStyle.container}>
          <PcGeneralInfo pcInfo={pcInfo}></PcGeneralInfo>
        </div>
      </PopUp>

      <ListAi ai={listingAi} setAi={setListingAi} isActive={sellAi} setIsActive={setSellAi}></ListAi>

      <ListPc pc={listingPc} setPc={setListingPc} isActive={sellPc} setIsActive={setSellPc}></ListPc>

      <div className={s.container}>
        <ActivatedSelector active={active} setActive={setActive} notActive={notActive} setNotActive={setNotActive}></ActivatedSelector>
        <TypeSelector showPc={showPc} setShowPc={setShowPc} showAi={showAi} setShowAi={setShowAi}></TypeSelector>
        {
          showAi || showAi == showPc ?
            aiData.map((ai) => {
              if (active && !ai.is_activated) {
                return <></>
              }
              if (notActive && ai.is_activated) {
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
              if (active && !pc.is_activated) {
                return <></>
              }
              if (notActive && pc.is_activated) {
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