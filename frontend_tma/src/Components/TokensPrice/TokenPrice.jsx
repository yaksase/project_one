/*
Component for writing any number of any coins that can resize itself
// input:
max - maximum font-size in px (35)
min - minimum font-size in px (8)
coin - ton/token(default: token)
width - width of the main container (100%);
*/
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

import s from './TokensPrice.module.css';

import tokenImage from '../../assets/token_icon.png';
import tonImage from '../../assets/ton_icon.svg';

TokenPrice.propTypes = {
    amount: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    coin: PropTypes.string,
    width: PropTypes.string
}

export default function TokenPrice({amount = '13', max = 35, min = 8, coin = 'token', width = '100%'}) {
    let coinImage = (coin === "token" ? tokenImage : tonImage);
    return (
        <div className={s.container} style={{ width: width }}>
            <div className={s.textContainer}><Textfit mode='single' max={max} min={min}>{amount}<span className={s.iconContainer}><img src={coinImage} className={s.icon}></img></span></Textfit></div>
        </div>
    )
}