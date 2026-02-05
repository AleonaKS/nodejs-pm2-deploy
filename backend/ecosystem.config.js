require('dotenv').config({ path: './.env.deploy' }); 

const {  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

// Проверка — для отладки (можно удалить после успеха)
console.log('✅ DEPLOY_USER:', DEPLOY_USER);
console.log('✅ DEPLOY_HOST:', DEPLOY_HOST);
console.log('✅ DEPLOY_PATH:', DEPLOY_PATH);
console.log('✅ DEPLOY_REF:', DEPLOY_REF);
console.log('✅ DEPLOY_REPO:', DEPLOY_REPO);

module.exports = {
  apps: [{
    name: 'mesto',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && pwd && npm ci && npm i && npm run build && pm2 startOrRestart ecosystem.config.js -- env production',
    },
  },
};
