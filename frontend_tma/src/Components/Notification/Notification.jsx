import s from './Notification.module.css'

// eslint-disable-next-line react/prop-types
export default function Notification({ isActive, onClose, children }) {
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