import './PopUp.css'

// eslint-disable-next-line react/prop-types
export default function PopUp({ isActive, onClose, children }) {
  return (
    <>
      {isActive && (
      <div className='popUpOverlay' onClick={onClose}>
        <div className='popUp' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
      )}
    </>
  )
} 