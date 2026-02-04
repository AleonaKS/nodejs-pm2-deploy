module.exports = {
  apps: [{
    name: 'nodejs-app',
    script: './backend/dist/app.js',
    user: process.env.DEPLOY_USER,      
    cwd: process.env.DEPLOY_PATH, 
    env: {
      NODE_ENV: 'development',
      DB_ADDRESS: process.env.DB_ADDRESS,    
      JWT_SECRET: process.env.JWT_SECRET,   
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80,
      DB_ADDRESS: process.env.DB_ADDRESS,
      JWT_SECRET: process.env.JWT_SECRET,
    },
    deploy: {
      ref: process.env.DEPLOY_REF,          
      repo: process.env.DEPLOY_REPO,      
      key: process.env.DEPLOY_KEY,    
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }]
};

