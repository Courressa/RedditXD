const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { path } = event.queryStringParameters; // e.g., '/r/popular.json'
    if (!path) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing path parameter' })
        };
    }

    const redditUrl = `https://www.reddit.com${path}`;
    try {
        const response = await fetch(redditUrl, { method: 'GET' });
        if (!response.ok) {
            return {
            statusCode: response.status,
            body: JSON.stringify({ error: 'Failed to fetch from Reddit' })
            };
        }
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (error) {
        console.error('Error fetching from Reddit:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server error' })
        };
    }
};