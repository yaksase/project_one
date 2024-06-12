import { useState } from 'react';
import PositiveButton from '../../Components/PositiveButton/PositiveButton';

import AiMint from './assets/ai_mint.png';
import PcMint from './assets/pc_mint.png';
import RandomPicPc from './assets/7-2.png';
import RandomPicAi from './assets/6.png';

import './Drops.css'

export default function Home() {
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [currentPic, setCurrentPic] = useState(null);
  const [isStyleActive, setStyleActive] = useState(false);
  const [isItemUnlock, setItemLock] = useState(false);

  function showPopUp(pic) {
    setCurrentPic(pic)
    setPopUpVisible(true);
  }
  function hidePopUp() {
    setPopUpVisible(false);
  }
  function preventClosingPopUp(e) {
    e.stopPropagation();
  }
  function showNewItem() {
    setStyleActive(true);
    setItemLock(true);
    if (currentPic === PcMint) {
      setCurrentPic(RandomPicPc);
    }
    else {
      setCurrentPic(RandomPicAi);
    }
  }
  return (
    <div className="container">
      {isPopUpVisible && (
        <div id="PopUpOverlay" onClick={hidePopUp}>
          <div className={`PopUp ${isStyleActive ? 'greenHighlight' : ''}`} id="PopUp" onClick={preventClosingPopUp}>
            <div className="PopUpContent">
              <img src={currentPic} alt="Mint Pc"></img>
              <div className="PopUpDescription">
                Price: 1.123M<br></br>
                Case content: Cool stuff can run doom on iron
              </div>
              <PositiveButton>Mint</PositiveButton>
            </div>
          </div>
        </div>
      )} 

      <div className="item">
        <img src={PcMint} alt="Mint PC" className="image" />
        <button className="button" onClick={() => showPopUp(PcMint)}>Mint PC</button>
      </div>
      <div className="item">
        <img src={AiMint} alt="Mint Ai" className="image" />
        <button className="button" onClick={() => showPopUp(AiMint)}>Mint Ai</button>
      </div>
    </div>
  )
} 