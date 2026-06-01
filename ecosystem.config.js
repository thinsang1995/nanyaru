module.exports = {
  apps : [{
    name: 'production',
    script: './node_modules/.bin/next',
    args: 'start',
  }],

  deploy : {
    production : {
      key: '~/.ssh/nanyaru/id_rsa',
      user: 'root',
      host: '167.179.72.25',
      ref: 'origin/main',
      repo: 'git@github.com:thinsang1995/nanyaru.git',
      path: '/var/www/nanyaru',
      'pre-deploy-local': '',
      'post-deploy': 'corepack enable && yarn install --immutable && yarn build && pm2 reload ecosystem.config.js',
      'pre-setup': '',
    }
  }
};
