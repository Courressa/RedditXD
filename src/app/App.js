import React from 'react';
import { useSelector } from 'react-redux';
import { selectModeState } from '../features/ModeSetter/modeSetterSlice';
import { Banner } from '../containers/Banner/Banner';
import { Topics } from '../containers/Topics/Topics';
import { Posts } from '../containers/Posts/Posts';
import styles from "./App.module.css"
import './App.css';

function App() {
  const darkModeState = useSelector(selectModeState);

  return (
    <div className={darkModeState ? styles.appDarkMode : styles.app}>
      <header>
        <Banner
          darkModeSwitch={darkModeState}
        />
      </header>
      <main className={styles.content}>
          <Topics
            darkModeSwitch={darkModeState}
          />
          <Posts />
      </main>
    </div>
  );
}

export default App;
