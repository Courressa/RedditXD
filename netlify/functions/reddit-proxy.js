exports.handler = async (event) => {
  console.log('Function invoked with query:', event.queryStringParameters); // Debug log

  const { path } = event.queryStringParameters;
  if (!path) {
    console.log('Missing path parameter'); // Debug log
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing path parameter' })
    };
  }

  const redditUrl = `https://www.reddit.com${path}`;
  console.log('Fetching from Reddit:', redditUrl); // Debug log

  try {
    const response = await fetch(redditUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'MyRedditApp/1.0 (by /u/Only-Conversation417)' } // Avoid blocks
    });
    console.log('Reddit response status:', response.status); // Debug log

    if (!response.ok) {
      console.log('Reddit fetch failed with status:', response.status); // Debug log
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
    console.error('Error in function:', error.message); // Error log
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message })
    };
  }
};