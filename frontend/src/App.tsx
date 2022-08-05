import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import './App.scss';

function App() {

  let elems: {
      field: string,
      x: number,
      y: number,
    }[] = [],
    count = 12;
  for (let x = 1; x <= count; x++) {
    for (let y = 1; y <= count; y++) {
      elems.push({field: String.fromCharCode(64+x)+(y), x, y})
    }
  }
  return (
    <div className="App">
      <header className="App-header">
          {[1,2,3,4,5,6,11,12,13,14].map(num => <img src={`/svgs/${num}.svg`} alt={`${num}.svg`} />)}
        <div id='game'>
          {elems.map(obj => <FontAwesomeIcon className={`${obj.field} r1`} style={{'--x': obj.x, '--y': obj.y} as CSSProperties} icon={faXmark} />)}
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
