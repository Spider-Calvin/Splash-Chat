const Design = () => {
	const boxes = [
		{ id: 1, color: 'bg-primary' },
		{ id: 2, color: 'bg-secondary' },
		{ id: 3, color: 'bg-destructive' },
		{ id: 4, color: 'bg-muted' },
		{ id: 5, color: 'bg-accent' },
		{ id: 6, color: 'bg-popover' },
		{ id: 7, color: 'bg-card' },
		{ id: 8, color: 'bg-input' },
		{ id: 8, color: 'bg-border' },
		{ id: 8, color: 'bg-background' },
		{ id: 8, color: 'bg-foreground' },
		{ id: 8, color: 'bg-muted-foreground' },
		{ id: 8, color: 'bg-primary-foreground' },
		{ id: 8, color: 'bg-secondary-foreground' },
		{ id: 8, color: 'bg-destructive-foreground' },
		{ id: 8, color: 'bg-accent-foreground' },
		{ id: 8, color: 'bg-popover-foreground' },
		{ id: 8, color: 'bg-card-foreground' },
	];

	return (
		<div className='h-dvh bg-background'>
			<div className='grid grid-cols-5 gap-4 p-4'>
				{boxes.map(box => (
					<div
						key={box.id}
						className={`dark:${box.color} flex h-24 w-full items-center justify-center rounded-md font-bold text-white ${box.color} border-2 border-border`}>
						{box.color.substring(3)}
						<span className='text-black'>{box.color.substring(3)}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Design;
