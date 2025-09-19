// Helper to get the fetch URL based on environment
const getFetchUrl = (endpoint) => {
    if (process.env.NODE_ENV === 'development') {
        return endpoint; // Uses package.json proxy for local dev
    }
    // Production: Use Netlify Function with encoded path
    const encodedPath = encodeURIComponent(endpoint);
    return `/.netlify/functions/reddit-proxy?path=${encodedPath}`;
};

export async function getPopular() {
    const popularEndpoint = "/r/popular.json";
    const urlToFetch = getFetchUrl(popularEndpoint);

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const popular = jsonResponse.data.children;
            return popular;
        }
        throw new Error('Network response was not ok');
    } catch (error) {
        console.log(error);
        throw error; // Re-throw so thunk rejects and it does not continuously loads
    }
};

/*
const appBaseURL = "https://www.reddit.com";
export async function getRedditGalleryImage(image) {
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
    const urlToFetch = getFetchUrl(topicsEndpoint);

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const topics = jsonResponse.data.children;
            
            return topics;
        }
        throw new Error('Network response was not ok');
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export async function getPostBasedOnTopic(topic) {
    const topicsEndpoint = `/${topic}.json`;
    const urlToFetch = getFetchUrl(topicsEndpoint);

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const topics = jsonResponse.data.children;
            
            return topics;
        }
        throw new Error('Network response was not ok');
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export async function getSearch(userSearch) {
    const topicsEndpoint = `/search.json?q=${userSearch}`;
    const urlToFetch = getFetchUrl(topicsEndpoint);

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const topics = jsonResponse.data.children;
            
            return topics;
        }
        throw new Error('Network response was not ok');
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export async function getCommentListForPost(subreddit, postId) {
    const topicsEndpoint = `/${subreddit}/comments/${postId}.json`;
    const urlToFetch = getFetchUrl(topicsEndpoint);

    try {
        const response = await fetch(urlToFetch, {
            method: "GET"
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const comments = jsonResponse[1].data.children.map(child => child.data);
            
            return {postId, comments};
        }
        throw new Error('Network response was not ok');
    } catch (error) {
        console.log(error);
        throw error;
    }
};