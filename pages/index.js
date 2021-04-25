import Head from 'next/head'
import { useEffect } from 'react';
import Typed from 'typed.js'
import { types } from 'util';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import "../styles/fonts.css";

export default function Home() {

  var typed = () => new Typed(`.${styles.title}` , {
    strings: ["Hi, ^500 nice to meet you. ^200", " Hi, ^200 I'm Vincent Lam."],
    smartBackspace: true,
    typeSpeed: 40,
    backSpeed: 50,
    showCursor: false,
  });

  useEffect(() => {
    typed();
  }
, [])



  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className={styles.main}>

        <div className={styles.hero}>
        <video id={styles.video} muted  loop={true} autoPlay>
          <source src="2.mp4" type="video/mp4"/>
        </video>
        <div className={styles.title}>

          </div>
  
          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>
        </div>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
