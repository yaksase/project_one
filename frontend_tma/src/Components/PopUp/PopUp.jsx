import s from './PopUp.module.css'

// eslint-disable-next-line react/prop-types
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