import { useState, useEffect, cloneElement, Children, useRef } from 'react';
import { PiCaretCircleLeftFill, PiCaretCircleRightFill } from 'react-icons/pi';

import s from './Slider.module.css';

// eslint-disable-next-line react/prop-types
export default function Slider({ curPageHook, hidden = false, children }) {
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
          <PiCaretCircleLeftFill onClick={handleLeft}></PiCaretCircleLeftFill> : 
          <PiCaretCircleLeftFill onClick={handleLeft} style={{ visibility: 'hidden' }}></PiCaretCircleLeftFill>}
        {curPage < pages.length - 1 ?
          <PiCaretCircleRightFill onClick={handleRight}></PiCaretCircleRightFill> :
          <PiCaretCircleRightFill onClick={handleRight} style={{ visibility: 'hidden' }}></PiCaretCircleRightFill>}
      </div>

      <div className={s.window} ref={windowElRef}>
        <div className={s.allPages} style={{ transform: `translateX(${calculateOffset(curPage)}px)` }}>
          {pages}
        </div>
      </div>
    </div>
  )
}