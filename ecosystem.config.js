module.exports = {
  apps: [{
    name: 'backend',
    script: './backend/dist/app.js',  
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'frontend',
    script: './frontend/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }],
  deploy: {
    production: {
      user: 'user',
      host: '158.160.210.113', // IP сервера из .env.deploy
      ref: 'origin/master',
      repo: 'git@github.com:AleonaKS/nodejs-pm2-deploy.git', // из .env.deploy
      path: '/home/user/nodejs-pm2-deploy', // из .env.deploy
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
