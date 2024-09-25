import PropTypes from 'prop-types';
import { PiDesktopBold, PiClockBold } from 'react-icons/pi';

import getAiImage from '../../utils/getAiImage';
import getRarity from '../../utils/getRarity';
import getTime from '../../utils/getTime';

import s from './ItemGeneralInfo.module.css';

AiGeneralInfo.propTypes = {
  aiInfo: PropTypes.object
}

export default function AiGeneralInfo({ aiInfo }) {
  
  return (
    <>
      <div className={s.image}>
        <img src={getAiImage(getRarity(aiInfo.rarity))} className={`glow-${getRarity(aiInfo.rarity)}`}></img>
      </div>
      <div className={s.centeredText}>
        Rarity: <span className={`text-${getRarity(aiInfo.rarity)}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{getRarity(aiInfo.rarity)}</span>
      </div>
      <div className={s.centeredText}>
        This <span className='greenHighlight'>AI</span> has not been used yet. <span className='greenHighlight'>Connect PC</span> to it to start using. Then the AI will start to bring you profit
      </div>
      Every PC connected to this AI will be farming tokens during this time:<br />
      <span className={`${s.iconWrapper} greenHighlight`} style={{ fontSize: 'x-large' }}>
        <PiClockBold></PiClockBold>
        {getTime(aiInfo.duration)}
      </span>
      <br />
      You can link this many PCs to the AI:
      {aiInfo.slots.map((slot, index) => {
        return (
          <span key={index} className={`${s.iconWrapper} text-${getRarity(index)}`}>
            <PiDesktopBold></PiDesktopBold>
            {slot == null ? '0' : Math.floor(10/slot)} {getRarity(index)} PCs
          </span>
        )
      })}
    </>
    
  )
}