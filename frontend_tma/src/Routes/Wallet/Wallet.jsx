import { useState } from 'react';
import PropTypes from 'prop-types';
import { TonConnectButton } from '@tonconnect/ui-react';

import PopUp from '../../Components/PopUp/PopUp';
import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import Input from '../../Components/Input/Input';

import s from './Wallet.module.css';

import { PiHandArrowDownDuotone, PiHandArrowUpDuotone } from "react-icons/pi";

Wallet.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

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
    setPrice('');
  };
  const closeWithdrawPopup = () => {
    setShowWithdrawPopup(false);
    setShowWalletPopUp(false);
    setPrice('');
  };
  const [price, setPrice] = useState('');
  return (
    <>
      <PopUp isActive={isActive} onClose={onClose}>
        <div className={s.blockContent}>
          <div className={s.tgWalletButton}>
            <TonConnectButton />
          </div>
          <div className={s.buttonsBlock}>
            <div className={s.buttonContainer}><GlowingButton onClick={openDepositPopup}><div className={s.innerButton}>Deposit<span className={`priceWrapper`}><PiHandArrowUpDuotone></PiHandArrowUpDuotone></span></div></GlowingButton></div>
            <div className={s.buttonContainer}><GlowingButton buttonColor='red' onClick={openWithdrawPopup}><div className={s.innerButton}>Withdraw<span className={`priceWrapper`}><PiHandArrowDownDuotone></PiHandArrowDownDuotone></span></div></GlowingButton></div>
          </div>
        </div>
      </PopUp>

      <PopUp isActive={showDepositPopup} onClose={closeDepositPopup}>
        <div className={s.depositeWithdrawContent}>
          <label>Amount</label>
          <Input value={price} setValue={setPrice} className={s.input}></Input>
          <div className={s.buttonContainer}>
            <GlowingButton>
              <div className={s.innerButton}>Deposit<span className={`priceWrapper`}><PiHandArrowUpDuotone></PiHandArrowUpDuotone></span></div>
            </GlowingButton>
          </div>
        </div>
      </PopUp>

      <PopUp isActive={showWithdrawPopup} onClose={closeWithdrawPopup}>
        <div className={s.depositeWithdrawContent}>
          <label>Amount</label>
          <Input value={price} setValue={setPrice} className={s.input}></Input>
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