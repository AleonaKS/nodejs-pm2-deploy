module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npx',
    args: 'serve -s build',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    },
    deploy: {
      production: {
        user: process.env.DEPLOY_USER,
        host: process.env.DEPLOY_HOST,
        ref: process.env.DEPLOY_BRANCH,
        repo: process.env.DEPLOY_REPO,
        path: process.env.DEPLOY_PATH,
        'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
      }
    }
  }]
};

