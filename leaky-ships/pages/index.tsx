import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p><Link href='/gamefield' target='_blank'>Gamefield</Link></p>
        <p><Link href='/homepage' target='_blank'>Homepage</Link></p>
        <p><Link href='/grid' target='_blank'>Grid Effect</Link></p>
        <p><Link href='/grid2' target='_blank'>Grid Effect with Content</Link></p>
        <p><Link href='/socketio' target='_blank'>SocketIO</Link></p>
      </main>
    </>
  )
}
