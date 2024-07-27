import PropTypes from 'prop-types'

import s from './PopUp.module.css'

PopUp.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}

export default function PopUp({ isActive, onClose, children }) {
  return (
    <>
      {isActive && (
      <div className={s.popUpOverlay} onClick={onClose}>
        <div className={s.popUp} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
      )}
    </>
  )
}