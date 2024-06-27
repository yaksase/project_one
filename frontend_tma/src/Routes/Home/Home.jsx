import { useState } from 'react';
import { PiCoinsLight, PiClockLight, PiDesktopLight, PiCheckBold } from 'react-icons/pi';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import Notification from '../../Components/Notification/Notification';

import UnknownPc from '../../assets/pc/pc_unknown.png';
import UnknownAi from '../../assets/ai/ai_unknown.png';

import CommonAi from '../../assets/ai/ai_common.png';
import CommonPc from '../../assets/pc/pc_common.png';

import homeStyle from './Home.module.css';
import notifStyle from './HomeNotifcation.module.css';

export default function Home() {
  const [claimPc, showClaimPc] = useState(false);
  const [claimAi, showClaimAi] = useState(false);

  return (
    <>
      {/* Free Pc Claim */}
      <Notification isActive={claimPc} onClose={() => showClaimPc(false)}>
        <div className={notifStyle.claimedNotif}>
          <img src={CommonPc} className='glow-common'></img>
          <span>
            Claimed
            <PiCheckBold></PiCheckBold>
          </span>
        </div>
      </Notification>

      {/* Free Ai Claim */}
      <Notification isActive={claimAi} onClose={() => showClaimAi(false)}>
        <div className={notifStyle.claimedNotif}>
          <img src={CommonAi} className='glow-common'></img>
          <span>
            Claimed
            <PiCheckBold></PiCheckBold>
          </span>
        </div>
      </Notification>

      <div className={homeStyle.container}>
        <div className={homeStyle.freeDropsCount}>
          1000 free PCs left
        </div>
        <div className={homeStyle.horizontalContainer}>
          <div className={homeStyle.claimPc}>
            <img src={UnknownPc}></img>
            <GlowingButton onClick={() => showClaimPc(true)}>Claim PC</GlowingButton>
          </div>
          <div className={homeStyle.aiContainer}>
            <div className={homeStyle.aiData}>
              <span><PiCoinsLight></PiCoinsLight> Shit</span>
              <span><PiClockLight></PiClockLight> Piss</span>
              <span><PiDesktopLight></PiDesktopLight> Cum</span>
            </div>
            <div className={homeStyle.aiShow}>
              <img src={UnknownAi}></img>
              <GlowingButton onClick={() => showClaimAi(true)} >Claim Ai</GlowingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}