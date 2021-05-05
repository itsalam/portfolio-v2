import Head from 'next/head'
import styles from '../styles/Index.module.scss';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SlideIndicator from '../components/Slides'

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <SlideIndicator/>
      <main className={styles.main}>

        <Hero/>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="icons/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
