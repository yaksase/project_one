import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PiCoinsLight, PiClockLight, PiDesktopLight, PiCheckBold } from 'react-icons/pi';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import PositiveNotification from '../../Components/PositiveNotification/PositiveNotification';
import PcSlider from '../../Components/PcSlider/PcSlider';
import AiSlider from '../../Components/AiSlider/AiSlider';
import HealthBar from '../../Components/HealthBar/HealthBar';
import ConnectPc from '../../Components/ConnectPc/ConnectPc';

import getPcImage from '../../utils/getPcImage.js';
import getAiImage from '../../utils/getAiImage.js';

import UnknownPc from '../../assets/pc/pc_unknown.png';
import UnknownAi from '../../assets/ai/ai_unknown.png';

import CommonAi from '../../assets/ai/ai_common.png';

import homeStyle from './Home.module.css';
import axiosInstance from '../../axios.js';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen.jsx';
import getRarity from '../../utils/getRarity.js';

function getPcImageComponent(rarity = null) {
  const src = getPcImage(rarity);
  let width;

  switch (rarity) {
    case 'common':
    case 'uncommon':
    case 'rare':
    default:
      width = '80%';
      break;

    case 'epic':
    case 'ultra':
    case 'legendary':
      width = '95%';
      break;

    case 'mythic':
      width = '70%';
      break;
  }
  return <img src={src} style={{ width: width }}></img>
}

UnclaimedHome.propTypes = {
  pcClaimed: PropTypes.bool.isRequired,
  getPc: PropTypes.func.isRequired,
  aiClaimed: PropTypes.bool.isRequired,
  getAi: PropTypes.func.isRequired
}

function UnclaimedHome({ pcClaimed, getPc, aiClaimed, getAi }) {
  const [freePcsLeft, setFreePcsLeft] = useState(0);

  const [pcNotif, showPcNotif] = useState(false);
  const [aiNotif, showAiNotif] = useState(false);

  function claimPc() {
    axiosInstance.put('/api/inventory/free_pc')
      .then(() => {
        showPcNotif(true);
      })
  }

  function claimAi() {
    axiosInstance.put('/api/inventory/free_ai')
      .then(() => {
        showAiNotif(true);
      })
  }
  
  useEffect(() => {
    axiosInstance.get('/api/free_pc')
      .then((res) => {
        setFreePcsLeft(res.data['amount']);
      })
  }, [pcClaimed]);

  return (
    <>
      {/* Free Pc Claim */}
      <PositiveNotification isActive={pcNotif} onClose={() => { showPcNotif(false); getPc(true); }}>
        <img src={getPcImage('common')} className='glow-common'></img>
        <span>
          Claimed
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      {/* Free Ai Claim */}
      <PositiveNotification isActive={aiNotif} onClose={() => { showAiNotif(false); getAi(true); }}>
        <img src={getAiImage('common')} className='glow-common'></img>
        <span>
          Claimed
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <div className={homeStyle.container}>
        {
          freePcsLeft <= 0 ?
          <></>
          :
          <div className={homeStyle.freeDropsCount}>
            {freePcsLeft} free PCs left
          </div>
        }
        <div className={homeStyle.pcContainer}>
          {
            pcClaimed ?
              <>
                <img className='glow-common' src={getPcImage('common')}></img>
                <span className={homeStyle.claimedText}>Pc Claimed <PiCheckBold></PiCheckBold></span>
              </>
              :
              <>
                <img className='glow-positive' src={UnknownPc}></img>
                <GlowingButton onClick={() => claimPc()}>Claim PC</GlowingButton>
              </>
          }
        </div>
        <div className={homeStyle.aiContainer}>
          <div className={homeStyle.aiData}>
            <span><PiCoinsLight></PiCoinsLight> Shit</span>
            <span><PiClockLight></PiClockLight> Piss</span>
            <span><PiDesktopLight></PiDesktopLight> Cum</span>
          </div>
          {
            aiClaimed ?
              <div className={homeStyle.aiShow}>
                <img className='glow-common' src={CommonAi}></img>
              </div>
              :
              <div className={homeStyle.aiClaim}>
                <img className='glow-positive' src={UnknownAi}></img>
                <GlowingButton onClick={() => claimAi()} >Claim Ai</GlowingButton>
              </div>
          }
        </div>
      </div>
    </>
  )
}

function ClaimedHome() {
  const [curAi, setCurAi] = useState(0);

  const [connectionAi, setConnectionAi] = useState({});
  const [showConnectAi, setShowConnectAi] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    axiosInstance('/api/inventory/ai')
      .then((res) => {
        setData(res.data);
      })
  }, [])

  if (data == null) {
    return <LoadingScreen></LoadingScreen>
  }
  return (
    <>
      <ConnectPc isActive={showConnectAi} setIsActive={setShowConnectAi} curAi={connectionAi} setCurAi={setConnectionAi}></ConnectPc>

      <div className={homeStyle.container}>
        {data.map((ai, index) =>
          <PcSlider key={ai.id} hidden={curAi === index ? false : true}>
            {
              ai.pcs.length == 0 ?
              <div className={homeStyle.pcHealth}>
                <img className={`glow-positive`} width={'80%'} style={{paddingTop: '2rem'}} src={getPcImage()}></img>
                <div className={homeStyle.overPcText}>
                  You've got no PCs connected to this AI. Tap on AI icon below to proceed to PC connection.
                </div>
              </div> :
              ai.pcs.map((pc) =>
                <div key={pc.id} className={homeStyle.pcHealth}>
                  {getPcImageComponent(getRarity(pc.rarity))}
                  <div className={homeStyle.healthBar}>
                    <HealthBar percentage={pc.health}></HealthBar>
                  </div>
                </div>)
            }
          </PcSlider>
        )}
        <AiSlider curPageHook={setCurAi}>
          {data.map((ai) =>
            <div key={ai.id} className={homeStyle.aiSlideWrapper}>
              <div className={homeStyle.aiContainer}>
                <div className={homeStyle.aiData}>
                  <span><PiCoinsLight></PiCoinsLight> Shit</span>
                  <span><PiClockLight></PiClockLight> Piss</span>
                  <span><PiDesktopLight></PiDesktopLight> Cum</span>
                </div>
                <div className={homeStyle.aiShow} onClick={() => {
                  setConnectionAi(data[curAi]);
                  setShowConnectAi(true);
                }}>
                  <img className={`glow-${getRarity(ai.rarity)}`} src={getAiImage(getRarity(ai.rarity))}></img>
                </div>
              </div>
            </div>
          )}
        </AiSlider>
      </div>
    </>
  )
}

export default function Home() {
  const [pcLoading, setPcLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);

  const [pcClaimed, getPc] = useState(false);
  const [aiClaimed, getAi] = useState(false);

  useEffect(() => {
    axiosInstance.get('/api/inventory/pc?limit=1')
      .then((res) => {
        if (res.data.length !== 0) {
          getPc(true);
        }
        setPcLoading(false);
      })
  }, [])

  useEffect(() => {
    axiosInstance.get('/api/inventory/ai?limit=1')
      .then((res) => {
        if (res.data.length !== 0) {
          getAi(true);
        }
        setAiLoading(false);
      })
  }, [])

  if (aiLoading + pcLoading) {
    return (
      <LoadingScreen></LoadingScreen>
    )
  }
  if (pcClaimed * aiClaimed) {
    return <ClaimedHome></ClaimedHome>
  } else {
    return <UnclaimedHome pcClaimed={pcClaimed} getPc={getPc} aiClaimed={aiClaimed} getAi={getAi}></UnclaimedHome>
  }
}