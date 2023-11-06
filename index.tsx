import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { logger, LoggerConfig } from '../../utils/log/logger';

interface Context {
  config: {
    logging: LoggerConfig;
  };
}

const FooterLinks: React.FC<{ loggerConfig: LoggerConfig }> = ({ loggerConfig }) => {useEffect(() => {

    logger.info('FooterLinks component is rendered', loggerConfig);}, [loggerConfig]);

    const baseUrl = window.location.pathname === '/en-us' ? '/en-us' : '';
    const isBaseUrl = baseUrl === '/en-us';

    const linkStyle = { color: isBaseUrl ? '#ffffff' : '#999999', marginRight: '10px' };
    const separatorStyle = { color: isBaseUrl ? '#ffffff' : '#999999', margin: '0 5px' };
  
    return (
        <div className="row">
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-6 align-self-end">
            <p style={{ textAlign: 'right' }}>
              <a href="/en-us/faq" style={linkStyle}>FAQ</a>
              <span style={separatorStyle}>|</span>
              <a href="/en-us/Footer/Provider" style={linkStyle}>Provider</a>
              <span style={separatorStyle}>|</span>
              <a href="/en-us/Footer/LegalNotice" style={linkStyle}>Legal Notice</a>
              <span style={separatorStyle}>|</span>
              <a href="/en-us/Footer/TermsofUse" style={linkStyle}>Terms of Use</a>
              <span style={separatorStyle}>|</span>
              <a href="/en-us/Footer/PrivacyStatement" style={linkStyle}>Privacy Statement</a>
              <span style={separatorStyle}>|</span>
              <a href="/en-us/Footer/Contact" style={linkStyle}>Contact</a>
            </p>
          </div>
        </div>
    );
};

export default function createExternalRoot(container: HTMLElement) {
  const root = createRoot(container);

  return {
    render(context: Context) {
      
      root.render(<FooterLinks loggerConfig={context.config.logging} />);
    },
    unmount() {
      root.unmount();
    },
  };
}
