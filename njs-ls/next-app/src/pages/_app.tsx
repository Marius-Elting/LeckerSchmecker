import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'
import '../styles/globals.css'
import styles from "../styles/Home.module.scss"
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Header></Header>
        <Component className={styles.component} {...pageProps} />
        <NavBar></NavBar>

    </>
}
