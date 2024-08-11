import { cn } from '@/lib/utils';
// import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatOpened as rChatOpened } from '@/recoil';
import { useRecoilState } from 'recoil';
import { getService, API_ROUTES, stringInterpolator } from '@/api';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
	const [search, setSearch] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [chatOpened, setChatOpened] = useRecoilState(rChatOpened);
	const [displayPatients, setDisplayPatients] = useState([]);
	const [getPatientsStatus, setGetPatientsStatus] = useState(0);
	const clearGetPatientsStatus = () => {
		setTimeout(() => setGetPatientsStatus(0), 2700);
	};

	const filter = async () => {
		setGetPatientsStatus(1);
		try {
			const searchPatientsRes = await getService(
				stringInterpolator(API_ROUTES.SEARCH_PATIENTS, { term: search }),
			);

			if (searchPatientsRes.status === 1) {
				setGetPatientsStatus(2);
				setDisplayPatients(searchPatientsRes.data);
				if (searchPatientsRes.data.length < 1) {
					clearGetPatientsStatus();
				}
			} else {
				setGetPatientsStatus(-1);
				clearGetPatientsStatus();
				console.log('ERROR', searchPatientsRes);
			}
		} catch (error) {
			setGetPatientsStatus(-1);
			clearGetPatientsStatus();
			console.log('ERROR', error);
		}
	};

	useEffect(() => {
		if (!search) return;
		const handler = setTimeout(() => {
			filter(search);
		}, 1200);

		return () => {
			clearTimeout(handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

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
			{getPatientsStatus === 0 ? (
				<div className='mt-60 flex flex-1 items-center justify-center bg-background'>
					<h6 className='text-center text-sm font-medium text-muted-foreground'>
						Search Patients Name or Mobile number
					</h6>
				</div>
			) : null}
			{getPatientsStatus === 1 ? (
				<div className='mt-60 flex flex-1 items-center justify-center bg-background'>
					<h6 className='text-center text-sm font-medium text-muted-foreground'>
						Searching from patients...
					</h6>
				</div>
			) : null}
			{getPatientsStatus === -1 ? (
				<div className='mt-60 flex flex-1 items-center justify-center bg-background'>
					<h6 className='text-center text-sm font-medium text-destructive'>
						Patients search Failed please try some other name or number
					</h6>
				</div>
			) : null}
			{getPatientsStatus === 2 ? (
				<ScrollArea className='h-screen'>
					<div className='flex flex-col gap-2 p-4 pb-32'>
						{displayPatients.map(item => (
							<button
								key={item.id}
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
									</div>
								</div>
								<div className='line-clamp-1 text-xs text-muted-foreground'>
									+91 {item?.mobile?.substring(item?.mobile?.length - 10)}
								</div>
							</button>
						))}
					</div>
				</ScrollArea>
			) : null}
		</div>
	);
};

export default Index;
