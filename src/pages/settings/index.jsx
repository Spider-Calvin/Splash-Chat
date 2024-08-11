import { useState, useEffect } from 'react';
import { UserRound, Bell, UsersRound, Building } from 'lucide-react';
import Profile from './profile';
import Companydetails from './companydetails';
import Notification from './notification';
import Teammembers from './teammembers';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

function Index() {
	const [selectedField, setSelectedField] = useState('companydetails');
	const navigate = useNavigate();
	useEffect(() => {
		const agentDetails = sessionStorage.getItem('agent');
		if (JSON.parse(agentDetails).role !== 'admin') {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='h-screen bg-background'>
			<div className='p-4'>
				<h3 className='text-xl font-bold text-primary'>Settings</h3>
				<p className='text-muted-foreground'>Manage your account settings</p>
			</div>
			<Separator />
			<div className='flex p-4 pt-0'>
				<div className='w-1/5 space-y-3'>
					<div className='pt-4'>
						<div className='rounded-lg border bg-background shadow-md'>
							<p className='p-3 text-sm font-semibold text-primary'>Personal</p>
							<div className='w-full border-t border-gray-200'></div>
							<ul className='space-y-2 p-3 text-primary'>
								<li
									className={`cursor-pointer rounded-lg p-2 hover:bg-muted ${selectedField === 'profile' ? 'bg-muted' : ''}`}
									onClick={() => setSelectedField('profile')}>
									<div className='text-md flex items-center gap-3'>
										<UserRound className='h-4 w-4' />
										<p>Profile</p>
									</div>
								</li>
								<li
									className={`cursor-pointer rounded-lg p-2 hover:bg-muted ${selectedField === 'notification' ? 'bg-muted' : ''}`}
									onClick={() => setSelectedField('notification')}>
									<div className='flex items-center gap-3'>
										<Bell className='h-4 w-4' />
										<p>Notifications</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div>
						<div className='rounded-lg border bg-background shadow-md'>
							<p className='p-3 text-sm font-semibold text-primary'>Company</p>
							<div className='w-full border-t border-gray-200'></div>
							<ul className='space-y-2 p-3 text-primary'>
								<li
									className={`cursor-pointer rounded-lg p-2 hover:bg-muted ${selectedField === 'companydetails' ? 'bg-muted' : ''}`}
									onClick={() => setSelectedField('companydetails')}>
									<div className='text-md flex items-center gap-3'>
										<Building className='h-4 w-4' />
										<p>Company details</p>
									</div>
								</li>
								<li
									className={`cursor-pointer rounded-lg p-2 hover:bg-muted ${selectedField === 'teammembers' ? 'bg-muted' : ''}`}
									onClick={() => setSelectedField('teammembers')}>
									<div className='flex items-center gap-3'>
										<UsersRound className='h-4 w-4' />
										<p>Team members</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{selectedField === 'profile' ? <Profile /> : ''}
				{selectedField === 'notification' ? <Notification /> : ''}
				{selectedField === 'companydetails' ? <Companydetails /> : ''}
				{selectedField === 'teammembers' ? <Teammembers /> : ''}
			</div>
		</div>
	);
}

export default Index;
