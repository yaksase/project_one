import s from'./PositiveButton.module.css'

// eslint-disable-next-line react/prop-types
export default function PositiveButton({ onClick, children }) {
  return (
    <button className={s.PositiveButton} onClick={() => onClick()}>{children}</button>
  )
}