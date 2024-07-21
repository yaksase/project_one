/* eslint-disable react/prop-types */
import { FaLink } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { PiCoinsLight, PiHouseLight } from "react-icons/pi";

import PopUp from '../../Components/PopUp/PopUp';
import GlowingButton from "../../Components/GlowingButton/GlowingButton";

import s from './Invite.module.css';

export default function Invite({ isActive, onClose }) {
  return (
    <PopUp isActive={isActive} onClose={onClose}>
      <div className={s.invitationContent}>
        <span className={s.invitationTitle}>Refferals</span>
        <span className={s.hint}>Get 10% of each friend you bring</span>
        <GlowingButton><div className={s.buttonContent}>Invite friend<div className={`priceWrapper`}><FaLink /></div></div></GlowingButton>
        <div className={s.inviteStats}>
          <div className={s.totalRefferalsBlock}>
            <span>Total refferals:</span>
            <span><GoPeople />66</span>
          </div>
          <div className={s.totalEarningBlock}>
            <span>Total earning:</span>
            <span><PiCoinsLight className={`priceWrapper`}/>12000$Po</span>
          </div>
        </div>
        <PiHouseLight className={s.homeIcon}/>
      </div>
    </PopUp>
  )
}