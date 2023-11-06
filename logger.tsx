export type LoggerConfig = {
  enable: boolean;
  logToServer: boolean;
  serverLoggingUrl?: string;
};

export const logger = {
  // Helper function to send logs to the server
  sendToServer: (message: string, config: LoggerConfig) => {
    if (config.logToServer && config.serverLoggingUrl) {
      // This is a simple POST request example using the Fetch API.
      fetch(config.serverLoggingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      .catch(error => {
        console.error('Error logging to server:', error);
      });
    }
  },

  info: (message: string, config: LoggerConfig) => {
    if (config.enable) {
      console.info(message);
      logger.sendToServer(message, config);
    }
  },

  warn: (message: string, config: LoggerConfig) => {
    if (config.enable) {
      console.warn(message);
      logger.sendToServer(message, config);
    }
  },

  error: (message: string, config: LoggerConfig) => {
    if (config.enable) {
      console.error(message);
      logger.sendToServer(message, config);
    }
  },
};
