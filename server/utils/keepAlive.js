import http from 'http';
import https from 'https';

/**
 * Keep-Alive Service for Render Web Service
 * Pings backend API every 14 minutes ONLY between 6:00 AM and 10:00 PM Pakistan Standard Time (PKT).
 * Pauses from 10:00 PM to 6:00 AM PKT to conserve Render 750 free monthly hours.
 */

const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

export const getPKTHour = () => {
  try {
    const options = { timeZone: 'Asia/Karachi', hour: 'numeric', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const hourStr = formatter.format(new Date());
    return parseInt(hourStr, 10);
  } catch (err) {
    // Fallback to UTC + 5 manual calculation if timeZone formatting fails
    const date = new Date();
    const utcHour = date.getUTCHours();
    return (utcHour + 5) % 24;
  }
};

export const pingServer = (targetUrl) => {
  if (!targetUrl) return;

  const currentPKTHour = getPKTHour();

  // Active Window: 6:00 AM (6) to 10:00 PM (22) PKT
  if (currentPKTHour < 6 || currentPKTHour >= 22) {
    console.log(`[Keep-Alive] PKT Hour: ${currentPKTHour}:00 | Outside active hours (6 AM - 10 PM PKT). Ping skipped to save Render hours.`);
    return;
  }

  console.log(`[Keep-Alive] PKT Hour: ${currentPKTHour}:00 | Sending keep-alive ping to ${targetUrl}...`);

  const client = targetUrl.startsWith('https') ? https : http;
  
  const req = client.get(targetUrl, (res) => {
    console.log(`[Keep-Alive] Ping success! HTTP ${res.statusCode}`);
  });

  req.on('error', (err) => {
    console.warn(`[Keep-Alive] Ping failed: ${err.message}`);
  });

  req.setTimeout(10000, () => {
    req.destroy();
  });
};

export const startKeepAlive = () => {
  const renderUrl = process.env.RENDER_EXTERNAL_URL 
    ? `${process.env.RENDER_EXTERNAL_URL.replace(/\/+$/, '')}/api/health`
    : process.env.KEEP_ALIVE_URL || null;

  if (!renderUrl) {
    console.log('[Keep-Alive] RENDER_EXTERNAL_URL / KEEP_ALIVE_URL not set. Internal ping service idle.');
    return;
  }

  console.log(`[Keep-Alive] Service started. Will ping ${renderUrl} every 14 mins between 6:00 AM & 10:00 PM PKT.`);
  
  // Initial ping
  pingServer(renderUrl);

  // Interval timer every 14 minutes
  setInterval(() => {
    pingServer(renderUrl);
  }, PING_INTERVAL_MS);
};
