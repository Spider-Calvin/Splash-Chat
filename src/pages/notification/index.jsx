import { useEffect, useState } from 'react';
import {
	notification as rNotification,
	agent as rAgent,
	chatOpened as rChatOpened,
} from '@/recoil';
import { useRecoilState } from 'recoil';
import { Badge } from '@/components/ui/badge';
import { API_ROUTES, stringInterpolator, getService, patchService } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function Notifications() {
	// eslint-disable-next-line no-unused-vars
	const [allNotify, setAllNotify] = useRecoilState(rNotification);
	const [fetch, setFetch] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);
	// eslint-disable-next-line no-unused-vars
	const [chatOpen, setChatOpen] = useRecoilState(rChatOpened);
	const { toast } = useToast();
	const navigate = useNavigate();
	const [notificationList, setNotificationList] = useState([]);
	const [allNotificationData, setAllNotificationData] = useState([]);
	const [getNotificationStatus, setNotificationStatus] = useState(1);
	const clearSetNotificationStatus = () => {
		setTimeout(() => setNotificationStatus(0), 2700);
	};
	const [getAllNotificationStatus, setAllNotificationStatus] = useState(1);
	const clearSetAllNotificationStatus = () => {
		setTimeout(() => setAllNotificationStatus(0), 2700);
	};

	const getNotification = async () => {
		setNotificationStatus(1);
		try {
			const getNotified = await getService(
				stringInterpolator(API_ROUTES.GET_NOTIFICATION, { agent: agent.email }),
			);
			if (getNotified.status) {
				setNotificationStatus(2);
				setAllNotify(getNotified.data);
				getFilteredUnreadList(getNotified.data);
			} else {
				setNotificationStatus(-1);
				clearSetNotificationStatus();
			}
		} catch (error) {
			setNotificationStatus(-1);
			clearSetNotificationStatus();
			console.log('Error', error);
		}
	};

	const getAllNotification = async () => {
		setAllNotificationStatus(1);
		try {
			const getNotified = await getService(
				stringInterpolator(API_ROUTES.GET_ALL_NOTIFICATION, { agent: agent.email }),
			);
			if (getNotified.status) {
				setAllNotificationStatus(2);
				setAllNotificationData(getNotified.data);
			} else {
				setAllNotificationStatus(-1);
				clearSetAllNotificationStatus();
			}
		} catch (error) {
			setAllNotificationStatus(-1);
			clearSetAllNotificationStatus();
			console.log('Error', error);
		}
	};

	const getFilteredUnreadList = data => {
		const result = Object.groupBy(data, ({ roomid }) => roomid);
		setNotificationList(result);
	};

	useEffect(() => {
		getNotification();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetch]);

	useEffect(() => {
		getAllNotification();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const markAllAsRead = async () => {
		const prom = await patchService(
			stringInterpolator(API_ROUTES.PATCH_NOTIFICATION, { agent: agent.email }),
		);
		if (prom.status) {
			toast({
				className: 'bg-green-200',
				description: 'Marked all as read!',
			});
			setFetch(!fetch);
		} else {
			toast({
				className: 'bg-red-200',
				description: prom.message,
			});
			setFetch(!fetch);
		}
	};

	const OpenChatData = (roomId, name) => {
		setChatOpen({
			roomId: roomId,
			mobile: roomId,
			name: name,
		});
		navigate('/');
	};

	//new notifications container
	const NewNotifications = () => {
		return (
			<ScrollArea className='h-screen'>
				<div className='flex items-center justify-end px-4 pt-2'>
					<Button size='sm' onClick={() => markAllAsRead()}>
						Mark as read
					</Button>
				</div>
				<div className='pb-20'>
					{Object.keys(notificationList)?.length > 0 && (
						<div className='space-y-3 px-4 py-2'>
							{Object.keys(notificationList)?.map(items => (
								<button
									key={notificationList[items][0].roomid}
									className={cn(
										'flex w-full flex-col items-start gap-2 rounded-lg bg-slate-100 p-3 text-left text-sm transition-all hover:bg-accent dark:bg-muted',
									)}
									onClick={() =>
										OpenChatData(notificationList[items][0].roomid, notificationList[items][0].name)
									}>
									<div className='flex w-full flex-col gap-1'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<div className='font-semibold text-primary'>
													{notificationList[items][0].name}
												</div>
												<span className='flex h-2 w-2 rounded-full bg-blue-600' />
											</div>

											<Badge variant='outline'>{notificationList[items]?.length}</Badge>
										</div>
										<div className='text-xs font-medium text-primary'>
											+91{' '}
											{notificationList[items][0].roomid?.substring(
												notificationList[items][0].roomid?.length - 10,
											)}
										</div>
									</div>
									<div className='flex w-full flex-1 justify-between'>
										<div className='line-clamp-1 flex items-center gap-x-1 text-xs text-muted-foreground'>
											{
												notificationList[items][
													notificationList[items]?.length - 1
												]?.msgtext?.split(':')[1]
											}
										</div>
									</div>
								</button>
							))}
						</div>
					)}
				</div>
			</ScrollArea>
		);
	};

	//new notifications container
	const AllNotifications = () => {
		return (
			<ScrollArea className='h-screen'>
				<div className='pb-20'>
					{allNotificationData?.length > 0 && (
						<div className='space-y-3 px-4 py-2'>
							{allNotificationData?.map((item, i) => (
								<button
									key={item.roomid + i}
									className={cn(
										'flex w-full flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent dark:border-muted dark:bg-muted',
									)}
									onClick={() => OpenChatData(item.roomid, item.name)}>
									<div className='flex w-full flex-col gap-1'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<div className='font-semibold text-primary'>{item.name}</div>
												<span className='flex h-2 w-2 rounded-full bg-blue-600' />
											</div>
										</div>
										<div className='text-xs font-medium text-primary'>
											+91 {item.roomid?.substring(item.roomid?.length - 10)}
										</div>
									</div>
									<div className='flex w-full flex-1 justify-between'>
										<div className='line-clamp-1 flex items-center gap-x-1 text-xs text-muted-foreground'>
											{item?.msgtext?.split(':')[1]}
										</div>
									</div>
								</button>
							))}
						</div>
					)}
				</div>
			</ScrollArea>
		);
	};

	return (
		<div className='h-dvh bg-background'>
			<Toaster />
			<Tabs defaultValue='recent'>
				<div className='flex items-center px-4 py-2'>
					<h1 className='hidden text-xl font-bold text-primary xl:block'>Notifications</h1>
					<TabsList className='ml-auto'>
						<TabsTrigger value='recent' className='text-sm text-zinc-600 dark:text-zinc-200'>
							Recent
						</TabsTrigger>
						<TabsTrigger value='all' className='text-sm text-zinc-600 dark:text-zinc-200'>
							All Notifications
						</TabsTrigger>
					</TabsList>
				</div>
				<Separator />
				<TabsContent value='recent' className='m-0'>
					{getNotificationStatus === 0 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>Recent Notifications</h6>
						</div>
					) : null}
					{getNotificationStatus === 1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>Getting notifications...</h6>
						</div>
					) : null}
					{getNotificationStatus === -1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-destructive'>Get notifications Failed</h6>
						</div>
					) : null}
					{getNotificationStatus === 2 ? <NewNotifications /> : null}
				</TabsContent>
				<TabsContent value='all' className='m-0'>
					{getAllNotificationStatus === 0 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>All Notifications</h6>
						</div>
					) : null}
					{getAllNotificationStatus === 1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-muted-foreground'>Getting notifications...</h6>
						</div>
					) : null}
					{getAllNotificationStatus === -1 ? (
						<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
							<h6 className='font-medium text-destructive'>Get notifications Failed</h6>
						</div>
					) : null}
					{getAllNotificationStatus === 2 ? <AllNotifications /> : null}
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Notifications;
