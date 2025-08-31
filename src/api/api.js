const appBaseURL = "https://www.reddit.com";

export async function getPopular() {
    const popularEndpoint = "/r/popular.json";
    const urlToFetch = `${popularEndpoint}`;

    try {
        const response = await fetch(urlToFetch, {
            method: "GET",
            headers: {
                "Accept": "application/json"  // This is key for CRA proxy to forward the request
            }
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const popular = jsonResponse.data.children;
            return popular;
        } 
    } catch (error) {
        console.log("popular is NOT Loading:");
        console.log(error);
    }
};

/*export async function getRedditGalleryImage(image) {
    const RedditGalleryImageEndpoint = `${image}.json`;
    const urlToFetch = `${RedditGalleryImageEndpoint}`;

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const redditGalleryImage = jsonResponse.data.children;
            
            return redditGalleryImage;
        }
    } catch (error) {
        console.log(error);
    }
};*/

export async function getTopics() {
    const topicsEndpoint = `/reddits.json`;
    const urlToFetch = `${topicsEndpoint}`;

    try {
        const response = await fetch(urlToFetch, {
            method: "GET",
            headers: {
                "Accept": "application/json"  // This is key for CRA proxy to forward the request
            }
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const topics = jsonResponse.data.children;
            
            return topics;
        } else {

        }
    } catch (error) {
        console.log(error);
    }
};

/****** SETUP ERROR DISPLAY IF ELSE ******/

export async function getPostBasedOnTopic(topic) {
    const topicsEndpoint = `${topic}.json`;
    const urlToFetch = `${topicsEndpoint}`;

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const topics = jsonResponse.data.children;
            
            return topics;
        } else {

        }
    } catch (error) {
        console.log(error);
    }
};

export async function getSearch(userSearch) {
    const topicsEndpoint = `/search.json?q=${userSearch}`;
    const urlToFetch = `${topicsEndpoint}`;

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const topics = jsonResponse.data.children;
            
            return topics;
        } else {

        }
    } catch (error) {
        console.log(error);
    }
};

export async function getCommentListForPost(subreddit, postId) {
    const topicsEndpoint = `/${subreddit}/comments/${postId}.json`;
    const urlToFetch = `${topicsEndpoint}`;

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            //console.log("post comments fetched", jsonResponse);
            const comments = jsonResponse[1].data.children.map(child => child.data);
            
            return {postId, comments};
        } else {

        }
    } catch (error) {
        console.log(error);
    }
};