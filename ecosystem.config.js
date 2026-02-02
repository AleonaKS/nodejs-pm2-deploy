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
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'post-deploy': `
  cd $DEPLOY_PATH/source/backend &&
  npm install &&
  npm run build &&
  pm2 reload $DEPLOY_PATH/ecosystem.config.js --env production
`,
    },
  },
};
