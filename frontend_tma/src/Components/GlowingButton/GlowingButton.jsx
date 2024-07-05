import s from'./GlowingButton.module.css'

// eslint-disable-next-line react/prop-types
export default function GlowingButton({ onClick, buttonColor, glowSize, width, children }) {
  switch (buttonColor) {
    case 'positive':
      buttonColor = 'var(--positive-color)'
      break;

    case 'negative':
      buttonColor = 'var(--negative-color)'
      break;
  
    default:
      break;
  }
  return (
    <button className={s.GlowingButton} style={{'--button-color': buttonColor, '--glow-size': glowSize, width: width}} onClick={() => onClick()}>{children}</button>
  )
}