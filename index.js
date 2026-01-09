import fetch from 'node-fetch';

const zoneId = 'A_TE_ZONE_ID';
const apiToken = 'A_TE_API_TOKEN';

await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ purge_everything: true })
});
console.log('Cache cleared!');
