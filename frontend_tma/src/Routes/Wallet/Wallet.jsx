/* eslint-disable react/prop-types */
import { useState } from 'react';
import PopUp from '../../Components/PopUp/PopUp';
import GlowingButton from '../../Components/GlowingButton/GlowingButton';

import s from './Wallet.module.css';

import { FaLink } from "react-icons/fa";
import { PiHandArrowDownDuotone, PiHandArrowUpDuotone } from "react-icons/pi";

export default function Wallet({ isActive, onClose }) {
  const [showDepositPopup, setShowDepositPopup] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [showWalletPopUp, setShowWalletPopUp] = useState(isActive);

  const openDepositPopup = () => {
    setShowDepositPopup(true);
  };
  const openWithdrawPopup = () => {
    setShowWithdrawPopup(true);
  };
  const closeDepositPopup = () => {
    setShowDepositPopup(false);
    setShowWalletPopUp(false);
  };
  const closeWithdrawPopup = () => {
    setShowWithdrawPopup(false);
    setShowWalletPopUp(false);
  };
  const closeAll = () => {
    setShowDepositPopup(false);
    setShowWalletPopUp(false);
    setShowWithdrawPopup(false);
  };
  return (
    <>
      <PopUp isActive={isActive} onClose={onClose}>
        <div className={s.blockContent}>
          <div className={s.inputBlock}>
            <input type="text" className={s.input}></input>
          </div>
          <div className={s.buttonsBlock}>
          <div className={s.buttonContainer}><GlowingButton onClick={openDepositPopup}><div className={s.innerButton}>Deposite<span className={`priceWrapper`}><PiHandArrowUpDuotone></PiHandArrowUpDuotone></span></div></GlowingButton></div>
            <div className={s.buttonContainer}><GlowingButton buttonColor='red' onClick={openWithdrawPopup}><div className={s.innerButton}>Withdraw<span className={`priceWrapper`}><PiHandArrowDownDuotone></PiHandArrowDownDuotone></span></div></GlowingButton></div>
          </div>
        </div>
      </PopUp>

      <PopUp isActive={showDepositPopup} onClose={closeDepositPopup}>
        <div className={s.depositContent}>
          <span className={`${s.firstGreenHint} ${s.centerText} greenHighlight`}>To top up your balance, transfer the required amount of $Ton to the specified wallet</span>
          <div className={s.inputBlockDeposit}>
            <label>Network: Ton</label>
            <div className={s.inputString}>
              <input type="text" className={s.input}></input>
              <FaLink className={s.linkIcon}></FaLink>
            </div>
          </div>
          <span className={`${s.secondHint} ${s.centerText}`}>Your balance will be replenished automatically for the amount that you transferred immediately after the transaction takes place.</span>
          <span className={`${s.attention} ${s.centerText} text-ultra`}>Attention!</span>
          <span className={`${s.attentionDescription} ${s.centerText} text-ultra`}>Send cryptocurrency only from the wallet linked to the application, otherwise your funds will be lost.</span>
        </div>
      </PopUp>

      <PopUp isActive={showWithdrawPopup} onClose={closeWithdrawPopup}>
        <div className={s.withdrawPopUp}>
          <label>Amount</label>
          <input onChange={(e) => setPrice(e.target.value)} className={s.input}></input>
          <div className={s.buttonContainer}>
            <GlowingButton buttonColor='red'>
              <div className={s.innerButton}>Withdraw<span className={`priceWrapper`}><PiHandArrowDownDuotone></PiHandArrowDownDuotone></span></div>
            </GlowingButton>
          </div>
        </div>
      </PopUp>
    </>
  )
}