import { cn } from '@/lib/utils';
// import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatOpened as rChatOpened } from '@/recoil';
import { useRecoilState } from 'recoil';
import { allPatients as rAllPatients } from '@/recoil';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
	// eslint-disable-next-line no-unused-vars
	const [allPatients, setPatients] = useRecoilState(rAllPatients);
	const [search, setSearch] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [chatOpened, setChatOpened] = useRecoilState(rChatOpened);
	const [displayPatients, setDisplayPatients] = useState(allPatients);

	const filter = () => {
		let patientsFiltered = allPatients;
		if (search !== '') {
			patientsFiltered = allPatients.filter(
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
		</div>
	);
};

export default Index;
