const https = require('https');

const SHOPIFY_DOMAIN = 'nivaranupcyclers.myshopify.com';
const ACCESS_TOKEN = '627e86821a39946b5c4ff1b7927a376b';

const query = `
query getVariants {
  node(id: "gid://shopify/ProductVariant/51034847543584") {
    ... on ProductVariant {
      id
      title
      availableForSale
      price {
        amount
        currencyCode
      }
      product {
        title
        handle
      }
    }
  }
}
`;

const options = {
    hostname: SHOPIFY_DOMAIN,
    path: '/api/2024-01/graphql.json',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Body:', data);
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(JSON.stringify({ query }));
req.end();
