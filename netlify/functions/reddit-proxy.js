exports.handler = async (event) => {
  console.log('Function invoked with query:', event.queryStringParameters);

  const { path } = event.queryStringParameters;
  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing path parameter' })
    };
  }

  // Use OAuth base URL
  const oauthUrl = `https://oauth.reddit.com${path}`;
  const token = process.env.REDDIT_ACCESS_TOKEN; // From Netlify env vars
  console.log('Fetching from OAuth Reddit:', oauthUrl);

  try {
    const response = await fetch(oauthUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'MyRedditApp/1.0 (by /u/Only-Conversation417)' // Your Reddit username
      }
    });
    console.log('OAuth Reddit response status:', response.status);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch from Reddit API' })
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Error in function:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message })
    };
  }
};