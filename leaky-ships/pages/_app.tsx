import '../styles/App.scss'
import '../styles/grid.scss'
import '../styles/grid2.scss'
import '../styles/homepage.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
