import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import RecentChats from './recent-chats';
import TotalPatients from './total-patients';

import UnreadChats from './unread-chats';
import { Search } from 'lucide-react';
import { agent as rAgent } from '@/recoil';
import { useRecoilState } from 'recoil';
import { API_ROUTES, stringInterpolator, getService } from '@/api';
import { useEffect, useState } from 'react';

const Index = () => {
	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);

	const [recentChats, setRecentChats] = useState([]);
	const [getRecentChatsStatus, setGetRecentChatsStatus] = useState(0);
	const clearGetRecentChatsStatus = () => {
		setTimeout(() => setGetRecentChatsStatus(0), 2700);
	};

	const [unreadChats, setUnreadChats] = useState([]);
	const [getUnreadChatsStatus, setGetUnreadChatsStatus] = useState(0);
	const clearGetUnreadChatsStatus = () => {
		setTimeout(() => setGetUnreadChatsStatus(0), 2700);
	};

	const getPatients = async () => {
		try {
			setGetRecentChatsStatus(1);
			const sendOtpRes = await getService(
				stringInterpolator(API_ROUTES.GET_RECENT_CHATS, { agent: 'all' }),
			);

			if (sendOtpRes.status === 1) {
				setRecentChats(sendOtpRes.data);
				setGetRecentChatsStatus(2);
			} else {
				setGetRecentChatsStatus(-1);
				clearGetRecentChatsStatus();
			}
		} catch (error) {
			setGetRecentChatsStatus(-1);
			clearGetRecentChatsStatus();
			console.log('ERROR', error);
		}

		try {
			setGetUnreadChatsStatus(1);
			const sendOtpRes = await getService(
				stringInterpolator(API_ROUTES.GET_UNREAD_CHATS, { agent: 'all' }),
			);

			if (sendOtpRes.status === 1) {
				setUnreadChats(sendOtpRes.data);
				setGetUnreadChatsStatus(2);
			} else {
				setGetUnreadChatsStatus(-1);
				clearGetUnreadChatsStatus();
			}
		} catch (error) {
			setGetUnreadChatsStatus(-1);
			clearGetUnreadChatsStatus();
			console.log('ERROR', error);
		}
	};

	useEffect(() => {
		getPatients();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='h-dvh bg-background'>
			<Tabs defaultValue='recent'>
				<div className='flex items-center px-4 py-2'>
					<h1 className='hidden text-xl font-bold text-primary xl:block'>All Inbox</h1>

					<TabsList className='ml-auto'>
						<TabsTrigger value='recent' className='text-sm text-zinc-600 dark:text-zinc-200'>
							Recent
						</TabsTrigger>
						<TabsTrigger value='unread' className='text-sm text-zinc-600 dark:text-zinc-200'>
							Unread
						</TabsTrigger>
						<TabsTrigger value='totalPatients' className='text-sm text-zinc-600 dark:text-zinc-200'>
							<Search className='mr-2 h-4 w-4' /> all
						</TabsTrigger>
					</TabsList>
				</div>
				<Separator />
				<TabsContent value='recent' className='m-0'>
					{getRecentChatsStatus === 0 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>All Patients Recent Messages</h6>
						</div>
					) : null}
					{getRecentChatsStatus === 1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>Getting all recent messages...</h6>
						</div>
					) : null}
					{getRecentChatsStatus === -1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-destructive'>Get recent messages failed</h6>
						</div>
					) : null}
					{getRecentChatsStatus === 2 ? <RecentChats recentChats={recentChats} /> : null}
				</TabsContent>
				<TabsContent value='unread' className='m-0'>
					{getUnreadChatsStatus === 0 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>All Patients Unread Messages</h6>
						</div>
					) : null}
					{getUnreadChatsStatus === 1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>Getting all Unread messages...</h6>
						</div>
					) : null}
					{getUnreadChatsStatus === -1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-destructive'>Get Unread messages failed</h6>
						</div>
					) : null}
					{getUnreadChatsStatus === 2 ? <UnreadChats unreadChats={unreadChats} /> : null}
				</TabsContent>
				<TabsContent value='totalPatients' className='m-0'>
					<TotalPatients />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Index;
