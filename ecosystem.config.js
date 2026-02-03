// ecosystem.config.js
require('dotenv').config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'main',
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/dist/app.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'frontend',
      script: 'npx serve',
      args: '-s -l 3001 ./frontend/dist',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],


  deploy: {
    production: {
      user: process.env.DEPLOY_USER || 'user',
      host: process.env.DEPLOY_HOST || '158.160.210.113',
      ref: process.env.DEPLOY_REF || 'main',
      repo: process.env.DEPLOY_REPO || 'git@github.com/AleonaKS/nodejs-pm2-deploy.git',
      path: process.env.DEPLOY_PATH || '/home/user/nodejs-pm2-deploy',
      'pre-deploy': 'git fetch --all',
      'post-deploy': `
        export NODE_OPTIONS=--openssl-legacy-provider &&
        npm install &&
        cd backend &&
        npm install &&
        npm run build &&
        cd ../frontend &&
        npm install &&
        npm run build &&
        pm2 reload ecosystem.config.js --env production
      `
    }
  },
};
