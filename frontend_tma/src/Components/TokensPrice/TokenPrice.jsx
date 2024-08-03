import { Textfit } from 'react-textfit';

import s from './TokensPrice.module.css';

import tokenImage from '../../assets/token_icon.png';

export default function TokenPrice(price = '123', max = 30, min = 5) {
    console.log(price, {price});
    console.log('max: ', max, {max});
    return (
        <div className={s.container}>
            <div className={s.textContainer}><Textfit mode='single' className={s.text} max={30} min={5}>123456<img src={tokenImage} className={s.icon}></img></Textfit></div>
        </div>
    )
}