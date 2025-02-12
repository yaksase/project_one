import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { PiCaretDownBold, PiCaretUpBold, PiDesktopBold, PiClockBold, PiCheckBold } from 'react-icons/pi';

import GlowingButton from '../../Components/GlowingButton/GlowingButton';
import PopUp from '../../Components/PopUp/PopUp';
import PositiveNotification from '../../Components/PositiveNotification/PositiveNotification';
import Input from '../../Components/Input/Input';

import getAiImage from '../../utils/getAiImage.js';
import getPcImage from '../../utils/getPcImage.js';
import numberWithCommas from '../../utils/numberWithCommas.js';

import tokenImage from '../../assets/token_icon.png';
import tonImage from '../../assets/ton_icon.svg';

import s from './Market.module.css';
import topSelectorStyle from './TopSelector.module.css';
import itemSelectorStyle from './ItemSelector.module.css';
import dropdownStyle from './RarityDropdown.module.css';
import sellingItemStyle from './SellingItem.module.css';
import buyPopUpStyle from './BuyPopUp.module.css';

const aiItems = {
  'common': [
    {
      rarity: 'common',
      id: 0,
      price: 12.5
    },
    {
      rarity: 'common',
      id: 1,
      price: 12.7
    },
    {
      rarity: 'common',
      id: 2,
      price: 13.1
    },
    {
      rarity: 'common',
      id: 3,
      price: 14
    },
    {
      rarity: 'common',
      id: 4,
      price: 17
    },
    {
      rarity: 'common',
      id: 5,
      price: 20
    },
  ],
  'uncommon': [
    {
      rarity: 'uncommon',
      id: 0,
      price: 70
    },
    {
      rarity: 'uncommon',
      id: 1,
      price: 71.3
    },
    {
      rarity: 'uncommon',
      id: 2,
      price: 75.6
    },
    {
      rarity: 'uncommon',
      id: 3,
      price: 81.3
    },
    {
      rarity: 'uncommon',
      id: 4,
      price: 86.9
    },
    {
      rarity: 'uncommon',
      id: 5,
      price: 95
    },
    {
      rarity: 'uncommon',
      id: 6,
      price: 97.5
    },
    {
      rarity: 'uncommon',
      id: 7,
      price: 101
    },
    {
      rarity: 'uncommon',
      id: 8,
      price: 103.4
    },
  ],
  'rare': [
    {
      rarity: 'rare',
      id: 0,
      price: 194.4
    },
    {
      rarity: 'rare',
      id: 1,
      price: 201.45
    },
    {
      rarity: 'rare',
      id: 2,
      price: 205.67
    },
    {
      rarity: 'rare',
      id: 3,
      price: 215
    },
  ],
  'epic': [
    {
      rarity: 'epic',
      id: 0,
      price: 580.3
    },
    {
      rarity: 'epic',
      id: 1,
      price: 594
    },
    {
      rarity: 'epic',
      id: 2,
      price: 601
    },
    {
      rarity: 'epic',
      id: 3,
      price: 602.3
    },
    {
      rarity: 'epic',
      id: 4,
      price: 605
    },
    {
      rarity: 'epic',
      id: 5,
      price: 630
    },
  ],
  'legendary': [
    {
      rarity: 'legendary',
      id: 0,
      price: 2045
    },
    {
      rarity: 'legendary',
      id: 1,
      price: 2076.9
    },
    {
      rarity: 'legendary',
      id: 2,
      price: 2080
    },
    {
      rarity: 'legendary',
      id: 3,
      price: 2094
    },
    {
      rarity: 'legendary',
      id: 4,
      price: 2108.3
    },
    {
      rarity: 'legendary',
      id: 5,
      price: 2110
    },
    {
      rarity: 'legendary',
      id: 6,
      price: 2115.54
    },
    {
      rarity: 'legendary',
      id: 7,
      price: 2116
    },
    {
      rarity: 'legendary',
      id: 8,
      price: 2160
    },
    {
      rarity: 'legendary',
      id: 9,
      price: 2190.3
    },
    {
      rarity: 'legendary',
      id: 10,
      price: 2201
    },
    {
      rarity: 'legendary',
      id: 11,
      price: 2203.3
    },
    {
      rarity: 'legendary',
      id: 12,
      price: 2210
    },
    {
      rarity: 'legendary',
      id: 13,
      price: 2216.2
    },
    {
      rarity: 'legendary',
      id: 14,
      price: 2356
    },
    {
      rarity: 'legendary',
      id: 15,
      price: 2708.9
    },
    {
      rarity: 'legendary',
      id: 16,
      price: 3105.3
    },
    {
      rarity: 'legendary',
      id: 17,
      price: 3150
    },
  ],
  'ultra': [
    {
      rarity: 'ultra',
      id: 0,
      price: 8095
    },
    {
      rarity: 'ultra',
      id: 1,
      price: 8345.3
    },
    {
      rarity: 'ultra',
      id: 2,
      price: 8347
    },
    {
      rarity: 'ultra',
      id: 3,
      price: 8450
    },
    {
      rarity: 'ultra',
      id: 4,
      price: 8556
    },
    {
      rarity: 'ultra',
      id: 5,
      price: 10230.32
    },
  ],
  'mythic': [
    {
      rarity: 'mythic',
      id: 0,
      price: 56980
    },
    {
      rarity: 'mythic',
      id: 1,
      price: 59000
    },
    {
      rarity: 'mythic',
      id: 2,
      price: 62000
    },
  ],
};

const pcItems = {
  'common': [
    {
      rarity: 'common',
      id: 0,
      price: 12.5
    },
    {
      rarity: 'common',
      id: 1,
      price: 12.7
    },
    {
      rarity: 'common',
      id: 2,
      price: 13.1
    },
    {
      rarity: 'common',
      id: 3,
      price: 14
    },
    {
      rarity: 'common',
      id: 4,
      price: 17
    },
    {
      rarity: 'common',
      id: 5,
      price: 20
    },
  ],
  'uncommon': [
    {
      rarity: 'uncommon',
      id: 0,
      price: 70
    },
    {
      rarity: 'uncommon',
      id: 1,
      price: 71.3
    },
    {
      rarity: 'uncommon',
      id: 2,
      price: 75.6
    },
    {
      rarity: 'uncommon',
      id: 3,
      price: 81.3
    },
    {
      rarity: 'uncommon',
      id: 4,
      price: 86.9
    },
    {
      rarity: 'uncommon',
      id: 5,
      price: 95
    },
    {
      rarity: 'uncommon',
      id: 6,
      price: 97.5
    },
    {
      rarity: 'uncommon',
      id: 7,
      price: 101
    },
    {
      rarity: 'uncommon',
      id: 8,
      price: 103.4
    },
  ],
  'rare': [
    {
      rarity: 'rare',
      id: 0,
      price: 194.4
    },
    {
      rarity: 'rare',
      id: 1,
      price: 201.45
    },
    {
      rarity: 'rare',
      id: 2,
      price: 205.67
    },
    {
      rarity: 'rare',
      id: 3,
      price: 215
    },
  ],
  'epic': [
    {
      rarity: 'epic',
      id: 0,
      price: 580.3
    },
    {
      rarity: 'epic',
      id: 1,
      price: 594
    },
    {
      rarity: 'epic',
      id: 2,
      price: 601
    },
    {
      rarity: 'epic',
      id: 3,
      price: 602.3
    },
    {
      rarity: 'epic',
      id: 4,
      price: 605
    },
    {
      rarity: 'epic',
      id: 5,
      price: 630
    },
  ],
  'legendary': [
    {
      rarity: 'legendary',
      id: 0,
      price: 2045
    },
    {
      rarity: 'legendary',
      id: 1,
      price: 2076.9
    },
    {
      rarity: 'legendary',
      id: 2,
      price: 2080
    },
    {
      rarity: 'legendary',
      id: 3,
      price: 2094
    },
    {
      rarity: 'legendary',
      id: 4,
      price: 2108.3
    },
    {
      rarity: 'legendary',
      id: 5,
      price: 2110
    },
    {
      rarity: 'legendary',
      id: 6,
      price: 2115.54
    },
    {
      rarity: 'legendary',
      id: 7,
      price: 2116
    },
    {
      rarity: 'legendary',
      id: 8,
      price: 2160
    },
    {
      rarity: 'legendary',
      id: 9,
      price: 2190.3
    },
    {
      rarity: 'legendary',
      id: 10,
      price: 2201
    },
    {
      rarity: 'legendary',
      id: 11,
      price: 2203.3
    },
    {
      rarity: 'legendary',
      id: 12,
      price: 2210
    },
    {
      rarity: 'legendary',
      id: 13,
      price: 2216.2
    },
    {
      rarity: 'legendary',
      id: 14,
      price: 2356
    },
    {
      rarity: 'legendary',
      id: 15,
      price: 2708.9
    },
    {
      rarity: 'legendary',
      id: 16,
      price: 3105.3
    },
    {
      rarity: 'legendary',
      id: 17,
      price: 3150
    },
  ],
  'ultra': [
    {
      rarity: 'ultra',
      id: 0,
      price: 8095
    },
    {
      rarity: 'ultra',
      id: 1,
      price: 8345.3
    },
    {
      rarity: 'ultra',
      id: 2,
      price: 8347
    },
    {
      rarity: 'ultra',
      id: 3,
      price: 8450
    },
    {
      rarity: 'ultra',
      id: 4,
      price: 8556
    },
    {
      rarity: 'ultra',
      id: 5,
      price: 10230.32
    },
  ],
  'mythic': [
    {
      rarity: 'mythic',
      id: 0,
      price: 56980
    },
    {
      rarity: 'mythic',
      id: 1,
      price: 59000
    },
    {
      rarity: 'mythic',
      id: 2,
      price: 62000
    },
  ],
};

const tokenItems = [
  {
    id: 0,
    price: 0.2,
    quantity: 5500
  },
  {
    id: 1,
    price: 0.22,
    quantity: 130
  },
  {
    id: 2,
    price: 0.23,
    quantity: 98000
  },
];

const listedAi = [
  {
    rarity: 'common',
    id: 0,
    price: 12.5
  },
  {
    rarity: 'rare',
    id: 1,
    price: 194.4
  },
  {
    rarity: 'rare',
    id: 2,
    price: 201.45
  },
  {
    rarity: 'ultra',
    id: 3,
    price: 8450
  },
];

const listedPc = [
  {
    rarity: 'common',
    id: 0,
    price: 13.1
  },
  {
    rarity: 'rare',
    id: 1,
    price: 201.45
  },
  {
    rarity: 'epic',
    id: 2,
    price: 594
  },
  {
    rarity: 'mythic',
    id: 3,
    price: 59000
  },
];

const listedTokens = [
  {
    id: 0,
    price: 0.2,
    quantity: 5500
  },
  {
    id: 1,
    price: 0.22,
    quantity: 130
  },
];

const raritiesData = [
  'common', 'uncommon', 'rare', 'epic', 'legendary', 'ultra', 'mythic'
];

RarityDropdown.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  showDropdown: PropTypes.bool.isRequired,
  setShowDropdown: PropTypes.func.isRequired
}

function RarityDropdown({ imgSrc, children, showDropdown, setShowDropdown }) {
  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className={dropdownStyle.container}>
      <button className={`${itemSelectorStyle.button} ${itemSelectorStyle.active}`} onClick={() => {
        setShowDropdown((prevState) => !prevState);
      }}>
        <img src={imgSrc}></img>
        <div className={itemSelectorStyle.iconsWrapper}>
          <PiCaretUpBold style={showDropdown ? { visibility: 'visible' } : { visibility: 'hidden', height: 0 }}></PiCaretUpBold>
          <PiCaretDownBold style={showDropdown ? { visibility: 'hidden', height: 0 } : { visibility: 'visible' }}></PiCaretDownBold>
        </div>
      </button>
      <div className={`${dropdownStyle.content} ${showDropdown ? dropdownStyle.contentOpen : ''}`}>
        {children}
      </div>
    </div>

  )
}

SellingItem.propTypes = {
  onBuyClick: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rarity: PropTypes.string.isRequired,
  isToken: PropTypes.bool
}

function SellingItem({ onBuyClick, imgSrc, price, rarity, isToken = false }) {
  return (
    <div className={sellingItemStyle.container}>
      <img src={imgSrc} className={rarity ? `glow-${rarity}` : ''}></img>
      <span className='priceWrapper'>
        {price}
        {
          isToken ?
            <img src={tonImage}></img> :
            <img src={tokenImage}></img>
        }
      </span>
      <GlowingButton glowSize={'0.3rem'} width={'100%'} verticalPadding='0.2em' onClick={onBuyClick}>Buy</GlowingButton>
    </div>
  )
}

ListedItem.propTypes = {
  onDelistClick: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rarity: PropTypes.string.isRequired,
  isToken: PropTypes.bool
}

function ListedItem({ onDelistClick, imgSrc, price, rarity, isToken = false }) {
  return (
    <div className={sellingItemStyle.container}>
      <img src={imgSrc} className={rarity ? `glow-${rarity}` : ''}></img>
      <span className='priceWrapper'>
        {price}
        {
          isToken ?
            <img src={tonImage}></img> :
            <img src={tokenImage}></img>
        }
      </span>
      <GlowingButton glowSize={'0.3rem'} width={'100%'} verticalPadding='0.2em' onClick={onDelistClick} buttonColor={'orange'}>
        Delist
      </GlowingButton>
    </div>
  )
}

export default function Market() {
  const [showMarket, setShowMarket] = useState(true);

  const [showAi, setShowAi] = useState(true);
  const [curAi, setCurAi] = useState('common');

  const [showPc, setShowPc] = useState(false);
  const [curPc, setCurPc] = useState('common');

  const [showToken, setShowToken] = useState(false);

  const [showAiDropdown, setShowAiDropdown] = useState(false);
  const [showPcDropdown, setShowPcDropdown] = useState(false);

  const [buyAi, setBuyAi] = useState(false);
  const [aiPurchaseNotif, setAiPurchaseNotif] = useState(false);
  const [aiBid, setAiBid] = useState({});

  const [buyPc, setBuyPc] = useState(false);
  const [pcPurchaseNotif, setPcPurchaseNotif] = useState(false);
  const [pcBid, setPcBid] = useState({});

  const [buyToken, setBuyToken] = useState(false);
  const [tokenPurchaseNotif, setTokenPurchaseNotif] = useState(false);
  const [tokenBid, setTokenBid] = useState({});
  const [tokenAmountPurchased, setTokenAmountPurchased] = useState('');

  const [listedItemType, setListedItemType] = useState('ai');

  const [listToken, setListToken] = useState(false);
  const [tokenAmountListed, setTokenAmountListed] = useState('');
  const [tokenPrice, setTokenPrice] = useState('');
  const [tokenListNotif, setTokenListNotif] = useState(false);

  const [showDelistAi, setShowDelistAi] = useState(false);
  const [showDelistAiNotif, setShowDelistAiNotif] = useState(false);
  const [delistingAi, setDelistingAi] = useState({});

  const [showDelistPc, setShowDelistPc] = useState(false);
  const [showDelistPcNotif, setShowDelistPcNotif] = useState(false);
  const [delistingPc, setDelistingPc] = useState({});

  const [showDelistToken, setShowDelistToken] = useState(false);
  const [showDelistTokenNotif, setShowDelistTokenNotif] = useState(false);
  const [delistingToken, setDelistingToken] = useState({});

  let tokenBuyButton;
  if (buyToken) {
    if (parseFloat(tokenAmountPurchased) > tokenBid.quantity) {
      tokenBuyButton =
        <GlowingButton disabled={true} buttonColor={'red'}>
          Not Enough Tokens
        </GlowingButton>;
    } else if (tokenAmountPurchased === '0' || tokenAmountPurchased === '') {
      tokenBuyButton =
        <GlowingButton disabled={true}>
          Purchase Tokens
        </GlowingButton>;
    } else if (parseFloat(tokenAmountPurchased) * tokenBid.price > 12.356) {
      tokenBuyButton =
        <GlowingButton disabled={true} buttonColor={'red'}>
          Not Enough TON
        </GlowingButton>;
    } else {
      tokenBuyButton =
        <GlowingButton
          onClick={() => {
            setBuyToken(false);
            setTokenPurchaseNotif(true);
            setTokenAmountPurchased('');
          }}>Purchase Tokens</GlowingButton>;
    }
  }

  let tokenListButton;
  if (listToken) {
    if (tokenAmountListed == '' || tokenAmountListed == '0' || tokenPrice == '' || tokenPrice == '0') {
      tokenListButton =
        <GlowingButton disabled={true}>
          Purchase Tokens
        </GlowingButton>;
    } else if (tokenAmountListed > 1546234128) {
      tokenListButton =
        <GlowingButton disabled={true} buttonColor={'red'}>
          Not Enough Tokens
        </GlowingButton>;
    } else {
      tokenListButton =
        <GlowingButton
          onClick={() => {
            setListToken(false);
            setTokenListNotif(true);
            setTokenAmountListed('');
            setTokenPrice('');
          }}>Purchase Tokens</GlowingButton>;
    }
  }

  return (
    <>
      <PositiveNotification isActive={aiPurchaseNotif} onClose={() => {
        setAiPurchaseNotif(false);
        setAiBid({});
      }}>
        <img src={getAiImage(aiBid.rarity)} className={`glow-${aiBid.rarity}`}></img>
        <span>
          Purchased
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PositiveNotification isActive={pcPurchaseNotif} onClose={() => {
        setPcPurchaseNotif(false);
        setPcBid({});
      }}>
        <img src={getPcImage(pcBid.rarity)} className={`glow-${pcBid.rarity}`}></img>
        <span>
          Purchased
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PositiveNotification isActive={tokenPurchaseNotif} onClose={() => {
        setTokenPurchaseNotif(false);
        setTokenBid({});
      }}>
        <img src={tokenImage} className={`glow-rare`}></img>
        <span>
          Purchased
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PositiveNotification isActive={tokenListNotif} onClose={() => {
        setTokenListNotif(false);
      }}>
        <img src={tokenImage} className={`glow-rare`}></img>
        <span>
          Listed
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PositiveNotification isActive={showDelistAiNotif} onClose={() => {
        setShowDelistAiNotif(false);
        setDelistingAi({});
      }}>
        <img src={getAiImage(delistingAi.rarity)} className={`glow-${delistingAi.rarity}`}></img>
        <span>
          Delisted
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PositiveNotification isActive={showDelistPcNotif} onClose={() => {
        setDelistingPc({});
        setShowDelistPcNotif(false);
      }}>
        <img src={getPcImage(delistingPc.rarity)} className={`glow-${delistingPc.rarity}`}></img>
        <span>
          Delisted
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PositiveNotification isActive={showDelistTokenNotif} onClose={() => {
        setShowDelistTokenNotif(false);
        setDelistingToken({});
      }}>
        <img src={tokenImage} className={`glow-rare`}></img>
        <span>
          Delisted
          <PiCheckBold></PiCheckBold>
        </span>
      </PositiveNotification>

      <PopUp isActive={buyAi} onClose={() => setBuyAi(false)}>
        <div className={buyPopUpStyle.container}>
          <div className={buyPopUpStyle.image}>
            <img src={getAiImage(aiBid.rarity)} className={`glow-${aiBid.rarity}`}></img>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            Rarity: <span className={`text-${aiBid.rarity}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{aiBid.rarity}</span>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            This <span className='greenHighlight'>AI</span> has not been used yet. <span className='greenHighlight'>Connect PC</span> to it to start using. Then the AI will start to bring you profit
          </div>
          Every PC connected to this AI will be farming tokens during this time:<br />
          <span className={`${buyPopUpStyle.iconWrapper} greenHighlight`} style={{ fontSize: 'x-large' }}>
            <PiClockBold></PiClockBold>
            N Hours
          </span>
          <br />
          You can link this many PCs to the AI:
          <span className={`${buyPopUpStyle.iconWrapper} text-common`}>
            <PiDesktopBold></PiDesktopBold>
            N Common PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-uncommon`}>
            <PiDesktopBold></PiDesktopBold>
            N Uncommon PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-rare`}>
            <PiDesktopBold></PiDesktopBold>
            N Rare PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-epic`}>
            <PiDesktopBold></PiDesktopBold>
            N Epic PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-legendary`}>
            <PiDesktopBold></PiDesktopBold>
            N Legendary PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-ultra`}>
            <PiDesktopBold></PiDesktopBold>
            N Ultra PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-mythic`}>
            <PiDesktopBold></PiDesktopBold>
            N Mythic PCs
          </span>
          <span className='priceWrapper' style={{ justifyContent: 'center', fontSize: 'x-large', marginTop: '1rem' }}>
            Price: {aiBid.price}
            <img src={tokenImage}></img>
          </span>
        </div>
        <div className={buyPopUpStyle.buttonContainer}>
          {
            aiBid.price > 500 ?
              <GlowingButton disabled={true} buttonColor={'red'}>
                Not enough tokens
              </GlowingButton> :
              <GlowingButton onClick={() => {
                setBuyAi(false);
                setAiPurchaseNotif(true);
              }}>Purchase AI</GlowingButton>
          }
        </div>
      </PopUp>

      <PopUp isActive={buyPc} onClose={() => setBuyPc(false)}>
        <div className={buyPopUpStyle.container}>
          <div className={buyPopUpStyle.image}>
            <img src={getPcImage(pcBid.rarity)} className={`glow-${pcBid.rarity}`}></img>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            Rarity: <span className={`text-${pcBid.rarity}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{pcBid.rarity}</span>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            While the <span className='greenHighlight'>PC is not activated</span>, you can sell it. As soon as you start using it, you will not be able to list it on the market
          </div>
          Earnings per hour:<br />
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large' }}>
            <img src={tokenImage} style={{ marginRight: '0.2em', marginLeft: '0em' }}></img>
            N/hour
          </span>
          <br />
          PC duration:<br />
          <span className={`${buyPopUpStyle.iconWrapper} greenHighlight`}>
            <PiClockBold></PiClockBold>
            N Hours
          </span>
          <br />
          This PC takes up this many slots for each AI:
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-common`}>
            <img src={getAiImage('common')} className='glow-common'></img>
            N for common AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-uncommon`}>
            <img src={getAiImage('uncommon')} className='glow-uncommon'></img>
            N for uncommon AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-rare`}>
            <img src={getAiImage('rare')} className='glow-rare'></img>
            N for rare AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-epic`}>
            <img src={getAiImage('epic')} className='glow-epic'></img>
            N for epic AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-legendary`}>
            <img src={getAiImage('legendary')} className='glow-legendary'></img>
            N for legendary AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-ultra`}>
            <img src={getAiImage('ultra')} className='glow-ultra'></img>
            N for ultra AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-mythic`}>
            <img src={getAiImage('mythic')} className='glow-mythic'></img>
            N for mythic AI
          </span>
          <span className='priceWrapper' style={{ justifyContent: 'center', fontSize: 'x-large', marginTop: '1rem' }}>
            Price: {pcBid.price}
            <img src={tokenImage}></img>
          </span>
        </div>
        <div className={buyPopUpStyle.buttonContainer}>
          {
            pcBid.price > 500 ?
              <GlowingButton disabled={true} buttonColor={'red'}>
                Not enough tokens
              </GlowingButton> :
              <GlowingButton onClick={() => {
                setBuyPc(false);
                setPcPurchaseNotif(true);
              }}>Purchase PC</GlowingButton>
          }
        </div>
      </PopUp>

      <PopUp isActive={buyToken} onClose={() => {
        setBuyToken(false);
        setTokenAmountPurchased('');
      }}>
        <div className={buyPopUpStyle.container}>
          <div className={buyPopUpStyle.image}>
            <img src={tokenImage} className={`glow-rare`}></img>
          </div>
          <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Available:</span>
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
            {tokenBid.quantity}
            <img src={tokenImage}></img>
          </span>
          <br />
          <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Price:</span>
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
            {tokenBid.price}
            <img src={tonImage} style={{ marginRight: '1rem' }}></img>
            for 1
            <img src={tokenImage}></img>
          </span><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input value={tokenAmountPurchased} setValue={setTokenAmountPurchased} placeholder='Amount'></Input>
          </div>
          {
            tokenAmountPurchased == '' || tokenAmountPurchased == '0' ?
              <></> :
              <>
                <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Total:</span>
                <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
                  {tokenBid.price * parseFloat(tokenAmountPurchased)}
                  <img src={tonImage}></img>
                </span>
              </>
          }
        </div>
        <div className={buyPopUpStyle.buttonContainer}>
          {tokenBuyButton}
        </div>
      </PopUp>

      <PopUp isActive={listToken} onClose={() => {
        setListToken(false);
        setTokenAmountListed('');
        setTokenPrice('');
      }}>
        <div className={buyPopUpStyle.container}>
          <div className={buyPopUpStyle.image}>
            <img src={tokenImage} className={`glow-rare`}></img>
          </div>
          <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Available:</span>
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
            1,546,234,128
            <img src={tokenImage}></img>
          </span>
          <br />
          <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Price:</span>
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
            {tokenBid.price}
            <img src={tonImage} style={{ marginRight: '1rem' }}></img>
            for 1
            <img src={tokenImage}></img>
          </span><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input value={tokenAmountListed} setValue={setTokenAmountListed} placeholder='Amount'></Input>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input value={tokenPrice} setValue={setTokenPrice} placeholder='Price'></Input>
          </div>
          {
            tokenAmountListed == '' || tokenAmountListed == '0' || tokenPrice == '' || tokenPrice == '0' ?
              <></> :
              <>
                <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Listing:</span>
                <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
                  {numberWithCommas(parseFloat(tokenAmountListed))}
                  <img src={tokenImage}></img>
                </span><br />
                <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Price:</span>
                <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
                  {parseFloat(tokenPrice)}
                  <img src={tonImage} style={{ marginRight: '1rem' }}></img>
                  for 1
                  <img src={tokenImage}></img>
                </span><br />
              </>
          }
        </div>
        <div className={buyPopUpStyle.buttonContainer}>
          {tokenListButton}
        </div>
      </PopUp>

      <PopUp isActive={showDelistAi} onClose={() => {
        setShowDelistAi(false);
        setDelistingAi({});
      }}>
        <div className={buyPopUpStyle.container}>
          <div className={buyPopUpStyle.image}>
            <img src={getAiImage(delistingAi.rarity)} className={`glow-${delistingAi.rarity}`}></img>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            Rarity: <span className={`text-${delistingAi.rarity}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{delistingAi.rarity}</span>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            This <span className='greenHighlight'>AI</span> has not been used yet. <span className='greenHighlight'>Connect PC</span> to it to start using. Then the AI will start to bring you profit
          </div>
          Every PC connected to this AI will be farming tokens during this time:<br />
          <span className={`${buyPopUpStyle.iconWrapper} greenHighlight`} style={{ fontSize: 'x-large' }}>
            <PiClockBold></PiClockBold>
            N Hours
          </span>
          <br />
          You can link this many PCs to the AI:
          <span className={`${buyPopUpStyle.iconWrapper} text-common`}>
            <PiDesktopBold></PiDesktopBold>
            N Common PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-uncommon`}>
            <PiDesktopBold></PiDesktopBold>
            N Uncommon PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-rare`}>
            <PiDesktopBold></PiDesktopBold>
            N Rare PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-epic`}>
            <PiDesktopBold></PiDesktopBold>
            N Epic PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-legendary`}>
            <PiDesktopBold></PiDesktopBold>
            N Legendary PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-ultra`}>
            <PiDesktopBold></PiDesktopBold>
            N Ultra PCs
          </span>
          <span className={`${buyPopUpStyle.iconWrapper} text-mythic`}>
            <PiDesktopBold></PiDesktopBold>
            N Mythic PCs
          </span>
          <span className='priceWrapper' style={{ justifyContent: 'center', fontSize: 'x-large', marginTop: '1rem' }}>
            Listed for: {delistingAi.price}
            <img src={tokenImage}></img>
          </span>
        </div>
        <div className={buyPopUpStyle.buttonContainer}>
          <GlowingButton buttonColor={'orange'} onClick={() => {
            setShowDelistAi(false);
            setShowDelistAiNotif(true);
          }}>Delist AI</GlowingButton>
        </div>
      </PopUp>

      <PopUp isActive={showDelistPc} onClose={() => {
        setShowDelistPc(false);
        setDelistingPc({});
      }}>
        <div className={buyPopUpStyle.container}>
          <div className={buyPopUpStyle.image}>
            <img src={getPcImage(delistingPc.rarity)} className={`glow-${delistingPc.rarity}`}></img>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            Rarity: <span className={`text-${delistingPc.rarity}`} style={{ fontWeight: 'bold', fontSize: 'large' }}>{delistingPc.rarity}</span>
          </div>
          <div className={buyPopUpStyle.centeredText}>
            While the <span className='greenHighlight'>PC is not activated</span>, you can sell it. As soon as you start using it, you will not be able to list it on the market
          </div>
          Earnings per hour:<br />
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large' }}>
            <img src={tokenImage} style={{ marginRight: '0.2em', marginLeft: '0em' }}></img>
            N/hour
          </span>
          <br />
          PC duration:<br />
          <span className={`${buyPopUpStyle.iconWrapper} greenHighlight`}>
            <PiClockBold></PiClockBold>
            N Hours
          </span>
          <br />
          This PC takes up this many slots for each AI:
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-common`}>
            <img src={getAiImage('common')} className='glow-common'></img>
            N for common AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-uncommon`}>
            <img src={getAiImage('uncommon')} className='glow-uncommon'></img>
            N for uncommon AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-rare`}>
            <img src={getAiImage('rare')} className='glow-rare'></img>
            N for rare AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-epic`}>
            <img src={getAiImage('epic')} className='glow-epic'></img>
            N for epic AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-legendary`}>
            <img src={getAiImage('legendary')} className='glow-legendary'></img>
            N for legendary AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-ultra`}>
            <img src={getAiImage('ultra')} className='glow-ultra'></img>
            N for ultra AI
          </span>
          <span className={`${buyPopUpStyle.aiSlotsWrapper} text-mythic`}>
            <img src={getAiImage('mythic')} className='glow-mythic'></img>
            N for mythic AI
          </span>
          <span className='priceWrapper' style={{ justifyContent: 'center', fontSize: 'x-large', marginTop: '1rem' }}>
            Listed for: {delistingPc.price}
            <img src={tokenImage}></img>
          </span>
        </div>
        <div className={buyPopUpStyle.buttonContainer}>
          <GlowingButton buttonColor={'orange'} onClick={() => {
            setShowDelistPcNotif(true);
            setShowDelistPc(false);
          }}>Delist PC</GlowingButton>
        </div>
      </PopUp>

      <PopUp isActive={showDelistToken} onClose={() => {
        setShowDelistToken(false);
        setDelistingToken({});
      }}>
        <div className={buyPopUpStyle.container}>
          <div className={buyPopUpStyle.image}>
            <img src={tokenImage} className={`glow-rare`}></img>
          </div>
          <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Listed:</span>
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
            {delistingToken.quantity ? numberWithCommas(delistingToken.quantity) : 0}
            <img src={tokenImage}></img>
          </span>
          <br />
          <span style={{ fontSize: 'x-large', textAlign: 'center' }}>Price:</span>
          <span className='priceWrapper greenHighlight' style={{ fontSize: 'x-large', justifyContent: 'center' }}>
            {delistingToken.price}
            <img src={tonImage} style={{ marginRight: '1rem' }}></img>
            for 1
            <img src={tokenImage}></img>
          </span>
        </div>
        <div className={buyPopUpStyle.buttonContainer}>
          <GlowingButton buttonColor={'orange'} onClick={() => {
            setShowDelistTokenNotif(true);
            setShowDelistToken(false);
          }}>Delist Token Bid</GlowingButton>
        </div>
      </PopUp>

      <div className={s.container}>
        <div className={s.topSelector}>
          <button className={`${topSelectorStyle.button} ${showMarket ? topSelectorStyle.active : ''}`} onClick={() => {
            setShowMarket(true);
          }}>Market</button>
          <button className={`${topSelectorStyle.button} ${showMarket ? '' : topSelectorStyle.active}`} onClick={() => {
            setShowMarket(false);
          }}>Listed</button>
        </div>
        {
          showMarket ?
            <>
              <div className={s.itemSelector}>
                {
                  showAi ?
                    <RarityDropdown imgSrc={getAiImage(curAi)} showDropdown={showAiDropdown} setShowDropdown={setShowAiDropdown}>
                      {raritiesData.map((rarity) => {
                        return (
                          <div key={rarity} className={s.dropdownItem} onClick={() => {
                            setCurAi(rarity);
                            setShowAiDropdown(false);
                          }}>
                            <img src={getAiImage(rarity)} style={{ width: '1rem' }}></img>
                            <span className={`text-${rarity}`}>{rarity}</span>
                          </div>
                        )
                      })}
                    </RarityDropdown> :
                    <button className={itemSelectorStyle.button} onClick={() => {
                      setShowAi(true);
                      setShowPc(false);
                      setShowToken(false);
                    }}>
                      <img src={getAiImage(curAi)}></img>
                    </button>
                }
                {
                  showPc ?
                    <RarityDropdown imgSrc={getPcImage(curPc)} showDropdown={showPcDropdown} setShowDropdown={setShowPcDropdown}>
                      {raritiesData.map((rarity) => {
                        return (
                          <div key={rarity} className={s.dropdownItem} onClick={() => {
                            setCurPc(rarity);
                            setShowPcDropdown(false);
                          }}>
                            <img src={getPcImage(rarity)} style={{ width: '1.5rem' }}></img>
                            <span className={`text-${rarity}`}>{rarity}</span>
                          </div>
                        )
                      })}
                    </RarityDropdown> :
                    <button className={itemSelectorStyle.button} onClick={() => {
                      setShowPc(true);
                      setShowAi(false);
                      setShowToken(false);
                    }}>
                      <img src={getPcImage(curPc)}></img>
                      {showPc ? <PiCaretDownBold></PiCaretDownBold> : <></>}
                    </button>
                }
                <button className={`${itemSelectorStyle.button} ${showToken ? itemSelectorStyle.active : ''}`} onClick={() => {
                  setShowToken(true);
                  setShowAi(false);
                  setShowPc(false);
                }}>
                  <img src={tokenImage}></img>
                </button>
              </div>
              <div className={s.itemsContainer}>
                {
                  showAi ?
                    aiItems[curAi].map((ai) => {
                      return (
                        <SellingItem key={ai.id} imgSrc={getAiImage(ai.rarity)} price={ai.price} rarity={ai.rarity} onBuyClick={() => {
                          setAiBid(ai);
                          setBuyAi(true);
                        }}></SellingItem>
                      )
                    }) :
                    <></>
                }
                {
                  showPc ?
                    pcItems[curPc].map((pc) => {
                      return (
                        <SellingItem key={pc.id} imgSrc={getPcImage(pc.rarity)} price={pc.price} rarity={pc.rarity} onBuyClick={() => {
                          setPcBid(pc);
                          setBuyPc(true);
                        }}></SellingItem>
                      )
                    }) :
                    <></>
                }
                {
                  showToken ?
                    tokenItems.map((token) => {
                      return (
                        <SellingItem key={token.id} imgSrc={tokenImage} price={token.price} isToken={true} rarity={'rare'} onBuyClick={() => {
                          setTokenBid(token);
                          setBuyToken(true);
                        }}></SellingItem>
                      )
                    }) :
                    <></>
                }
              </div>
            </> :
            <>
              <div className={s.itemSelector}>
                <button
                  className={`${itemSelectorStyle.button} ${listedItemType == 'ai' ? itemSelectorStyle.active : ''}`}
                  onClick={() => {
                    setListedItemType('ai');
                  }}>
                  <img src={getAiImage('common')}></img>
                </button>
                <button
                  className={`${itemSelectorStyle.button} ${listedItemType == 'pc' ? itemSelectorStyle.active : ''}`}
                  onClick={() => {
                    setListedItemType('pc');
                  }}>
                  <img src={getPcImage('common')}></img>
                </button>
                <button
                  className={`${itemSelectorStyle.button} ${listedItemType == 'token' ? itemSelectorStyle.active : ''}`}
                  onClick={() => {
                    setListedItemType('token');
                  }}>
                  <img src={tokenImage}></img>
                </button>
              </div>
              {
                listedItemType == 'ai' ?
                  <div className={s.itemsContainer}>
                    {listedAi.map((ai) => {
                      return (
                        <ListedItem key={ai.id} imgSrc={getAiImage(ai.rarity)} price={ai.price} rarity={ai.rarity} onDelistClick={() => {
                          setDelistingAi(ai);
                          setShowDelistAi(true);
                        }}></ListedItem>
                      )
                    })}
                  </div> :
                  <></>
              }
              {
                listedItemType == 'pc' ?
                  <div className={s.itemsContainer}>
                    {listedPc.map((pc) => {
                      return (
                        <ListedItem key={pc.id} imgSrc={getPcImage(pc.rarity)} price={pc.price} rarity={pc.rarity} onDelistClick={() => {
                          setDelistingPc(pc);
                          setShowDelistPc(true);
                        }}></ListedItem>
                      )
                    })}
                  </div> :
                  <></>
              }
              {
                listedItemType == 'token' ?
                  <>
                    <div className={s.listToken}>
                      <span className='priceWrapper'>
                        <img src={tokenImage}></img>
                        1,546,234,128
                      </span>
                      <button onClick={() => setListToken(true)}>
                        $
                      </button>
                    </div>
                    <div className={s.itemsContainer}>
                      {listedTokens.map((token) => {
                        return (
                          <ListedItem key={token.id} imgSrc={tokenImage} price={token.price} isToken={true} rarity={'rare'} onDelistClick={() => {
                            setDelistingToken(token);
                            setShowDelistToken(true);
                          }}></ListedItem>
                        )
                      })}
                    </div>
                  </> :
                  <></>
              }
            </>
        }
      </div>
    </>

  )
}