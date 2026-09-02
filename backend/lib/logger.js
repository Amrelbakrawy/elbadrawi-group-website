function formatLog(level, event, details = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    ...details,
  });
}

export function logInfo(event, details) {
  console.log(formatLog('info', event, details));
}

export function logWarn(event, details) {
  console.warn(formatLog('warn', event, details));
}

export function logError(event, details) {
  console.error(formatLog('error', event, details));
}
