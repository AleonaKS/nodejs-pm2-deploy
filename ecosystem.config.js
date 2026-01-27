module.exports = {
  apps: [{
    name: 'backend',
    script: './backend/dist/app.js',  
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
  }, {
    name: 'frontend',
    script: 'serve',
    args: ['-s', 'build', '-l', '3001'],
    cwd: './frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_BRANCH,
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'cp /home/user/nodejs-pm2-deploy/backend/.env ./backend/.env && npm install && cd backend && npm install && npm run build && cd ../frontend && npm install && npm run build && cd .. && pm2 reload ecosystem.config.js --env production'
    }
  }
};
