import React from "react";
import { useState } from "react";

function SearchBar() {
    const [userSearch, setUserSearch] = useState("");
    const handleUserSearchChange = (event) => {
        setUserSearch(event.target.value);
    };

    const handleSendingUserSearch = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <form>
                <input
                    name="Search"
                    type="text"
                    value={userSearch}
                    onChange={handleUserSearchChange}
                    aria-label="Search"
                    placeholder="Search..."
                />
                <input
                    aria-label="Submit"
                    name="SearchButton"
                    type="submit"
                    value="Search"
                    onClick={handleSendingUserSearch}
                />
            </form>
        </div>
    );
};

export { SearchBar };