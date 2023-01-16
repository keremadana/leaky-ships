import { faCompass } from '@fortawesome/pro-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/pro-thin-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function Home() {
    const [heWantsToPlay, setHeWantsToPlay] = useState(false)
    return (
        <div id='box'>
            <button id='navExpand'>
                <FontAwesomeIcon icon={faCompass} />
            </button>
            <div className='beforeStartBox'>
                <img id='shield' src="/assets/shield.png" alt="Shield Logo" />
                {!heWantsToPlay ?
                    <>
                        <div id='videoWrapper'>
                            <FontAwesomeIcon icon={faCirclePlay} />
                        </div>
                        <button id='startButton' onClick={() => setHeWantsToPlay(true)}>START</button>
                    </> :
                    <div id='startBox'>
                        <div>
                            <button className='optionButton'>Raum erstellen</button>
                            <button className='optionButton'>Raum beitreten</button>
                            <button className='optionButton'>Zuschauen</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
