/* eslint-disable react/prop-types */
import NotificationBase from "../NotificationBase/NotificationBase";

import s from './PositiveNotification.module.css';

export default function PositiveNotification({ isActive, onClose, children }) {
  return (
    <NotificationBase isActive={isActive} onClose={onClose}>
      <div className={s.container}>
        {children}
      </div>
    </NotificationBase>
  )
}