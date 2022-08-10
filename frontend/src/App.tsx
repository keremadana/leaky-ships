import { faBurst, faCrosshairs, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, useState } from 'react';
import './styles/App.scss';

function App() {

  const [target, setTarget] = useState({
    event: false,
    x: 0,
    y: 0
  })
  const [targetPreview, setTargetPreview] = useState({
    event: false,
    x: 0,
    y: 0,
    style: {
      height: 0,
      top: 0,
      left: 0,
      width: 0
    }
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
  for (let y = 0; y < count+2; y++) {
    for (let x = 0; x < count+2; x++) {
      const corner = [
        x === 0 && y === 0 ? 'left-top-corner' : '',
        x === count+1 && y === 0 ? 'right-top-corner' : '',
        x === 0 && y === count+1 ? 'left-bottom-corner' : '',
        x === count+1 && y === count+1 ? 'right-bottom-corner' : ''
      ].filter(s => s);
      const border = [
        x === 0 ? 'left' : '',
        y === 0 ? 'top' : '',
        x === count+1 ? 'right' : '',
        y === count+1 ? 'bottom' : ''
      ].filter(s => s);
      const borderType = corner.length ? corner[0] : border[0];
      const action = x > 0 && x < count+1 && y > 0 && y < count+1;
      const classNames = [
        'border-tile',
        borderType ? `edge ${borderType}` : '',
        action ? 'action' : ''
      ].join(' ')
      borderTiles.push(
        <div
          key={y*(count+2)+x}
          className={classNames}
          style={{'--x': (x + 1), '--y': (y + 1)} as CSSProperties}
          onClick={action ? () => setTarget({ event: true, x, y }) : () => {}}
          onMouseEnter={e => {
            const target = e.target as HTMLDivElement
            if (action) {
              setTargetPreview({
                event: true,
                x,
                y,
                style: {
                  height: target.offsetHeight,
                  left: target.offsetLeft,
                  top: target.offsetTop,
                  width: target.offsetWidth,
                }
              })
            } else {
              setTargetPreview(e => Object.assign({...e}, {
                style: {
                  height: target.offsetHeight,
                  left: target.offsetLeft,
                  top: target.offsetTop,
                  width: target.offsetWidth,
                }
              }))
            }
          }}
          onMouseLeave={action ? () => setTargetPreview(e => Object.assign({...e}, {event: false})) : () => {}}
          ></div>)
    }
  }
  

  for (let i = 1; i <= 6; i++) {
    shipElems.push(
      <div key={i} className={`ship s${i}`} style={{'--i': i+3} as CSSProperties}>
        <img src={`/svgs/${i}.svg`} alt={`${i}.svg`}/>
      </div>);
  }
  return (
    <div className="App">
      <header className="App-header">
        {[1,2,3,4,5,6,11,12,13,14].map((num, i) => <img key={i} src={`/svgs/${num}.svg`} alt={`${num}.svg`} />)}
        {[1,2,3,4].map((num, i) => <img key={i} src={`/fog/fog${num}.png`} alt={`fog${num}.png`} />)}
        <div id="game-frame">
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
          <div className={`hit-svg target ${target.event ? 'show' : ''}`} style={{'--x': target.x+1, '--y': target.y+1} as CSSProperties}>
            <FontAwesomeIcon icon={faCrosshairs} />
          </div>
          <div className={`hit-svg target-preview ${targetPreview.event && (target.x !== targetPreview.x || target.y !== targetPreview.y) ? 'show' : ''}`} style={targetPreview.style}>
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
