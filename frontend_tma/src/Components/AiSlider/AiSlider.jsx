import { useState, useEffect, cloneElement, Children, useRef } from 'react';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

import s from './AiSlider.module.css';

// eslint-disable-next-line react/prop-types
export default function AiSlider({ curPageHook, hidden = false, children }) {
  const [pages, setPages] = useState([]);
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
      const newPage = Math.max(prevPage - 1, 0);
      if (curPageHook != null) {
        curPageHook(newPage);
      }
      return newPage;
    });
  }

  function handleRight() {
    setCurPage((prevPage) => {
      const newPage = Math.min(prevPage + 1, pages.length - 1);
      if (curPageHook != null) {
        curPageHook(newPage);
      }
      return newPage;
    });
  }

  function calculateOffset(curPage) {
    return -(curPage * width);
  }

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: '100%',
            maxWidth: '100%',
            minWidth: '100%'
          }
        })
      })
    )
  }, [])

  return (
    <div className={s.main} style={hidden ? {visibility: 'hidden', height: 0} : {}}>
      <div className={s.controlsWrapper}>
        {curPage > 0 ? 
          <PiCaretLeftBold onClick={handleLeft}></PiCaretLeftBold> : 
          <PiCaretLeftBold onClick={handleLeft} style={{ visibility: 'hidden' }}></PiCaretLeftBold>}
        {curPage < pages.length - 1 ?
          <PiCaretRightBold onClick={handleRight}></PiCaretRightBold> :
          <PiCaretRightBold onClick={handleRight} style={{ visibility: 'hidden' }}></PiCaretRightBold>}
      </div>

      <div className={s.window} ref={windowElRef}>
        <div className={s.allPages} style={{ transform: `translateX(${calculateOffset(curPage)}px)` }}>
          {pages}
        </div>
      </div>
    </div>
  )
}