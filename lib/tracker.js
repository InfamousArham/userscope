const uaParser = require('ua-parser-js');

function tracker(req, config) {
  const userAgent = req.headers['user-agent'];
  const ua = uaParser(userAgent || '');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const visitorData = {
    ip: config.anonymizeIP ? anonymizeIP(ip) : ip,
    userAgent: ua,
    timestamp: new Date(),
    url: req.originalUrl,
    method: req.method
  };

  // Log or store the data here
  console.log('Visitor Data:', visitorData);

  return {
    trackEvent: (eventName, metadata = {}) => {
      console.log(`Event: ${eventName}`, { ...metadata, timestamp: new Date() });
    },
    data: visitorData
  };
}

function anonymizeIP(ip) {
  if (!ip) return '';
  const parts = ip.split('.');
  if (parts.length === 4) parts[3] = '0';
  return parts.join('.');
}

module.exports = tracker;
