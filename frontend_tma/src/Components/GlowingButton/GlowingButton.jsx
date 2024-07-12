import s from'./GlowingButton.module.css'

// eslint-disable-next-line react/prop-types
export default function GlowingButton({ onClick, buttonColor, glowSize, width, children, verticalPadding = '0.5em' }) {
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
    <button className={s.GlowingButton} style={{'--button-color': buttonColor, '--glow-size': glowSize, width: width, paddingTop: verticalPadding, paddingBottom: verticalPadding }} onClick={() => onClick()}>{children}</button>
  )
}