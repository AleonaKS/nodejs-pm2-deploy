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
    script: 'npm',
    args: 'start',  
    cwd: './frontend', 
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3001,
      BROWSER: 'none'  
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001,
      BROWSER: 'none'
    }
  }],
  deploy: {
    production: {
      user: 'user',
      host: '158.160.210.113',
      ref: 'origin/master',
      repo: 'git@github.com:AleonaKS/nodejs-pm2-deploy.git',
      path: '/home/user/nodejs-pm2-deploy',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'export NODE_OPTIONS=--openssl-legacy-provider && npm install && cd backend && npm install && npm run build && cd ../frontend && npm install && npm run build && cd .. && pm2 reload ecosystem.config.js --env production'
    }
  }
};

