module.exports = {
  apps: [{
    name: 'nodejs-app',
    script: './dist/app.js',  
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    
    
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      DB_ADDRESS: process.env.DB_ADDRESS,    
      JWT_SECRET: process.env.JWT_SECRET,   
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT,
      DB_ADDRESS: process.env.DB_ADDRESS,
      JWT_SECRET: process.env.JWT_SECRET,
    }
  }],
  
 
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_REF,
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      key: process.env.DEPLOY_KEY,
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};

