/**
 * Lightweight in-memory rate limiter to protect public form submissions.
 * Prevents spam and abuse without requiring external dependencies.
 */
const ipHits = new Map();

// Periodic sweep to clean up expired records
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipHits.entries()) {
    if (now > data.resetTime) {
      ipHits.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Prevent cleanup interval from blocking process termination
if (cleanupInterval.unref) {
  cleanupInterval.unref();
}

/**
 * Express middleware for rate limiting.
 * @param {number} maxRequests - Maximum allowed requests per window (default 10)
 * @param {number} windowMs - Window duration in milliseconds (default 15 minutes)
 */
export function contactRateLimiter(maxRequests = 10, windowMs = 15 * 60 * 1000) {
  return (req, res, next) => {
    const rawIp =
      req.headers["x-forwarded-for"] ||
      req.socket?.remoteAddress ||
      req.ip ||
      "127.0.0.1";
    const ip = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : "127.0.0.1";

    const now = Date.now();
    const clientData = ipHits.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > clientData.resetTime) {
      clientData.count = 0;
      clientData.resetTime = now + windowMs;
    }

    clientData.count += 1;
    ipHits.set(ip, clientData);

    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message:
          "Too many inquiries submitted from this network. Please wait a few minutes before submitting again.",
      });
    }

    next();
  };
}
