import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react';
// import framer motion
import { motion } from 'framer-motion';

export default function Home() {

  const [secondsLeftInDay, setSecondsLeftInDay] = useState(0);


  // Transition
  


  useEffect(() => {
    const calculateSecondsLeftInDay = () => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
      );
      const diffInSeconds = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
      setSecondsLeftInDay(diffInSeconds);
    };

    calculateSecondsLeftInDay();
    const intervalId = setInterval(calculateSecondsLeftInDay, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>maintime.io | Time Management</title>
        <link rel="icon" href="https://data.t3l.ls/media/maintime.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {secondsLeftInDay}
        </h1>
        <div>
          maintime your most precious asset!
        </div>
        {/* <div style={{ position: 'fixed', bottom: '3rem' }}>
          <a href="https://dev.watchti.me/login">Login (do not use yet)</a>
        </div> */}
      </main>
    </div>
  )
}