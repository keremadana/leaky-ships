import Image from 'next/image';
import { CSSProperties } from 'react'

function Ships() {
    let shipIndexes: number[] = [];

    for (let i = 1; i <= 6; i++) {
      shipIndexes.push(i);
    }

    return <>
        {shipIndexes.map(i =>
            <div key={i} className={`ship s${i}`} style={{'--x': i+3} as CSSProperties}>
                <Image src={`/svgs/${i}.svg`} alt={`${i}.svg`}/>
            </div>
        )}
    </>
}

export default Ships;
