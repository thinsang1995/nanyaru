module.exports = {
  apps : [{
    name: 'production',
    script: 'yarn start',
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
      'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js',
      'pre-setup': '',
    }
  }
};
