import './PositiveButton.css'

// eslint-disable-next-line react/prop-types
export default function PositiveButton({ onClick, children }) {
  return (
    <button className="PositiveButton" onClick={() => onClick()}>{children}</button>
  )
}