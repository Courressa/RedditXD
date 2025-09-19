exports.handler = async (event) => {
  console.log('Function invoked with query:', event.queryStringParameters);

  const { path } = event.queryStringParameters;
  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing path parameter' })
    };
  }

  const redditUrl = `https://www.reddit.com${path}`;
  console.log('Fetching from Reddit:', redditUrl);

  try {
    const response = await fetch(redditUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', // Browser UA
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.reddit.com/', // Mimic from Reddit site
        'Origin': 'https://www.reddit.com',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
      }
    });
    console.log('Reddit response status:', response.status);

    if (!response.ok) {
      console.log('Reddit fetch failed with status:', response.status);
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
    console.error('Error in function:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message })
    };
  }
};