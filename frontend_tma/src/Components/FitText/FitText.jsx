import { Textfit } from 'react-textfit';

import s from './FitText.module.css';

export default function FitText({ text, mode = 'single', min = 10, max = 20 }) {
    return (
        <Textfit mode={mode} min={min} max={max}>{text}</Textfit>
    )
}