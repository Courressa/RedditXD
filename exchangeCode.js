const fetch = require('node-fetch');

const clientId = 'G9XeyMmoueVTd0Zp8xhDKA';
const clientSecret = 'U1m0N2Htx72-lHGQVorKQGuGAj26_A';
const code = 'IQP9TS9TcO8R6hPM8hn19lWJMDvySw'; // Paste the code here
const redirectUri = 'http://localhost:3000';
const userAgent = 'MyRedditApp/1.0 (by /u/Only-Conversation417 )';

async function exchangeCode() {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Access Token:', data.access_token);
      console.log('Refresh Token:', data.refresh_token); // This is the permanent one
      console.log('Expires in:', data.expires_in, 'seconds');
    } else {
      console.error('Error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
} 

exchangeCode();