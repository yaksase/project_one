import s from './HealthBar.module.css';

function getFillColor(percentage) {
  if (percentage > 75) {
    return 'var(--positive-color)';
  } else if (percentage > 50) {
    return 'yellow';
  } else if (percentage > 25) {
    return 'orange';
  } else if (percentage >= 0) {
    return 'red';
  }
}

// eslint-disable-next-line react/prop-types
export default function HealthBar({ percentage }) {
  return (
    <div className={s.progressBarWrapper}>
      <div className={s.progressBar}>
        <div
          className={s.filler}
          style={{ width: `${percentage}%`, backgroundColor: getFillColor(percentage) }}>
        </div>
      </div>
      <span>{`${percentage}%`}</span>
      
    </div>
    
  )
}