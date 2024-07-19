/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { PiTrashLight, PiArrowUUpLeftLight, PiClockBold, PiDesktopBold } from "react-icons/pi";

import PopUp from "../PopUp/PopUp"
import AvailablePc from "./AvailablePc";
import NotificationBase from "../NotificationBase/NotificationBase";

import getAiImage from "../../utils/getAiImage";
import getPcImage from "../../utils/getPcImage";
import tokenIcon from '../../assets/token_icon.png';

import s from './ConnectPc.module.css';
import GlowingButton from "../GlowingButton/GlowingButton";

const pcData = [
  {
    id: 1,
    rarity: 'mythic',
    slots: 7
  },
  {
    id: 2,
    rarity: 'ultra',
    slots: 6
  },
  {
    id: 3,
    rarity: 'legendary',
    slots: 5
  },
  {
    id: 4,
    rarity: 'epic',
    slots: 4
  },
  {
    id: 5,
    rarity: 'rare',
    slots: 3
  },
  {
    id: 6,
    rarity: 'uncommon',
    slots: 2
  },
  {
    id: 7,
    rarity: 'common',
    slots: 1
  }
]

export default function ConnectPc({ isActive, setIsActive, curAi, setCurAi }) {
  const [availablePc, setAvailablePc] = useState(pcData);
  const [connectedPc, setConnectedPc] = useState([]);
  const [slotsData, setSlotsData] = useState(new Array(10).fill(null));

  const [connectionNotif, setConnectionNotif] = useState(false);

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
            <img src={getAiImage(curAi.rarity)} className={`glow-${curAi.rarity}`}></img>
          </div>
          <div className={s.centeredText}>
            Rarity: <span className={`text-${curAi.rarity}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{curAi.rarity}</span>
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
          <span className={`${s.iconWrapper} ${s.greenHighlight}`} style={{fontSize: 'x-large'}}>
            <PiClockBold></PiClockBold>
            N Hours
          </span><br />
          Slots taken:<br />
          <span className={`${s.iconWrapper} ${s.greenHighlight}`} style={{fontSize: 'x-large'}}>
            <PiDesktopBold></PiDesktopBold>
            N/N Slots
          </span><br />
          Hourly earnings:<br />
          <span className={`priceWrapper ${s.greenHighlight}`} style={{fontSize: 'x-large'}}>
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
        <div className={s.container}>
          <div className={s.image}>
            <img src={getAiImage(curAi.rarity)} className={`glow-${curAi.rarity}`}></img>
          </div>
          <div className={s.centeredText}>
            Rarity: <span className={`text-${curAi.rarity}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{curAi.rarity}</span>
          </div>
          <div className={s.centeredText}>
            Click on an <span className={s.greenHighlight}>available PC</span> to connect it to the AI
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
            Select <span className={s.greenHighlight}>available PC</span>:
          </div>
          {
            availablePc.length == 0 ?
              <div className={s.centeredText}>No PC available</div> :
              <AvailablePc>
                {
                  availablePc.map((pc) => {
                    return (
                      <div key={pc.id} className={s.availablePc} >
                        <div onClick={() => onPcSelect(pc)} className={s.availablePcImage} style={{ '--border-color': `var(--${pc.rarity}-color)` }}>
                          <img src={getPcImage(pc.rarity)}></img>
                        </div>
                        <div className={s.availablePcSlots}>
                          {pc.slots} {pc.slots == 1 ? 'slot' : 'slots'}
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
      </PopUp>
    </>
    
  )
}