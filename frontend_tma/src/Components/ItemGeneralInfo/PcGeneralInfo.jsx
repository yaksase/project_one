import PropTypes from 'prop-types';
import { PiClockBold } from 'react-icons/pi';

import getPcImage from '../../utils/getPcImage';
import getAiImage from '../../utils/getAiImage';
import getRarity from '../../utils/getRarity';
import getTime from '../../utils/getTime';

import tokenIcon from '../../assets/token_icon.png';

import s from './ItemGeneralInfo.module.css';

PcGeneralInfo.propTypes = {
  pcInfo: PropTypes.object
}


export default function PcGeneralInfo({ pcInfo }) {
  return (
    <>
      <div className={s.image}>
        <img src={getPcImage(getRarity(pcInfo.rarity))} className={`glow-${getRarity(pcInfo.rarity)}`}></img>
      </div>
      <div className={s.centeredText}>
        Rarity: <span className={`text-${getRarity(pcInfo.rarity)}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{getRarity(pcInfo.rarity)}</span>
      </div>
      <div className={s.centeredText}>
        While the <span className='greenHighlight'>PC is not activated</span>, you can sell it. As soon as you start using it, you will not be able to list it on the market
      </div>
      Earnings:<br />
      <span className={`priceWrapper greenHighlight`} style={{ fontSize: 'x-large' }}>
        <img src={tokenIcon} style={{ marginRight: '0.2em', marginLeft: '0em' }}></img>
        {pcInfo.earnings}/launch
      </span>
      <br />
      PC lifetime:<br />
      <span className={`${s.iconWrapper} greenHighlight`}>
        <PiClockBold></PiClockBold>
        {getTime(pcInfo.lifetime)}
      </span>
      <br />
      This PC takes up this many slots for each AI:
      {pcInfo.slots.map((slot, index) => {
        return (
          <span key={index} className={`${s.aiSlotsWrapper} text-${getRarity(index)}`}>
            <img src={getAiImage(getRarity(index))} className={`glow-${getRarity(index)}`}></img>
            {
              slot == null ?
              "Can't connect to "
              : `${slot} for `
            }
            {getRarity(index)} AI
          </span>
        )
      })}
    </>
  )
}