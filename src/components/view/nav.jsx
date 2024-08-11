import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// eslint-disable-next-line react/prop-types
function Nav({ links = [], isCollapsed = false, single = false }) {
	return (
		<div
			data-collapsed={isCollapsed}
			className={cn('group flex flex-col gap-4', single ? 'py-0' : 'py-2')}>
			<nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
				{links.map((link, index) =>
					isCollapsed ? (
						<Tooltip key={index} delayDuration={0}>
							<TooltipTrigger asChild>
								<a
									onClick={link.onClick}
									className={cn(
										buttonVariants({ variant: link.variant, size: 'icon' }),
										'h-9 w-9 cursor-pointer',
										link.variant === 'default' &&
											'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
										link.label === 'Theme' && 'opacity-0',
									)}>
									<link.icon
										className={cn(
											'h-4 w-4 text-foreground',
											link.variant === 'default' && 'text-white',
										)}
									/>
									<span className='sr-only text-foreground'>{link.title}</span>
								</a>
							</TooltipTrigger>
							<TooltipContent side='right' className='flex items-center gap-4'>
								{link.title}
								{link.label && <span className='ml-auto text-muted-foreground'>{link.label}</span>}
							</TooltipContent>
						</Tooltip>
					) : (
						<a
							key={index}
							onClick={link.onClick}
							className={cn(
								buttonVariants({ variant: link.variant, size: 'sm' }),
								link.variant === 'default' && 'dark:bg-muted',
								'cursor-pointer justify-start',
								link.label === 'Theme' && 'opacity-0',
							)}>
							<link.icon
								className={cn(
									'mr-2 h-4 w-4 text-foreground',
									link.variant === 'default' && 'text-white',
								)}
							/>
							<p
								className={cn(
									'm-0 p-0 text-foreground',
									link.variant === 'default' && 'text-white dark:bg-muted',
								)}>
								{link.title}
							</p>
							{link.label && (
								<span
									className={cn(
										'ml-auto text-muted-foreground',
										link.variant === 'default' && 'text-background dark:text-white',
									)}>
									{link.label}
								</span>
							)}
						</a>
					),
				)}
			</nav>
		</div>
	);
}

export default Nav;
