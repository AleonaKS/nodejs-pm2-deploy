// src/config.ts
export const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://localhost:27017/mestodb';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const PORT = process.env.PORT || 3001;
