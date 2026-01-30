module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npx',
    args: 'serve -s build -l 5000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: 'user',
      host: '158.160.210.113',
      ref: 'origin/master',
      repo: 'git@github.com:AleonaKS/nodejs-pm2-deploy.git',
      path: '/home/user/nodejs-pm2-deploy',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
