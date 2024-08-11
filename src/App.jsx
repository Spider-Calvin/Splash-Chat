/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, Suspense, lazy } from 'react';
import { GrowthBookProvider } from '@growthbook/growthbook-react';
import * as Sentry from '@sentry/react';
import { growthBook } from './utils';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { loggedIn as rLoggedIn, agent as rAgent } from '@/recoil';
const Auth = lazy(() => import('./pages/auth'));
const Pages = lazy(() => import('./pages'));

function App() {
	const [loggedIn, setLoggedIn] = useRecoilState(rLoggedIn);
	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);

	useEffect(() => {
		growthBook.loadFeatures();

		if (loggedIn) return;
		const agentDetails = sessionStorage.getItem('agent');
		if (JSON.parse(agentDetails)?.email) {
			setLoggedIn(true);
			setAgent(JSON.parse(agentDetails));
		}
	}, []);

	return (
		<GrowthBookProvider growthbook={growthBook}>
			<div className='App'>
				<Suspense
					fallback={
						<motion.h2
							initial={{ opacity: 0, x: 15 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							className='text-md flex h-[90dvh] flex-1 items-center justify-center'>
							Loading...
						</motion.h2>
					}>
					{loggedIn ? <Pages /> : <Auth />}
				</Suspense>
			</div>
		</GrowthBookProvider>
	);
}

export default Sentry.withProfiler(App);
