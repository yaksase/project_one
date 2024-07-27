import PropTypes from 'prop-types'

import NotificationBase from "../NotificationBase/NotificationBase";

import s from './PositiveNotification.module.css';

PositiveNotification.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}

export default function PositiveNotification({ isActive, onClose, children }) {
  return (
    <NotificationBase isActive={isActive} onClose={onClose}>
      <div className={s.container}>
        {children}
      </div>
    </NotificationBase>
  )
}