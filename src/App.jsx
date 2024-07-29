//library imports
import { useState, useEffect, Suspense, lazy } from 'react';
import * as Sentry from '@sentry/react';
import { growthBook } from './utils';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';

//page imports
const Login = lazy(() => import('./pages/login'));
const Page = lazy(() => import('./page'));

function App() {


	return (
			<div className='App'>
				<Suspense
					fallback={
						<motion.h2
							initial={{ opacity: 0, x: 15 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							className='text-md flex-1 flex items-center justify-center h-[90dvh]'>
							Loading...
						</motion.h2>
					}>
					
				</Suspense>
			</div>
	);
}

export default Sentry.withProfiler(App);
