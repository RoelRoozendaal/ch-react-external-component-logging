import React from 'react';

export type LoggerConfig = {
  enable: boolean;
  logToServer: boolean;
  serverLoggingUrl?: string;
};

const defaultConfig: LoggerConfig = {
  enable: false,
  logToServer: false,
  serverLoggingUrl: '',
};

export const LoggerContext = React.createContext<LoggerConfig>(defaultConfig);