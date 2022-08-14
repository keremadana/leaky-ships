import { faBurst, faCrosshairs, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, useEffect, useState } from 'react';
import { TargetPreviewType } from './interfaces';
import './styles/App.scss';

function App() {

  const [target, setTarget] = useState({
    show: false,
    x: 0,
    y: 0
  })
  const [targetPreview, setTargetPreview] = useState<TargetPreviewType>({
    newX: 0,
    newY: 0,
    shouldShow: false,
    appearOK: false,
    eventReady: true,
    show: false,
    x: 0,
    y: 0
  })

  let borderTiles: JSX.Element[] = [];
  let shipElems: JSX.Element[] = [];
  let elems2: {
    field: string,
    x: number,
    y: number,
  }[] = [];
  let hitElems: {
      field: string,
      x: number,
      y: number,
    }[] = [],
    count = 12;
  for (let y = 0; y < count; y++) {
    elems2.push(...[
      // Up
      { field: String.fromCharCode(65+y), x: y+2, y: 1 },
      // Left
      { field: (y+1).toString(), x: 1, y: y+2 },
      // Bottom
      { field: String.fromCharCode(65+y), x: y+2, y: count+2 },
      // Right
      { field: (y+1).toString(), x: count+2, y: y+2 }
    ]);
    for (let x = 0; x < count; x++) {
      hitElems.push({ field: String.fromCharCode(65+x)+(y), x: x+2, y: y+2 })
    }
  }
  const hitSVGs = hitElems.map((obj, i) => 
    <div key={i} className='hit-svg' style={{'--x': obj.x, '--y': obj.y} as CSSProperties}>
      <FontAwesomeIcon icon={faBurst} />
    </div>);
    const corner = (x: number, y: number, count: number) => {switch (true) {
      case x === 0 && y === 0:
        return 'left-top-corner';
      case x === count+1 && y === 0:
        return 'right-top-corner';
      case x === 0 && y === count+1:
        return 'left-bottom-corner';
      case x === count+1 && y === count+1:
        return 'right-bottom-corner';
    
      default:
        return '';
    }};
    const border = (x: number, y: number, count: number) => {switch (true) {
      case x === 0:
        return 'left';
      case y === 0:
        return 'top';
      case x === count+1:
        return 'right';
      case y === count+1:
        return 'bottom';
    
      default:
        return '';
    }};
  for (let y = 0; y < count+2; y++) {
    for (let x = 0; x < count+2; x++) {
      const cornerReslt = corner(x, y, count);
      const borderType = cornerReslt ? cornerReslt : border(x, y, count);
      const isGameTile = x > 0 && x < count+1 && y > 0 && y < count+1;
      const classNames = ['border-tile'];
      if (borderType)
        classNames.push('edge', borderType);
      if (isGameTile)
        classNames.push('game-tile');
      borderTiles.push(
        <div
          key={y*(count+2)+x}
          className={classNames.join(' ')}
          style={{'--x': (x + 1), '--y': (y + 1)} as CSSProperties}
          onClick={() => {
            if (isGameTile)
              setTarget({ show: true, x, y });
          }}
          onMouseEnter={() => setTargetPreview(e => ({...e, newX: x, newY: y, shouldShow: isGameTile}))}
        ></div>
      )
    }
  }
  
  // handle visibility and position change of targetPreview
  useEffect(() => {
    const {newX, newY, shouldShow, appearOK, eventReady, show, x, y} = targetPreview;
    const positionChange = !(x === newX && y === newY);
    // if not ready or no new position
    if (!eventReady || !positionChange)
      return;
    if (show) {
      // hide preview to change position when hidden
      setTargetPreview(e => ({...e, appearOK: false, eventReady: false, show: false}));
    } else if (shouldShow && appearOK) {
      // BUT only appear again if it's supposed to (in case the mouse left over the edge) and ()
      setTargetPreview(e => ({...e, appearOK: false, eventReady: false, show: true, x: newX, y: newY}));
    }
  }, [targetPreview])

  // enable targetPreview event again after 200 mil. sec.
  useEffect(() => {
    if (targetPreview.eventReady)
      return;
    const autoTimeout = setTimeout(() => {
      setTargetPreview(e => ({...e, eventReady: true}));
    }, 200);
  
    // or abort if state has changed early
    return () => {
      clearTimeout(autoTimeout);
    }
  }, [targetPreview.eventReady]);

  // approve targetPreview new position after 200 mil. sec.
  useEffect(() => {
    // early return to start cooldown only when about to show up
    if (!targetPreview.shouldShow)
      return;
    const autoTimeout = setTimeout(() => {
      setTargetPreview(e => ({...e, appearOK: true}));
    }, 350);
  
    // or abort if movement is repeated early
    return () => {
      clearTimeout(autoTimeout);
    }
  }, [targetPreview.shouldShow, targetPreview.newX, targetPreview.newY]);

  for (let i = 1; i <= 6; i++) {
    shipElems.push(
      <div key={i} className={`ship s${i}`} style={{'--x': i+3} as CSSProperties}>
        <img src={`/svgs/${i}.svg`} alt={`${i}.svg`}/>
      </div>);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="game-frame" style={{'--i': count} as CSSProperties}>
          {/* Bordes */}
          { borderTiles }

          {/* Collumn lettes and row numbers */}
          {elems2.map((obj, i) =>
            <span key={i} className={`${obj.field} r1`} style={{'--x': obj.x, '--y': obj.y} as CSSProperties}>{obj.field}</span>
          )}
          { hitSVGs }

          {/* Ships */}
          {/* { shipElems } */}

          {/* Fog images */}
          {/* <img className='fog-left' src={`/fog/fog2.png`} alt={`fog1.png`} />
          <img className='fog-right' src={`/fog/fog2.png`} alt={`fog1.png`} />
          <img className='fog-middle' src={`/fog/fog4.png`} alt={`fog4.png`} /> */}
          <div className={`hit-svg target ${target.show ? 'show' : ''}`} style={{'--x': target.x+1, '--y': target.y+1} as CSSProperties}>
            <FontAwesomeIcon icon={faCrosshairs} />
          </div>
          <div className={`hit-svg target-preview ${targetPreview.show && (target.x !== targetPreview.x || target.y !== targetPreview.y) ? 'show' : ''}`} style={{'--x': targetPreview.x+1, '--y': targetPreview.y+1} as CSSProperties}>
            <FontAwesomeIcon icon={faCrosshairs} />
          </div>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a 
          className="App-link"
          href="https://www.freepik.com/free-vector/militaristic-ships-set-navy-ammunition-warship-submarine-nuclear-battleship-float-cruiser-trawler-gunboat-frigate-ferry_10704121.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Battleships designed by macrovector
        </a>
      </header>
    </div>
  );
}

export default App;
