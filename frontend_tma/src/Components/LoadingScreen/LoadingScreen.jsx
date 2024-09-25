import { lineSpinner } from "ldrs";

import s from './LoadingScreen.module.css';

lineSpinner.register('loading-placeholder');

export default function LoadingScreen() {
  return (
    <div className={s.loadingScreen}>
      <loading-placeholder color="white" size="80"></loading-placeholder>
    </div>
  );
}