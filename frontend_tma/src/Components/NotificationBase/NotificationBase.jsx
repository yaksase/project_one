import PropTypes from 'prop-types'

import s from './NotificationBase.module.css'

NotificationBase.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}

export default function NotificationBase({ isActive, onClose, children }) {
  return (
    <>
      {isActive && (
        <div className={s.notifOverlay} onClick={onClose}>
          <div className={s.notif}>
            {children}
          </div>
        </div>
      )}
    </>
  )
}