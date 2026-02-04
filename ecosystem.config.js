const path = require('path');
require('dotenv').config();

module.exports = {
  apps: [{
    name: 'backend',
    script: './backend/dist/app.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000,
      DB_ADDRESS: process.env.DB_ADDRESS,
      JWT_SECRET: process.env.JWT_SECRET
    }
  }],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.HOST,
      ref: process.env.BRANCH || 'main',
      repo: process.env.REPO,
      path: process.env.DEPLOY_PATH,
      'key': process.env.KEY_PATH,
      'ssh_options': ['StrictHostKeyChecking=no'],
      'pre-deploy-local': '',
      'post-deploy': `
        cd backend && 
        npm ci && 
        npm run build && 
        pm2 startOrReload ../ecosystem.config.js --env production
      `,
      'pre-setup': 'echo "Starting deployment..."'
    }
  }
};

