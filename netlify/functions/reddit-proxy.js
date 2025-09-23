exports.handler = async (event) => {
  console.log('Function invoked with query:', event.queryStringParameters);

  const { path } = event.queryStringParameters;
  if (!path) {
    console.log('Missing path parameter');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing path parameter' })
    };
  }

  const oauthUrl = `https://oauth.reddit.com${path}`;
  let token = process.env.REDDIT_ACCESS_TOKEN;
  const refreshToken = process.env.REDDIT_REFRESH_TOKEN;
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const userAgent = 'MyRedditApp/1.0 (by /u/Only-Conversation417)';

  if (!token || !refreshToken || !clientId || !clientSecret) {
    console.error('Missing Reddit credentials');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  console.log('Fetching from OAuth Reddit:', oauthUrl);

  try {
    let response = await fetch(oauthUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': userAgent
      }
    });

    if (response.status === 401 || response.status === 403) {
      console.log('Token expired/invalid; refreshing...');
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const refreshResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'User-Agent': userAgent,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        token = refreshData.access_token;
        console.log('New access token obtained');
        response = await fetch(oauthUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': userAgent
          }
        });
      } else {
        console.error('Refresh failed:', refreshResponse.status);
        return {
          statusCode: refreshResponse.status,
          body: await refreshResponse.text()
        };
      }
    }

    console.log('OAuth Reddit response status:', response.status);

    if (!response.ok) {
      console.log('OAuth fetch failed with status:', response.status);
      return {
        statusCode: response.status,
        body: await response.text()
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