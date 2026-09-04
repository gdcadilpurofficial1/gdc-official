import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pingServer, getPKTHour } from './utils/keepAlive.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const renderUrl = process.env.RENDER_EXTERNAL_URL
  ? `${process.env.RENDER_EXTERNAL_URL.replace(/\/+$/, '')}/api/health`
  : process.env.KEEP_ALIVE_URL || 'https://gdc-adilpur-api.onrender.com/api/health';

console.log('--- Render Keep-Alive Ping Executed ---');
console.log(`Target URL: ${renderUrl}`);
console.log(`Current PKT Hour: ${getPKTHour()}:00`);

pingServer(renderUrl);
