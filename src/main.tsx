// react-query
// react
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// react helmet
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App';

import worker from './_mock';
// i18n
import './locales/i18n';
// tailwind css
import './theme/index.css';

const charAt = `
░▒█▀▀▄░░░░█▀▀▄░▒█▀▀▄░▒█▀▄▀█░▀█▀░▒█▄░▒█
░▒█░▒█░▀▀▒█▄▄█░▒█░▒█░▒█▒█▒█░▒█░░▒█▒█▒█
░▒█▄▄█░░░▒█░▒█░▒█▄▄█░▒█░░▒█░▄█▄░▒█░░▀█
`;
console.info(`%c${charAt}`, 'color: #5BE49B');


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
      <Suspense>
        <Analytics />
        <App />
      </Suspense>
  </HelmetProvider>,
);

// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: 'bypass' });
