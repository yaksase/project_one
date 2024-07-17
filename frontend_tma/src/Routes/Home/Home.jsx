import { useState } from 'react';
import { PiCoinsLight, PiClockLight, PiDesktopLight, PiCheckBold } from 'react-icons/pi';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import PositiveNotification from '../../Components/PositiveNotification/PositiveNotification';
import PcSlider from '../../Components/PcSlider/PcSlider';
import AiSlider from '../../Components/AiSlider/AiSlider';
import HealthBar from '../../Components/HealthBar/HealthBar';

import getPcImage from '../../utils/getPcImage';
import getAiImage from '../../utils/getAiImage';

import UnknownPc from '../../assets/pc/pc_unknown.png';
import UnknownAi from '../../assets/ai/ai_unknown.png';

import CommonAi from '../../assets/ai/ai_common.png';

import homeStyle from './Home.module.css';

const payload = [
  {
    id: 434,
    rarity: 'common',
    pc: [
      {
        id: 111,
        rarity: 'ultra',
        health: 60
      },
      {
        id: 12311,
        rarity: 'epic',
        health: 90
      },
      {
        id: 111333,
        rarity: 'rare',
        health: 20
      },
    ]
  },
  {
    id: 2122,
    rarity: 'ultra',
    pc: [
      {
        id: 112222222,
        rarity: 'epic',
        health: 33
      },
      {
        id: 433,
        rarity: 'common',
        health: 10
      },
      {
        id: 44,
        rarity: 'uncommon',
        health: 40,
      },
    ]
  },
  {
    id: 1255,
    rarity: 'legendary',
    pc: [
      {
        id: 55,
        rarity: 'legendary',
        health: 70
      },
      {
        id: 991,
        rarity: 'ultra',
        health: 10
      },
      {
        id: 11100,
        rarity: 'mythic',
        health: 98
      }
    ]
  },
  {
    id: 4444444,
    rarity: 'legendary',
    pc: [
      {
        id: 55,
        rarity: 'legendary',
        health: 70
      },
      {
        id: 991,
        rarity: 'ultra',
        health: 10
      },
      {
        id: 11100,
        rarity: 'mythic',
        health: 98
      }
    ]
  },
  {
    id: 123314124,
    rarity: 'legendary',
    pc: [
      {
        id: 55,
        rarity: 'legendary',
        health: 70
      },
      {
        id: 991,
        rarity: 'ultra',
        health: 10
      },
      {
        id: 11100,
        rarity: 'mythic',
        health: 98
      }
    ]
  },
  {
    id: 8484,
    rarity: 'legendary',
    pc: [
      {
        id: 55,
        rarity: 'legendary',
        health: 70
      },
      {
        id: 991,
        rarity: 'ultra',
        health: 10
      },
      {
        id: 11100,
        rarity: 'mythic',
        health: 98
      }
    ]
  }
];

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

export default function Home() {
  const [pcContainer, showClaimPc] = useState(false);
  const [claimAi, showClaimAi] = useState(false);
  const [pcClaimed, getPc] = useState(false);
  const [aiClaimed, getAi] = useState(false);

  const [curAi, setCurAi] = useState(0);

  if (pcClaimed * aiClaimed == true) {
    return (
      <div className={homeStyle.container}>
        {payload.map((ai, index) =>
          <PcSlider key={ai.id} hidden={curAi === index ? false : true}>
            {ai.pc.map((pc) =>
              <div key={pc.id} className={homeStyle.pcHealth}>
                {getPcImageComponent(pc.rarity)}
                <div className={homeStyle.healthBar}>
                  <HealthBar percentage={pc.health}></HealthBar>
                </div>
              </div>)}
          </PcSlider>
        )}
        <AiSlider curPageHook={setCurAi}>
          {payload.map((ai) =>
            <div key={ai.id} className={homeStyle.aiSlideWrapper}>
              <div className={homeStyle.aiContainer}>
                <div className={homeStyle.aiData}>
                  <span><PiCoinsLight></PiCoinsLight> Shit</span>
                  <span><PiClockLight></PiClockLight> Piss</span>
                  <span><PiDesktopLight></PiDesktopLight> Cum</span>
                </div>
                <div className={homeStyle.aiShow}>
                  <img className={`glow-${ai.rarity}`} src={getAiImage(ai.rarity)}></img>
                </div>
              </div>
            </div>
          )}
        </AiSlider>
      </div>
    )
  } else {
    return (
      <>
        {/* Free Pc Claim */}
        <PositiveNotification isActive={pcContainer} onClose={() => { showClaimPc(false); getPc(true) }}>
          <img src={getPcImage('common')} className='glow-common'></img>
          <span>
            Claimed
            <PiCheckBold></PiCheckBold>
          </span>
        </PositiveNotification>

        {/* Free Ai Claim */}
        <PositiveNotification isActive={claimAi} onClose={() => { showClaimAi(false); getAi(true) }}>
          <img src={getAiImage('common')} className='glow-common'></img>
          <span>
            Claimed
            <PiCheckBold></PiCheckBold>
          </span>
        </PositiveNotification>

        <div className={homeStyle.container}>
          <div className={homeStyle.freeDropsCount}>
            {pcClaimed ? '999 free PCs left' : '1000 free PCs left'}
          </div>
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
                  <GlowingButton onClick={() => showClaimPc(true)}>Claim PC</GlowingButton>
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
                  <GlowingButton onClick={() => showClaimAi(true)} >Claim Ai</GlowingButton>
                </div>
            }
          </div>
        </div>
      </>
    )
  }
}