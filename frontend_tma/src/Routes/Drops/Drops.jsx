import { useState } from 'react';
import AiMint from './assets/ai_mint.png';
import PcMint from './assets/pc_mint.png';

import './Drops.css'

export default function Home() {
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [currentPic, setCurrentPic] = useState(null);

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
  return (
    <div className="container">
      {isPopUpVisible && (
        <div id="PopUpOverlay" onClick={hidePopUp}>
          <div className="PopUp" id="PopUp" onClick={preventClosingPopUp}>
            <div className="PopUpContent">
              <img src={currentPic} alt="Mint Pc"></img>
              <div className="PopUpDescription">
                Price: <br></br>
                Case content
              </div>
              <button className="MintButton">Mint</button>
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