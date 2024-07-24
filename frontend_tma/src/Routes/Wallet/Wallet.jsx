/* eslint-disable react/prop-types */
import { useState } from 'react';
import PopUp from '../../Components/PopUp/PopUp';

import s from './Wallet.module.css';

import { FaLink } from "react-icons/fa";

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
            <input type="text"></input>
          </div>
          <div className={s.buttonsBlock}>
            <button className={s.buttonDeposit} onClick={openDepositPopup}>Deposit</button>
            <button className={s.buttonWithdraw} onClick={openWithdrawPopup}>Withdraw</button>
          </div>
        </div>
      </PopUp>

      <PopUp isActive={showDepositPopup} onClose={closeDepositPopup}>
        <div className={s.depositContent}>
          <span className={`${s.firstGreenHint} ${s.centerText} greenHighlight`}>To top up your balance, transfer the required amount of $Ton to the specified wallet</span>
          <div className={s.inputBlockDeposit}>
            <label>Network: Ton</label>
            <div className={s.inputString}>
              <input type="text"></input>
              <FaLink className={s.linkIcon}></FaLink>
            </div>
          </div>
          <span className={`${s.secondHint} ${s.centerText}`}>Your balance will be replenished automatically for the amount that you transferred immediately after the transaction takes place.</span>
          <span className={`${s.attention} ${s.centerText} text-ultra`}>Attention!</span>
          <span className={`${s.attentionDescription} ${s.centerText} text-ultra`}>Send cryptocurrency only from the wallet linked to the application, otherwise your funds will be lost.</span>
        </div>
      </PopUp>

      <PopUp isActive={showWithdrawPopup} onClose={closeWithdrawPopup}>

      </PopUp>
    </>
  )
}