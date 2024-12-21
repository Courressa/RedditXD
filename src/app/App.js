import React from 'react';
import { Counter } from '../features/counter/Counter';
import { Banner } from '../containers/Banner/Banner';
import { Topics } from '../containers/Topics/Topics';
import { Posts } from '../containers/Posts/Posts';
import styles from "./App.module.css"
import './App.css';

function App() {
  

  return (
    <div className={styles.app}>
      <header>
        <Banner className={styles.banner} />
      </header>
      <main className={styles.content}>
          <Topics />
          <Posts />
      </main>
    </div>
  );
}

export default App;
