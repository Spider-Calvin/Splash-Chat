import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { RecoilRoot } from 'recoil';

// Sentry.init({
// 	dsn: 'https://5fc0ca6bc17c4da98267599b0fd7a4bd@o1200218.ingest.sentry.io/4504116765982720',
// 	integrations: [new BrowserTracing()],
// 	tracesSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<SnackbarProvider
			maxSnack={1}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			preventDuplicate
			autoHideDuration={2000}>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</SnackbarProvider>
	</React.StrictMode>,
);
