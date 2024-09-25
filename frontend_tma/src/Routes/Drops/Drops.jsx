import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import PopUp from '../../Components/PopUp/PopUp';
import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import PcGeneralInfo from '../../Components/ItemGeneralInfo/PcGeneralInfo';
import AiGeneralInfo from '../../Components/ItemGeneralInfo/AiGeneralInfo';

import AiMint from './assets/ai_mint.png';
import PcMint from './assets/pc_mint.png';

import axiosInstance from '../../axios';

import TonIcon from '../../assets/ton_icon.svg';

import s from './Drops.module.css'

export default function Drops() {
  const [mintActive, setMintActive] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);
  const [selectedMint, setSelectedMint] = useState(null);

  const [pcInfo, setPcInfo] = useState(null);
  const [aiInfo, setAiInfo] = useState(null);

  const [mintPcPrice, setMintPcPrice] = useState(null);
  const [mintAiPrice, setMintAiPrice] = useState(null);

  const { personalInfo, updatePersonalInfo } = useOutletContext();

  useEffect(() => {
    axiosInstance.get('/api/mint/pc')
      .then((res) => setMintPcPrice(res.data['price']));
    axiosInstance.get('/api/mint/ai')
      .then((res) => setMintAiPrice(res.data['price']));
  }, [])

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

  function getRandomItem() {
    if (selectedMint == 'pc') {
      axiosInstance.put(`/api/mint/pc`)
      .then((res) => {
        setPcInfo(res.data);
        updatePersonalInfo();
        setMintActive(false);
        setConfirmActive(true);
      });
    } else if (selectedMint == 'ai') {
      axiosInstance.put(`/api/mint/ai`)
      .then((res) => {
        setAiInfo(res.data);
        updatePersonalInfo();
        setMintActive(false);
        setConfirmActive(true);
      });
    }
  }

  function closeConfirm() {
    setConfirmActive(false);
    setAiInfo(null);
    setPcInfo(null);
  }

  let casePic;
  let casePrice;
  if (selectedMint === 'pc') {
    casePic = PcMint;
    casePrice = mintPcPrice;
  } else if (selectedMint === 'ai') {
    casePic = AiMint;
    casePrice = mintAiPrice;
  }

  let droppedItemInfo;
  if (pcInfo != null && aiInfo == null) {
    droppedItemInfo = <PcGeneralInfo pcInfo={pcInfo}></PcGeneralInfo>;
  } else if (aiInfo != null && pcInfo == null) {
    droppedItemInfo = <AiGeneralInfo aiInfo={aiInfo}></AiGeneralInfo>;
  }

  return (
    <div className={s.container}>
      {/* Case Mint */}
      <PopUp isActive={mintActive} onClose={closeMint}>
        <div className={s.popUpContent}>
          <img src={casePic} alt="case pic" className={`${s.image} ${s.imageMint}`}></img>
          <div className={s.popUpDescription}>
            <span className='priceWrapper'>
              Price: {casePrice}<img src={TonIcon} /><br/><br/>
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
            {
              personalInfo['tons'] < casePrice ?
              <GlowingButton disabled={true}>Not Enough TON</GlowingButton> :
              <GlowingButton onClick={getRandomItem}>Mint</GlowingButton>
            }
          </div>
        </div>
      </PopUp>

      {/* Case Drops */}
      <PopUp isActive={confirmActive} onClose={closeConfirm}>
        <div className={s.itemInfoContainer}>
          
          {droppedItemInfo}
        </div>
        <div className={s.popUpButtonContainer}>
            <GlowingButton onClick={closeConfirm}>Confirm</GlowingButton>
          </div>
      </PopUp>

      <div className={s.item}>
        <img src={PcMint} alt="Mint PC" className={s.image} />
        <GlowingButton width='100%' onClick={() => openPcMint()} disabled={mintPcPrice == null ? true : false}><div className={s.buttonContent}>Mint PC</div></GlowingButton>
      </div>
      <div className={s.item}>
        <img src={AiMint} alt="Mint Ai" className={s.image} />
        <GlowingButton width='100%' onClick={() => openAiMint()} disabled={mintAiPrice == null ? true : false}><div className={s.buttonContent}>Mint Ai</div></GlowingButton>
      </div>
    </div>
  )
} 