export function createRateLimiter({
  windowMs,
  maxRequests,
  keyPrefix,
  message,
}) {
  const requests = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const clientKey = `${keyPrefix}:${req.ip || 'unknown'}`;
    const requestLog = requests.get(clientKey) || [];
    const activeEntries = requestLog.filter((timestamp) => now - timestamp < windowMs);

    if (activeEntries.length >= maxRequests) {
      const retryAfterSeconds = Math.ceil(windowMs / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: message,
      });
    }

    activeEntries.push(now);
    requests.set(clientKey, activeEntries);
    next();
  };
}
