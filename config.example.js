const config = {
  api: {
    path: 'http:/localhost:4000/api/v1'
  },
  instagram: {
    api: {
      path: 'https://api.instagram.com'
    },
    clientId: 'YOUR_INSTAGRAM_ID',
    clientSecret: 'YOUR_INSTAGRAM_SECRET',
    redirectUri: 'shareit://auth/instagram/callback'
  }
};

export default config;
