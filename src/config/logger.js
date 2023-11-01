const { createLogger, transports, format } = require('winston');

// Define los niveles de prioridad
const logLevels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

// Define los colores para cada nivel
const logColors = {
  debug: 'green',
  http: 'blue',
  info: 'cyan',
  warning: 'yellow',
  error: 'red',
  fatal: 'magenta',
};

// Configuración para entorno de desarrollo
const developmentLogger = createLogger({
  levels: logLevels,
  format: format.combine(
    format.colorize(),
    format.simple()
  ),
  transports: [
    new transports.Console(),
  ],
});

// Configuración para entorno de producción
const productionLogger = createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});

module.exports = {
  development: developmentLogger,
  production: productionLogger,
};
