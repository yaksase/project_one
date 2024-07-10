/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

import s from './AvailablePc.module.css';

export default function AvailablePc({ curPageHook, hidden = false, children }) {
  const [curPage, setCurPage] = useState(0);
  const [width, setWidth] = useState(300);

  const windowElRef = useRef();

  useEffect(() => {
    const resizeHandler = () => {
      const _width = windowElRef.current.offsetWidth;
      setWidth(_width);
      setCurPage(0);
    }
    
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [])

  function handleLeft() {
    setCurPage((prevPage) => {
      const newPage = Math.max(prevPage - 3, 0);
      if (curPageHook != null) {
        curPageHook(newPage);
      }
      return newPage;
    });
  }

  function handleRight() {
    setCurPage((prevPage) => {
      const newPage = Math.min(prevPage + 3, children.length - 3);
      console.log(newPage);
      if (curPageHook != null) {
        curPageHook(newPage);
      }
      return newPage;
    });
  }

  function calculateOffset(curPage) {
    return -(curPage * width/3);
  }

  useEffect(() => {
    setCurPage((prevPage) => {
      return Math.min(prevPage, children.length - 3);
    })
  }, [children])

  return (
    <div className={s.main} style={hidden ? {visibility: 'hidden', height: 0} : {}}>
      <div className={s.controlsWrapper}>
        {curPage > 0 ?
          <PiCaretLeftBold onClick={handleLeft}></PiCaretLeftBold> : 
          <PiCaretLeftBold onClick={handleLeft} style={{ visibility: 'hidden' }}></PiCaretLeftBold>}
        {curPage < children.length - 3 ?
          <PiCaretRightBold onClick={handleRight}></PiCaretRightBold> :
          <PiCaretRightBold onClick={handleRight} style={{ visibility: 'hidden' }}></PiCaretRightBold>}
      </div>
      <div className={s.window} ref={windowElRef}>
        <div className={s.allPages} style={{ transform: `translateX(${calculateOffset(curPage)}px)`, justifyContent: children.length > 2 ? '' : 'center'}}>
          {children}
        </div>
      </div>
    </div>
  )
}