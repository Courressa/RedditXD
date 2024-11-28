import React from "react";
import { useState } from "react";
import { Search } from "../svg_icons/Search";
import styles from "./SearchBar.module.css";

function SearchBar({userSearchCollected}) {
    const [userSearch, setUserSearch] = useState("");
    const handleUserSearchChange = (event) => {
        setUserSearch(event.target.value);
    };

    const handleSendingUserSearch = (event) => {
        event.preventDefault();
        userSearchCollected(userSearch)
    }

    return (
        <div>
            <form  className={styles.searchSection}>
                <input
                    name="Search"
                    type="text"
                    value={userSearch}
                    onChange={handleUserSearchChange}
                    aria-label="Search"
                    placeholder="Search..."
                    className={styles.searchBar}
                />
                <button
                    aria-label="Search"
                    className={styles.searchButton}
                    onClick={handleSendingUserSearch}
                >
                    <Search />
                </button>
            </form>
            
        </div>
    );
};

export { SearchBar };