import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import './App.scss';

function App() {

  let borders: JSX.Element[] = [];
  let elems2: {
    field: string,
    x: number,
    y: number,
  }[] = [];
  let elems: {
      field: string,
      x: number,
      y: number,
    }[] = [],
    count = 12;
  for (let x = 0; x < count; x++) {
    elems2.push(...[
      { field: String.fromCharCode(65+x), x: x+2, y: 1 },
      { field: (x+1).toString(), x: 1, y: x+2 },
      { field: String.fromCharCode(65+x), x: x+2, y: count+2 },
      { field: (x+1).toString(), x: count+2, y: x+2 }
    ])
    for (let y = 0; y < count; y++) {
      elems.push({ field: String.fromCharCode(65+x)+(y), x: x+2, y: y+2 })
    }
  }
  for (let x = 0; x < count+2; x++) {
    for (let y = 0; y < count+2; y++) {
      borders.push(<div className='border' style={{'--x': (x + 1), '--y': (y + 1)} as CSSProperties}></div>)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        {[1,2,3,4,5,6,11,12,13,14].map((num, i) => <img key={i} src={`/svgs/${num}.svg`} alt={`${num}.svg`} />)}
        <div id="game-frame">
            { borders }
            {elems2.map((obj, i) =>
              <span key={i} className={`${obj.field} r1`} style={{'--x': obj.x, '--y': obj.y} as CSSProperties}>{obj.field}</span>
            )}
          {/* <div id='game'> */}
            {elems.map((obj, i) => 
              <div key={i} className={`${obj.field} svg-r1`} style={{'--x': obj.x, '--y': obj.y} as CSSProperties}>
                <FontAwesomeIcon key={i} className={`${obj.field} r1`} icon={faXmark} />
              </div>)}
            {[1,2,3,4,5,6].map((num, i) => 
              <div key={i} id='test-ship' className={`s${num}`} style={{'--i': i+3} as CSSProperties}>
                <img src={`/svgs/${num}.svg`} alt={`${num}.svg`}/>
              </div>)}
            {/* <div id='test-ship' className='s2'>
              <img src={`/svgs/${3}.svg`} alt={`${3}.svg`} />
            </div> */}
          {/* </div> */}
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
