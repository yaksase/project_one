/*
Component for writing any number of any coins that can resize itself
// input:
max - maximum font-size in px (35)
min - minimum font-size in px (8)
coin - ton/token(default: token)
width - width of the main container (100%)
position - position of string in container - left/right/center (center)
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
    width: PropTypes.string,
    center: PropTypes.string
}

export default function TokenPrice({amount = '13', max = 35, min = 8, coin = 'token', width = '100%', position = 'center' }) {
    let coinImage = (coin === "token" ? tokenImage : tonImage);
    return (
        <div className={s.container} style={{ width: width, textAlign: position }}>
            <div className={s.textContainer}><Textfit mode='single' max={max} min={min} style={{ textAlign: position }}>{amount}<span className={s.iconContainer}><img src={coinImage} className={s.icon}></img></span></Textfit></div>
        </div>
    )
}