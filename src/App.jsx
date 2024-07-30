//library imports
import { useState, useEffect, Suspense, lazy } from 'react';
import * as Sentry from '@sentry/react';
import { growthBook } from './utils';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
						className='text-md flex h-[90dvh] flex-1 items-center justify-center'>
						Loading...
					</motion.h2>
				}>
				<BrowserRouter>
					<Routes>
						<Route></Route>
					</Routes>
				</BrowserRouter>
			</Suspense>
		</div>
	);
}

export default Sentry.withProfiler(App);
