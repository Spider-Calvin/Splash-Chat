import { cn } from '@/lib/utils';
// import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatOpened as rChatOpened } from '@/recoil';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { Search, Image, Video, File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Check, CheckCheck, Clock3 } from 'lucide-react';
import { format, isToday, differenceInMinutes } from 'date-fns';

const Index = ({ recentChats }) => {
	const [search, setSearch] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [chatOpened, setChatOpened] = useRecoilState(rChatOpened);
	const [displayPatients, setDisplayPatients] = useState(recentChats);

	const filter = () => {
		let patientsFiltered = recentChats;
		if (search !== '') {
			patientsFiltered = recentChats.filter(
				person =>
					person?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
					person?.mobile?.toLowerCase()?.includes(search?.toLowerCase()),
			);
		}
		setDisplayPatients(patientsFiltered);
	};

	useEffect(() => {
		filter();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, recentChats]);

	const CheckBox = ({ status }) => {
		if (status == 'read') {
			return <CheckCheck className='h-4 w-4 self-end text-green-400' />;
		} else if (status == 'sent') {
			return <Check className='h-4 w-4 self-end text-gray-400' />;
		} else if (status == 'delivered') {
			return <CheckCheck className='h-4 w-4 self-end text-gray-400' />;
		} else {
			return <Clock3 className='h-3 w-3 self-end text-gray-400' />;
		}
	};

	const showDisplayTime = time => {
		if (!time) return '';
		const newDate = new Date(time);
		newDate.setHours(newDate.getHours() + 5);
		newDate.setMinutes(newDate.getMinutes() + 30);
		const now = new Date();

		if (isToday(newDate)) {
			// Check if the date is within the last hour
			const minutesAgo = differenceInMinutes(now, newDate);
			if (minutesAgo === 0) {
				return `just now`;
			} else if (minutesAgo < 60) {
				return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
			}
			// Return the time if it's today but not within the last hour
			return format(newDate, 'h:mm a');
		}
		// Return formatted date if it's not today
		return format(newDate, 'd MMM, h:mm a');
	};

	return (
		<div>
			<div className='bg-background/95 p-4 pb-0 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<form>
					<div className='relative'>
						<Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							placeholder='Search'
							className='pl-8 text-primary'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
				</form>
			</div>
			<ScrollArea className='h-screen'>
				<div className='flex flex-col gap-2 p-4 pb-32'>
					{displayPatients.map((item, i) => (
						<button
							key={i}
							className={cn(
								'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent dark:border-none dark:bg-muted',
							)}
							onClick={() =>
								setChatOpened({
									roomId: item?.mobile,
									...item,
								})
							}>
							<div className='flex w-full flex-col gap-1'>
								<div className='flex items-center'>
									<div className='flex items-center gap-2'>
										<div className='font-semibold text-primary'>{item?.name}</div>
									</div>
									<div
										className={cn(
											'ml-auto text-xs',
											chatOpened.selected === item.id ? 'text-foreground' : 'text-muted-foreground',
										)}>
										{item.sentstatustime
											? showDisplayTime(item.sentstatustime)
											: showDisplayTime(item.created_at)}
									</div>
								</div>
							</div>
							<div className='flex w-full flex-1 justify-between'>
								<div className='line-clamp-1 flex items-center gap-x-1 text-xs text-muted-foreground'>
									{item.sent_to && <CheckBox status={item.status} />}
									{item.msg_type === 'text' ? item.displaytext : null}
									{item.msg_type === 'image' ? (
										<div className='flex gap-1'>
											<Image className='h-4 w-4 self-end text-gray-400' />
											Image
										</div>
									) : null}
									{item.msg_type === 'video' ? (
										<div className='flex gap-1'>
											<Video className='h-4 w-4 self-end text-gray-400' />
											Video
										</div>
									) : null}
									{item.msg_type === 'document' ? (
										<div className='flex gap-1'>
											<File className='h-4 w-4 self-end text-gray-400' />
											Document
										</div>
									) : null}
								</div>
							</div>
						</button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

export default Index;
