import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import RecentChats from './recent-chats';
import AllPatients from './all-patients.';
import TotalPatients from './total-patients';

import UnreadChats from './unread-chats';
import { RefreshCcw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { agent as rAgent, unReadChats as rUnreadChats } from '@/recoil';
import { useRecoilState } from 'recoil';
import { API_ROUTES, stringInterpolator, getService } from '@/api';
import { useState } from 'react';

const Index = () => {
	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);
	// eslint-disable-next-line no-unused-vars
	const [unreadList, setUnreadList] = useRecoilState(rUnreadChats);
	const [syncStatus, setSyncStatus] = useState(0);

	const syncData = async () => {
		setSyncStatus(1);
		try {
			const sendOtpRes = await getService(
				stringInterpolator(API_ROUTES.SYNC_DATA, { agent: agent.email }),
			);

			if (sendOtpRes.status === 1) {
				setSyncStatus(2);
				setTimeout(() => setSyncStatus(0), 2000);
			} else {
				setSyncStatus(-1);
				setTimeout(() => setSyncStatus(0), 3000);
			}
		} catch (error) {
			setSyncStatus(-1);
			setTimeout(() => setSyncStatus(0), 3000);
			console.log('ERROR', error);
		}
	};

	return (
		<div className='h-dvh bg-background'>
			<Tabs defaultValue='recent'>
				<div className='flex items-center px-4 py-2'>
					<h1 className='hidden text-xl font-bold text-primary xl:block'>Inbox</h1>

					{syncStatus === 0 ? (
						<TabsList className='ml-auto'>
							<TabsTrigger value='recent' className='text-sm text-zinc-600 dark:text-zinc-200'>
								Recent
							</TabsTrigger>
							<TabsTrigger value='unread' className='text-sm text-zinc-600 dark:text-zinc-200'>
								Unread {unreadList?.length > 0 && '(' + unreadList?.length + ')'}
							</TabsTrigger>
							<TabsTrigger value='allPatients' className='text-sm text-zinc-600 dark:text-zinc-200'>
								My Patients
							</TabsTrigger>
							<TabsTrigger
								value='totalPatients'
								className='text-sm text-zinc-600 dark:text-zinc-200'>
								<Search className='mr-2 h-4 w-4' /> all
							</TabsTrigger>
						</TabsList>
					) : null}
					{syncStatus === 1 ? (
						<p className='flex-1 py-1 text-right text-sm text-primary'>Syncing Messages</p>
					) : null}
					{syncStatus === 2 ? (
						<p className='flex-1 p-1 text-right text-sm font-medium text-green-700'>
							Sync Successful
						</p>
					) : null}
					{syncStatus === -1 ? (
						<p className='flex-1 p-1 text-right text-sm text-destructive'>Sync failed!</p>
					) : null}
					<RefreshCcw
						className={cn(
							'ml-3 h-4 w-4 cursor-pointer text-primary',
							syncStatus === 1 && 'spinner',
						)}
						onClick={() => syncData()}
					/>
				</div>
				<Separator />
				<TabsContent value='recent' className='m-0'>
					<RecentChats />
				</TabsContent>
				<TabsContent value='unread' className='m-0'>
					<UnreadChats />
				</TabsContent>
				<TabsContent value='allPatients' className='m-0'>
					<AllPatients />
				</TabsContent>
				<TabsContent value='totalPatients' className='m-0'>
					<TotalPatients />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Index;
