import Image from "next/image";

function FogImages() {
    return <>
        <Image className='fog left' src={`/fog/fog2.png`} alt={`fog1.png`} />
        <Image className='fog right' src={`/fog/fog2.png`} alt={`fog1.png`} />
        <Image className='fog middle' src={`/fog/fog4.png`} alt={`fog4.png`} />
    </>
}

export default FogImages;
