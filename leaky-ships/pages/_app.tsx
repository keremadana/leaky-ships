import '../styles/App.scss'
import '../styles/home.scss'
import '../styles/home2.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
