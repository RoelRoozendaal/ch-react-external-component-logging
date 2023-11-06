# Logging Utility Documentation

## Overview

This document provides an overview of the logging utility designed to enable and disable console and server logging based on configurations provided through the `Context` of each external component in Sitecore Content Hub.

## Logger Configuration

The logger is configured using the `LoggerConfig` interface which includes the following properties:

- `enable`: A boolean to enable or disable logging.
- `logToServer`: A boolean to enable or disable server logging.
- `serverLoggingUrl`: An optional string to specify the server URL to which logs should be sent.

```typescript
interface LoggerConfig {
  enable: boolean;
  logToServer: boolean;
  serverLoggingUrl?: string;
}
```

## Logger Context

The `LoggerContext` provides a React context for logging configurations. It should be used to wrap the component that requires logging functionalities.

```typescript
import React from 'react';
import { LoggerConfig } from './logger';

const defaultLoggerConfig: LoggerConfig = {
  enable: false,
  logToServer: false,
  serverLoggingUrl: ''
};

export const LoggerContext = React.createContext<LoggerConfig>(defaultLoggerConfig);
```

## Logger Implementation

The `logger.tsx` file provides the implementation for logging methods such as `info`, `warn`, `error`, and `debug`. It also contains a method to send logs to a server if `logToServer` is true.

## Usage in a Component

Here is an example of how to use the logging context in a component called `FooterLinks`.

```typescript
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { logger, LoggerConfig } from '../../utils/log/logger';

interface Context {
  config: {
    logging: LoggerConfig;
  };
}

const YourComponentName: React.FC<{ loggerConfig: LoggerConfig }> = ({ loggerConfig }) => {
  // Component implementation
  // ...
};

export default function createExternalRoot(container: HTMLElement) {
  const root = createRoot(container);
  return {
    render(context: Context) {
      root.render(<YourComponentName loggerConfig={context.config.logging} />);
    },
    unmount() {
      root.unmount();
    },
  };
}
```

## Final Remarks

The logging utility is designed to be flexible and easy to integrate into existing components. It allows for quick toggling of logging features through the component's context configuration.

For further customization or additional logging methods, you can extend the `logger.tsx` and `LoggerContext.tsx` files as needed.
