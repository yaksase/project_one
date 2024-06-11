import AiMint from './assets/ai_mint.png';
import PcMint from './assets/pc_mint.png';

import './Drops.css'

export default function Home() {
  return (
      <div className="container">
        <div className="item">
          <img src={PcMint} alt="Mint PC" className="image" />
          <button className="button">Mint PC</button>
        </div>
        <div className="item">
          <img src={AiMint} alt="Mint Ai" className="image" />
          <button className="button">Mint Ai</button>
        </div>
      </div>
  )
}