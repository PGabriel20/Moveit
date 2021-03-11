//Aqui se localizam os componentes estáticos, vulgo: header, side-bar etc
import { ChallengesProvider } from '../contexts/ChallengesContext'
import { CountdownProvider } from '../contexts/CountdownContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return(
    <Component {...pageProps} />
  )
}

export default MyApp
