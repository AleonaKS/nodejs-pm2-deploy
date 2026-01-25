module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/dist/app.js', 
      instances: 1,
      exec_mode: 'fork',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_ADDRESS: 'mongodb://localhost:27017/mesto',
        JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-123',
      },
      
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
      watch: false, 
      max_restarts: 10,
      restart_delay: 1000,
    },
    {
      name: 'frontend',
      script: 'npx',
      args: 'serve -s ./frontend/build -l 3001',
      env_production: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
    },
  ],

  deploy: {
    production: {
      user: 'user',
      host: '158.160.210.113',
      ref: 'origin/master',
      repo: 'git@github.com:AleonaKS/nodejs-pm2-deploy.git',
      path: '/home/user/nodejs-pm2-deploy',
      'pre-deploy': 'echo "Pre-deploy: pulling latest code..."',
      'post-deploy': `
        npm install &&
        cd backend &&
        npm run build &&
        pm2 reload ecosystem.config.js --env production &&
        echo "Deployment completed successfully!"
      `,
      'post-setup': 'cd /home/user/nodejs-pm2-deploy && npm install',
    },
  },
};

