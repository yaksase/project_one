/* eslint-disable react/prop-types */
import PopUp from '../../Components/PopUp/PopUp';

import tokenIcon from '../../assets/token_icon.png';

import s from './Leaderboard.module.css';

export default function Leaderboard({ isActive, onClose }) {
  return (
    <PopUp isActive={isActive} onClose={onClose}>
      <div className={s.leaderboardPopUp}>
        <span className={s.leaderboardTitle}>Leaderboard</span>
        <div className={s.leaderboardItem}>
          <div className={s.itemPlace}>
            1
          </div>
          <div className={s.itemDescription}>
            Nick 1000000000000000000000000000000 <span className={`priceWrapper`}><img src={tokenIcon}></img></span>
          </div>
        </div>

        <div className={s.leaderboardItem}>
          <div className={s.itemPlace}>
            2
          </div>
          <div className={s.itemDescription}>
            Dick 187234 <span className={`priceWrapper`}><img src={tokenIcon}></img></span>
          </div>
        </div>
        <div className={s.leaderboardItem}>
          <div className={s.itemPlace}>
            3
          </div>
          <div className={s.itemDescription}>
            Bob 120000 <span className={`priceWrapper`}><img src={tokenIcon}></img></span>
          </div>
        </div>
        <div className={s.leaderboardItem}>
          <div className={s.itemPlace}>
            4
          </div>
          <div className={s.itemDescription}>
            Tod 10000000000 <span className={`priceWrapper`}><img src={tokenIcon}></img></span>
          </div>
        </div>
        <div className={s.leaderboardItem}>
          <div className={s.itemPlace}>
            5
          </div>
          <div className={s.itemDescription}>
            Sosa 0 <span className={`priceWrapper`}><img src={tokenIcon}></img></span>
          </div>
        </div>
      </div>
    </PopUp>
  )
}