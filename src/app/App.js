import React from 'react';
import { useSelector } from 'react-redux';
import { selectModeState } from '../features/ModeSetter/modeSetterSlice';
import { selectMenuDropdownClick } from '../containers/Banner/bannerSlice';
import { Banner } from '../containers/Banner/Banner';
import { Topics } from '../containers/Topics/Topics';
import { Posts } from '../containers/Posts/Posts';
import { MenuDropdown } from '../features/Menu Dropdown/MenuDropdown';
import styles from "./App.module.css"
import './App.css';

function App() {
  const darkModeState = useSelector(selectModeState);
  const menuDropdownState = useSelector(selectMenuDropdownClick);

  return (
    <div className={darkModeState ? styles.appDarkMode : styles.app}>
      <header>
        <Banner
          darkModeSwitch={darkModeState}
        />
      </header>
      <main>
        <div className={styles.content}>
          <Topics
            darkModeSwitch={darkModeState}
          />
          <Posts />
        </div>
        <div className={styles.contentWithMenu}>
          {menuDropdownState && (
            <div className={styles.menuDropdown}>
              <MenuDropdown
                darkModeSwitch={darkModeState}
                menuDropdownSwitch={menuDropdownState}
              />
            </div>
          )}
          <Posts />
        </div>
      </main>
    </div>
  );
}

export default App;
