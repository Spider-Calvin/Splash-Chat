//library imports
import { useState, lazy, Suspense, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { API_ROUTES, stringInterpolator, getService } from '@/api';
import {
	agent as rAgent,
	allPatients as rAllPatients,
	recentChats as rRecentChats,
	unReadChats as rUnreadChats,
	chatOpened as rChatOpened,
} from '@/recoil';
import { useRecoilState } from 'recoil';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { ToastAction } from '@/components/ui/toast';
// import { useNavigate } from 'react-router-dom';

const audio = new Audio('https://wacomm-assets.s3.ap-south-1.amazonaws.com/messagepop.wav');

const Home = lazy(() => import('./home'));
const Sidebar = lazy(() => import('./sidebar'));
const Design = lazy(() => import('../constants/design'));
const Settings = lazy(() => import('./settings'));

const Index = () => {
	const defaultLayout = [4, 96];
	const navCollapsedSize = 4;
	const [isCollapsed, setIsCollapsed] = useState(false);
	const sideBarRef = useRef(null);
	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);
	// eslint-disable-next-line no-unused-vars
	const [allPatients, setAllPatients] = useRecoilState(rAllPatients);
	// eslint-disable-next-line no-unused-vars
	const [chatOpened, setChatOpened] = useRecoilState(rChatOpened);
	// eslint-disable-next-line no-unused-vars
	const [recentChats, setRecentChats] = useRecoilState(rRecentChats);
	// eslint-disable-next-line no-unused-vars
	const [unReadChats, setUnreadChats] = useRecoilState(rUnreadChats);
	const { toast } = useToast();
	// const navigate = useNavigate();

	// Function to resize panels
	const resizePanels = () => {
		if (sideBarRef.current) {
			const size = sideBarRef.current.getSize();
			sideBarRef.current.resize(size > 15 ? 4 : 20);
		}
	};

	useEffect(() => {
		const intervalId = setInterval(async () => {
			await getNotification();
		}, 5000);
		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getNotification = async () => {
		const getNotified = await getService(
			stringInterpolator(API_ROUTES.GET_NOTIFICATION, { agent: agent.email }),
		);

		if (getNotified.status) {
			const ActionNotification = (roomid, name) => {
				setChatOpened({ roomId: roomid, mobile: roomid, name: name });
			};

			getNotified.data
				.filter(item => item.isnew)
				?.map(item => {
					getRecentChats();
					getUnreadChats();
					toast({
						className: 'bg-green-200 dark:bg-green-700',
						title: `${item.name}`,
						description: `+${item.roomid} ${item.msgtext?.split(':')[1]}`,
						action: (
							<ToastAction
								onClick={() => ActionNotification(item.roomid, item.name)}
								altText='View'>
								View
							</ToastAction>
						),
					});
				});

			if (getNotified.data.filter(item => item.isnew)?.length > 0) {
				audio.play();
			}
		}
	};

	const getAllPatients = async () => {
		try {
			const sendOtpRes = await getService(
				stringInterpolator(API_ROUTES.GET_ALL_PATIENTS, { agent: agent.email }),
			);

			if (sendOtpRes.status === 1) {
				setAllPatients(sendOtpRes.data);
			} else {
				console.log('ERROR', sendOtpRes);
			}
		} catch (error) {
			console.log('ERROR', error);
		}
	};

	const getRecentChats = async () => {
		try {
			const getRecentChatsApi = await getService(
				stringInterpolator(API_ROUTES.GET_RECENT_CHATS, { agent: agent.email }),
			);

			if (getRecentChatsApi.status === 1) {
				setRecentChats(getRecentChatsApi.data);
			} else {
				console.log('ERROR', getRecentChatsApi);
			}
		} catch (error) {
			console.log('ERROR', error);
		}
	};

	const getUnreadChats = async () => {
		try {
			const sendOtpRes = await getService(
				stringInterpolator(API_ROUTES.GET_UNREAD_CHATS, { agent: agent.email }),
			);

			if (sendOtpRes.status === 1) {
				setUnreadChats(sendOtpRes.data);
			} else {
				console.log('ERROR', sendOtpRes);
			}
		} catch (error) {
			console.log('ERROR', error);
		}
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			getRecentChats();
			getUnreadChats();
		}, 30000);

		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const syncData = async () => {
		try {
			await getService(stringInterpolator(API_ROUTES.SYNC_DATA, { agent: agent.email }));
		} catch (error) {
			console.log('ERROR', error);
		}
	};

	useEffect(() => {
		syncData();
		getAllPatients();
		getRecentChats();
		getUnreadChats();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<TooltipProvider delayDuration={0}>
				<div className='flex'>
					<Toaster />
					<ResizablePanelGroup direction='horizontal' className='h-full max-h-dvh items-stretch'>
						<ResizablePanel
							ref={sideBarRef}
							defaultSize={defaultLayout[0]}
							collapsedSize={navCollapsedSize}
							collapsible={true}
							minSize={15}
							maxSize={20}
							onCollapse={() => {
								setIsCollapsed(true);
							}}
							onExpand={() => {
								setIsCollapsed(false);
							}}
							className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}>
							<Sidebar isCollapsed={isCollapsed} />
						</ResizablePanel>
						<ResizableHandle withHandle onClick={resizePanels} />
						<ResizablePanel defaultSize={defaultLayout[1]}>
							<Suspense
								fallback={
									<motion.h2
										initial={{ opacity: 0, x: 15 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6 }}
										className='text-md flex flex-1 items-center justify-center'>
										Loading...
									</motion.h2>
								}>
								<Routes>
									<Route path='*' element={<Home />} />
									<Route path='design' element={<Design />} />
									<Route path='settings' element={<Settings />} />
								</Routes>
							</Suspense>
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			</TooltipProvider>
		</BrowserRouter>
	);
};

export default Index;
