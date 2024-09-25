import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { PiTrashLight, PiArrowUUpLeftLight, PiClockBold, PiDesktopBold } from "react-icons/pi";

import PopUp from "../PopUp/PopUp"
import AvailablePc from "./AvailablePc";
import NotificationBase from "../NotificationBase/NotificationBase";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

import getAiImage from "../../utils/getAiImage.js";
import getPcImage from "../../utils/getPcImage.js";
import getRarity from "../../utils/getRarity.js";
import tokenIcon from '../../assets/token_icon.png';
import axiosInstance from "../../axios.js";

import s from './ConnectPc.module.css';
import GlowingButton from "../GlowingButton/GlowingButton";

const pcData = [
  {
    id: 1,
    rarity: 'mythic',
    slots: 7
  }
]

ConnectPc.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  curAi: PropTypes.object.isRequired,
  setCurAi: PropTypes.func.isRequired
}

export default function ConnectPc({ isActive, setIsActive, curAi, setCurAi }) {
  const [availablePc, setAvailablePc] = useState(null);
  const [connectedPc, setConnectedPc] = useState([]);
  const [slotsData, setSlotsData] = useState(new Array(10).fill(null));
  const [curPcPage, setCurPcPage] = useState(0);

  const [connectionNotif, setConnectionNotif] = useState(false);

  // TODO: move filtering to backend
  useEffect(() => {
    axiosInstance.get('/api/inventory/pc?is_connected=0')
      .then((res) => {
        setAvailablePc(res.data.filter((pc) => curAi.slots[pc.rarity] != null && curAi.slots[pc.rarity] <= 10 - curAi.slots_taken));
      })
  }, [curAi])

  useEffect(() => {

  }, [])

  function onPcSelect(pc) {
    const newConnectedPc = [
      ...connectedPc,
      pc
    ];
    let totalSlots = 0;
    for (const pc of newConnectedPc) {
      totalSlots += pc.slots;
    }
    if (totalSlots > 10) {
      return;
    }
    const newArray = availablePc.filter((e) => e.id !== pc.id);
    setAvailablePc(newArray);
    setConnectedPc(newConnectedPc);
  }

  function onClear() {
    setAvailablePc(pcData)
    setConnectedPc([]);
  }

  function onUndo() {
    if (connectedPc.length == 0) {
      return;
    }
    const lastPc = connectedPc[connectedPc.length - 1];
    const newAvailablePc = [];
    let addLastPc = true;
    for (const pc of availablePc) {
      if (lastPc.id < pc.id && addLastPc) {
        newAvailablePc.push(lastPc);
        addLastPc = false;
      }
      newAvailablePc.push(pc);
    }
    if (addLastPc) {
      newAvailablePc.push(lastPc);
    }
    setConnectedPc(connectedPc.splice(0, connectedPc.length - 1));
    setAvailablePc(newAvailablePc);
  }

  useEffect(() => {
    let newSlotsData = new Array(10).fill(null);
    let prevSlots = 0;
    connectedPc.map((pc) => {
      for (let i = prevSlots; i < prevSlots + pc.slots; i++) {
        newSlotsData[i] = pc.rarity;
      }
      prevSlots = prevSlots + pc.slots;
    })
    setSlotsData(newSlotsData);
  }, [connectedPc])

  return (
    <>
      <NotificationBase isActive={connectionNotif} onClose={() => {
        setConnectionNotif(false);
        setCurAi({});
      }}>
        <div className={s.container}>
          <div className={s.image}>
            <img src={getAiImage(getRarity(curAi.rarity))} className={`glow-${getRarity(curAi.rarity)}`}></img>
          </div>
          <div className={s.centeredText}>
            Rarity: <span className={`text-${getRarity(curAi.rarity)}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{getRarity(curAi.rarity)}</span>
          </div>
          <div className={s.centeredText} style={{ marginBottom: '0.5rem' }}>
            Connected PCs:
          </div>
          <div className={s.selectedPcRow}>
            {slotsData.slice(0, 6).map((rarity, index) => {
              return (
                <div key={index} className={s.selectedPc} style={rarity ? { '--border-color': `var(--${rarity}-color)` } : {}}>
                  {rarity == null ? <></> : <img src={getPcImage(rarity)}></img>}
                </div>
              )
            })}
          </div>
          <div className={s.selectedPcRow} style={{marginBottom: '1rem'}}>
            {slotsData.slice(6, 10).map((rarity, index) => {
              return (
                <div key={index} className={s.selectedPc} style={rarity ? { '--border-color': `var(--${rarity}-color)` } : {}}>
                  {rarity == null ? <></> : <img src={getPcImage(rarity)}></img>}
                </div>
              )
            })}
          </div>
          Claim tokens every:<br />
          <span className={`${s.iconWrapper} greenHighlight`} style={{fontSize: 'x-large'}}>
            <PiClockBold></PiClockBold>
            N Hours
          </span><br />
          Slots taken:<br />
          <span className={`${s.iconWrapper} greenHighlight`} style={{fontSize: 'x-large'}}>
            <PiDesktopBold></PiDesktopBold>
            N/N Slots
          </span><br />
          Hourly earnings:<br />
          <span className='priceWrapper greenHighlight' style={{fontSize: 'x-large'}}>
            32,760
            <img src={tokenIcon} className="glow-rare"></img>
            /hour
          </span>
        </div>
      </NotificationBase>

      <PopUp isActive={isActive} onClose={() => {
        setCurAi({});
        setIsActive(false);
      }}>
        {
          availablePc ?
          <>
            <div className={s.container}>
              <div className={s.image}>
                <img src={getAiImage(getRarity(curAi.rarity))} className={`glow-${getRarity(curAi.rarity)}`}></img>
              </div>
              <div className={s.centeredText}>
                Rarity: <span className={`text-${getRarity(curAi.rarity)}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{getRarity(curAi.rarity)}</span>
              </div>
              <div className={s.centeredText}>
                Click on an <span className='greenHighlight'>available PC</span> to connect it to the AI
              </div>
              <div className={s.centeredText} style={{ marginBottom: '0.5rem' }}>
                Connected PCs:
              </div>
              <div className={s.selectedPcRow}>
                {slotsData.slice(0, 6).map((rarity, index) => {
                  return (
                    <div key={index} className={s.selectedPc} style={rarity ? { '--border-color': `var(--${rarity}-color)` } : {}}>
                      {rarity == null ? <></> : <img src={getPcImage(rarity)}></img>}
                    </div>
                  )
                })}
              </div>
              <div className={s.selectedPcRow}>
                <div className={s.selectedPcControl} onClick={() => onClear()}>
                  <PiTrashLight></PiTrashLight>
                  <span>Clear</span>
                </div>
                {slotsData.slice(6, 10).map((rarity, index) => {
                  return (
                    <div key={index} className={s.selectedPc} style={rarity ? { '--border-color': `var(--${rarity}-color)` } : {}}>
                      {rarity == null ? <></> : <img src={getPcImage(rarity)}></img>}
                    </div>
                  )
                })}
                <div className={s.selectedPcControl} onClick={() => onUndo()}>
                  <PiArrowUUpLeftLight></PiArrowUUpLeftLight>
                  <span>Undo</span>
                </div>
              </div>
              <br />
              <div className={s.centeredText} style={{ marginBottom: '0.5rem' }}>
                Select <span className='greenHighlight'>available PC</span>:
              </div>
              {
                availablePc.length == 0 ?
                  <div className={s.centeredText}>No PC available</div> :
                  <AvailablePc curPage={curPcPage} setCurPage={setCurPcPage}>
                    {
                      availablePc.map((pc) => {
                        return (
                          <div key={pc.id} className={s.availablePc} >
                            <div onClick={() => onPcSelect(pc)} className={s.availablePcImage} style={{ '--border-color': `var(--${getRarity(pc.rarity)}-color)` }}>
                              <img src={getPcImage(getRarity(pc.rarity))}></img>
                            </div>
                            <div className={s.availablePcSlots}>
                              {pc.slots[curAi.rarity]} {pc.slots[curAi.rarity] == 1 ? 'slot' : 'slots'}
                            </div>
                          </div>
                        )
                      })
                    }
                  </AvailablePc>
              }

            </div>
            <div className={s.buttonContainer}>
              <GlowingButton onClick={() => {
                setConnectionNotif(true);
                setIsActive(false);
              }}>Connect PC</GlowingButton>
            </div>
          </> :
          <loading-placeholder color="white" size="80"></loading-placeholder>
        }
        
      </PopUp>
    </>
    
  )
}