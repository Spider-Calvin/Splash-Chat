import { useState, useEffect } from 'react';
import Nav from '@/components/view/nav';
import { Sun, Inbox, LogOut, Moon, Settings, Bell, Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRecoilState } from 'recoil';
import { agent as rAgent, loggedIn as rLoggedIn } from '@/recoil';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';

function Index({ isCollapsed }) {
	const location = useLocation();

	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);
	// eslint-disable-next-line no-unused-vars
	const [loggedIn, setLoggedIn] = useRecoilState(rLoggedIn);
	const navigate = useNavigate();

	const LogOutFun = () => {
		sessionStorage.clear();
		setLoggedIn(false);
	};

	const [isDarkMode, setIsDarkMode] = useState(() => {
		// Check local storage to see if dark mode was previously enabled
		const savedDarkMode = localStorage.getItem('darkMode');
		return savedDarkMode === 'true';
	});

	// Toggle dark mode
	const toggleDarkMode = () => {
		setIsDarkMode(prevMode => {
			const newMode = !prevMode;
			localStorage.setItem('darkMode', newMode);
			return newMode;
		});
	};

	// Function used to get the current theme of the system
	// eslint-disable-next-line no-unused-vars
	function useSystemTheme() {
		const [theme, setTheme] = useState(() =>
			window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
		);

		useEffect(() => {
			const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

			// Function to update theme state based on media query
			const handleThemeChange = event => {
				setTheme(event.matches ? 'dark' : 'light');
			};

			// Set initial theme
			handleThemeChange(darkModeMediaQuery);

			// Listen for changes
			darkModeMediaQuery.addEventListener('change', handleThemeChange);

			// Cleanup event listener on unmount
			return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange);
		}, []);

		return theme;
	}

	// Add or remove the 'dark' class from the document body
	useEffect(() => {
		document.body.classList.toggle('dark', isDarkMode);
	}, [isDarkMode]);

	return (
		<div className='flex h-dvh flex-col bg-background'>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<div
						className={cn(
							'my-3 flex cursor-pointer',
							isCollapsed
								? 'justify-center'
								: 'mx-2 items-start gap-4 rounded-lg bg-primary p-3 text-sm dark:bg-muted',
						)}>
						<Avatar>
							<AvatarImage alt={agent.name} />
							<AvatarFallback
								className={cn(
									isCollapsed
										? 'bg-primary text-white dark:bg-muted'
										: 'dark:bg-primary dark:text-secondary',
								)}>
								{agent.name
									?.split(' ')
									.map(chunk => chunk[0])
									.join('')}
							</AvatarFallback>
						</Avatar>
						{!isCollapsed ? (
							<div className='grid gap-1 text-white'>
								<div className='font-semibold'>{agent.name}</div>
								<div className='line-clamp-1 text-xs'>
									<span className='font-medium'>Role:</span> {agent.role}
								</div>
							</div>
						) : null}
					</div>
				</TooltipTrigger>
				{isCollapsed ? (
					<TooltipContent side='right' className='flex items-center gap-4'>
						{agent.name}
					</TooltipContent>
				) : null}
			</Tooltip>
			<Nav
				isCollapsed={isCollapsed}
				links={[
					{
						title: 'Inbox',
						label: '',
						icon: Inbox,
						variant: location.pathname == '/' ? 'default' : 'ghost',
						onClick: () => {
							navigate('/');
						},
					},
					{
						title: 'Notifications',
						label: '',
						icon: Bell,
						variant: location.pathname == '/notification' ? 'default' : 'ghost',
						onClick: () => {
							navigate('/notification');
						},
					},
					{
						title: 'Settings',
						label: '',
						icon: Settings,
						variant: location.pathname == '/settings' ? 'default' : 'ghost',
						onClick: () => {
							navigate('/settings');
						},
					},
				]}
			/>
			{agent.role === 'admin' ? (
				<Nav
					single={true}
					isCollapsed={isCollapsed}
					links={[
						{
							title: 'All Inbox',
							label: '',
							icon: Box,
							variant: location.pathname == '/allinbox' ? 'default' : 'ghost',
							onClick: () => {
								navigate('/allinbox');
							},
						},
					]}
				/>
			) : null}

			<div className='flex-1' />
			<Nav
				isCollapsed={isCollapsed}
				links={[
					{
						title: isDarkMode ? 'Light Mode' : 'Dark Mode',
						// label: 'Theme',
						icon: isDarkMode ? Sun : Moon,
						variant: 'ghost',
						onClick: toggleDarkMode,
					},
					{
						title: 'Logout',
						label: agent.name,
						icon: LogOut,
						variant: 'ghost',
						onClick: LogOutFun,
					},
				]}
			/>
		</div>
	);
}

export default Index;
