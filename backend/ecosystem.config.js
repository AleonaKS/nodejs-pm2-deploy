module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/app.js',  
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  } ],
  deploy: {
    production: {
      user: 'user',
      host: '158.160.210.113',
      ref: 'origin/master',
      repo: 'git@github.com:AleonaKS/nodejs-pm2-deploy.git',
      path: '/home/user/nodejs-pm2-deploy',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'cp /home/user/nodejs-pm2-deploy/backend/.env ./backend/.env && export NODE_OPTIONS=--openssl-legacy-provider && npm install && cd backend && npm install && npm run build && cd ../frontend && npm install && npm run build && cd .. && pm2 reload ecosystem.config.js --env production'
    }
  }
};
