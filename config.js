const config = {
  api: {
    path: 'http:/localhost:4000/api/v1'
  },
  instagram: {
    api: {
      path: 'https://api.instagram.com'
    },
    clientId: '0e959d49eea54a05bb9845bfa5e0c483',
    clientSecret: 'd7d5176d637e424793312a98771bdc37',
    redirectUri: 'shareit://auth/instagram/callback'
  }
};

export default config;
