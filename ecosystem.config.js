module.exports = {
  apps: [{
    name: 'backend',
    script: './backend/dist/app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
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
      host: '158.160.210.113',
      ref: 'origin/master',
      repo: 'git@github.com:AleonaKS/nodejs-pm2-deploy.git',
      path: '/home/user/nodejs-pm2-deploy',
      'post-deploy': `
        cd /home/user/nodejs-pm2-deploy/current &&
        npm install &&
        
        # Бэкенд
        cd backend && npm run build && cd .. &&
        
        # Фронтенд  
        cd frontend && npm install && npm run build && cd .. &&
        
        # Перезапускаем PM2
        /usr/bin/pm2 delete backend frontend mesto-backend 2>/dev/null || true &&
        /usr/bin/pm2 start ecosystem.config.js --env production &&
        /usr/bin/pm2 save &&
        
        echo " Deployment completed!"
      `
    }
  }
}

