module.exports = {
  apps: [{
    name: 'backend',
    script: './backend/dist/app.js',  
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
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
      user: process.env.USER,
      host: process.env.SERVER_HOST,
      ref: 'origin/master',
      repo: process.env.REPO,
      path: process.env.DEPLOY_PATH,
      'pre-deploy-local': `
        echo 'Деплоим на сервер ${process.env.SERVER_HOST}'
        # Копируем .env на сервер 
        scp ~/projects/nodejs-pm2-deploy/backend/.env.production ${process.env.USER}@${process.env.SERVER_HOST}:/home/user/backend.env 2>/dev/null || echo ".env.production не найден, продолжаем без него"
      `,
      'post-deploy': `
        cd ${process.env.DEPLOY_PATH}/current
        
        # Бэкенд (TypeScript проект)
        echo "🔨 Сборка бэкенда..."
        cd backend
        npm install
        npm run build  # Компилируем TypeScript -> dist/app.js
        cd ..
        
        # Копируем .env с сервера 
        cp /home/user/backend.env ./backend/.env 2>/dev/null || echo "Файл .env не найден, используем существующий"
        
        # Фронтенд
        echo "Сборка фронтенда..."
        cd frontend
        npm install
        npm run build
        
        # Создаем сервер для фронтенда
        cat > server.js << 'SERVEOF'
        const express = require('express');
        const path = require('path');
        const app = express();
        const PORT = process.env.PORT || 3001;
        
        app.use(express.static(path.join(__dirname, 'build')));
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
        
        app.listen(PORT, () => {
          console.log('Frontend server on port', PORT);
        });
        SERVEOF
        
        # Устанавливаем Express для фронтенда
        npm install express
        cd ..
        
        # Перезапускаем PM2
        echo "Запуск приложений..."
        pm2 delete backend frontend 2>/dev/null || true
        pm2 start ecosystem.config.js --env production
        pm2 save
        
        echo "Деплой завершен!"
        echo "Статус приложений:"
        pm2 status
      `,
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};
