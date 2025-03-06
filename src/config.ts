import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
  tokenExpiry: process.env.TOKEN_EXPIRY || 900000, // '15m'
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || 604800000 , // '7d'
  resetTokenExpiry: process.env.RESET_TOKEN_EXPIRY || 3600000, // '1h'
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
};