import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FaLink } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { PiCoinsLight } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import PopUp from '../../Components/PopUp/PopUp';
import GlowingButton from "../../Components/GlowingButton/GlowingButton";

import s from './Invite.module.css';

Invite.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default function Invite({ isActive, onClose }) {
  const [buttonText, setButtonText] = useState(<div className={s.buttonContent}>Invite friend<div className={`priceWrapper`}><FaLink /></div></div>);

  function handleButtonClick() {
    setButtonText(<div className={s.buttonContent}>Link copied<div className={`priceWrapper`}><IoCheckmarkDoneOutline /></div></div>);
    navigator.clipboard.writeText("nenaeb.com");
  }

  useEffect(() => {
    setButtonText(
      <div className={s.buttonContent}>Invite friend<div className={`priceWrapper`}><FaLink /></div></div>
    );
  }, [isActive]);
  
  return (
    <PopUp isActive={isActive} onClose={onClose}>
      <div className={s.invitationContent}>
        <span className={s.invitationTitle}>Refferals</span>
        <span className={s.hint}>Get 10% of each friend you bring</span>
        <GlowingButton onClick={() => {handleButtonClick()}}>{buttonText}</GlowingButton>
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
      </div>
    </PopUp>
  )
}