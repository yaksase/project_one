import { useState } from 'react';

import PopUp from '../../Components/PopUp/PopUp';
import GlowingButton from '../../Components/GlowingButton/GlowingButton';

import AiMint from './assets/ai_mint.png';
import PcMint from './assets/pc_mint.png';

import UltraAi from '../../assets/ai/ai_ultra.png';
import MythicPc from '../../assets/pc/pc_mythic.png';

import TonIcon from '../../assets/ton_icon.svg';

import s from './Drops.module.css'

export default function Drops() {
  const [mintActive, setMintActive] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);
  const [selectedMint, setSelectedMint] = useState(null);

  function openPcMint() {
    setSelectedMint('pc');
    setMintActive(true);
  }

  function openAiMint() {
    setSelectedMint('ai');
    setMintActive(true);
  }

  function closeMint() {
    setMintActive(false);
  }

  function activateConfirm() {
    setMintActive(false);
    setConfirmActive(true);
  }

  function closeConfirm() {
    setConfirmActive(false);
  }

  let casePic;
  let dropPic;
  let rarity = 'common';
  if (selectedMint === 'pc') {
    casePic = PcMint;
    dropPic = MythicPc;
    rarity = 'Mythic';
  } else if (selectedMint === 'ai') {
    casePic = AiMint;
    dropPic = UltraAi;
    rarity = 'Ultra';
  }

  return (
    <div className={s.container}>
      {/* Case Mint */}
      <PopUp isActive={mintActive} onClose={closeMint}>
        <div className={s.popUpContent}>
          <img src={casePic} alt="case pic" className={`${s.image} ${s.imageMint}`}></img>
          <div className={s.popUpDescription}>
            <span className='priceWrapper'>
              Price: 1.5<img src={TonIcon} /><br/><br/>
            </span>
            Case content:<br></br>
            <span className='text-uncommon'>Uncommon </span>
            <span className='text-rare'>Rare </span>
            <span className='text-epic'>Epic </span>
            <span className='text-legendary'>Legendary </span>
            <span className='text-ultra'>Ultra </span>
            <span className='text-mythic'>Mythic</span>
          </div>
          <div className={s.popUpButtonContainer}>
            <GlowingButton onClick={activateConfirm}>Mint</GlowingButton>
          </div>
        </div>
      </PopUp>

      {/* Case Drops */}
      <PopUp isActive={confirmActive} onClose={closeConfirm}>
        <div className={s.popUpContent}>
          <img src={dropPic} className={`s.image glow-${rarity.toLowerCase()} ${s.imageDrops}`}></img>
          <div className={s.popUpDescription}>
            Rarity: <span className={`text-${rarity.toLowerCase()}`}>{rarity}</span><br></br>
            Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam mollitia eligendi consequatur itaque esse aut officiis sapiente? Aut itaque mollitia consequuntur tempore repellat inventore amet distinctio aperiam magni, molestias quisquam.
          </div>
          <div className={s.popUpButtonContainer}>
            <GlowingButton onClick={closeConfirm}>Confirm</GlowingButton>
          </div>
        </div>
      </PopUp>

      <div className={s.item}>
        <img src={PcMint} alt="Mint PC" className={s.image} />
        <button className={s.button} onClick={() => openPcMint()}>Mint PC</button>
      </div>
      <div className={s.item}>
        <img src={AiMint} alt="Mint Ai" className={s.image} />
        <button className={s.button} onClick={() => openAiMint()}>Mint Ai</button>
      </div>
    </div>
  )
} 