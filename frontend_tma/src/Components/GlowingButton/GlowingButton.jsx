import PropTypes from 'prop-types';

import s from'./GlowingButton.module.css'

GlowingButton.propTypes = {
  onClick: PropTypes.func,
  buttonColor: PropTypes.string,
  glowSize: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  verticalPadding: PropTypes.string,
  disabled: PropTypes.bool
}

export default function GlowingButton({ onClick = () => {}, buttonColor = '', glowSize = '0.6em', width = '', children, verticalPadding = '0.5em', disabled = false }) {
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
    <button className={s.GlowingButton} disabled={disabled} style={{'--button-color': buttonColor, '--glow-size': glowSize, width: width, paddingTop: verticalPadding, paddingBottom: verticalPadding }} onClick={() => onClick()}>{children}</button>
  )
}