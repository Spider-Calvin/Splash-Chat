import { useEffect, useState } from 'react';
import {
	flexRender,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { API_ROUTES, stringInterpolator, getService, postService } from '@/api';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const columns = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('role')}</div>,
	},
	{
		accessorKey: 'fullname',
		header: ({ column }) => (
			<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Fullname <ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
		cell: ({ row }) => <div className='capitalize'>{row.getValue('fullname')}</div>,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Email <ArrowUpDown className='ml-2 h-4 w-4' />
			</Button>
		),
		cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
	},
	/* {
		id: 'actions',
		cell: ({ row }) => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						className='flex flex-1 justify-between'
						onClick={() => navigator.clipboard.writeText(row.original.id)}>
						Edit <SquarePen className='ml-2 h-4 w-4' />
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className='flex flex-1 justify-between text-destructive hover:text-red-400'>
						Delete <Trash2 className='ml-2 h-4 w-4 text-destructive' />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	}, */
];

const Teammembers = () => {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});
	const [data, setData] = useState([]);
	const [fullname, setFullname] = useState('');
	const [role, setRole] = useState('');
	const [email, setEmail] = useState('');
	const { toast } = useToast();

	const getAllAgents = async () => {
		try {
			const value = await getService(stringInterpolator(API_ROUTES.GET_ALL_AGENTS));
			console.log('value', value);
			if (value.status) {
				setData(value.data);
			}
		} catch (error) {
			console.log('ERROR', error);
		}
	};

	const createAgent = async () => {
		const reqbody = { fullname, role, email };
		const value = await postService(stringInterpolator(API_ROUTES.CREATE_AGENT), reqbody);
		if (value.status) {
			toast({
				className: 'bg-green-200',
				description: `Added user successfully!`,
			});
			getAllAgents();
		}
	};

	useEffect(() => {
		getAllAgents();
	}, []);

	const table = useReactTable({
		data,
		columns,
		state: { sorting, columnFilters, columnVisibility, rowSelection },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	return (
		<div className='h-full w-3/4 p-8 pt-0'>
			<Toaster />
			<div className='noBar h-[90dvh] w-full space-y-5 overflow-auto pb-16 pt-4'>
				<div className='flex items-center justify-between rounded-lg border bg-background p-4 shadow-sm'>
					<div>
						<h2 className='text-md font-semibold text-primary'>Team members</h2>
						<p className='text-sm text-muted-foreground'>
							Invite or manage your organisation’s members.
						</p>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button className='rounded-md bg-primary px-4 py-2 text-background'>
								+ Add Member
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Add New Member</DialogTitle>
								<DialogDescription>
									Add profile details here. Click confirm when youre done.
								</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label htmlFor='name' className='text-right'>
										Full Name
									</Label>
									<Input
										onChange={e => setFullname(e.target.value)}
										id='name'
										placeholder='Enter fullname'
										className='col-span-3'
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label htmlFor='username' className='text-right'>
										Email
									</Label>
									<Input
										onChange={e => setEmail(e.target.value)}
										id='username'
										placeholder='Enter email'
										className='col-span-3'
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label htmlFor='username' className='text-right'>
										Role
									</Label>
									<Select onValueChange={e => setRole(e)}>
										<SelectTrigger className='w-[180px]'>
											<SelectValue placeholder='Select a Role' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Roles</SelectLabel>
												<SelectItem value='admin'>Admin</SelectItem>
												<SelectItem value='staff'>Staff</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>
							<DialogFooter className='sm:justify-between'>
								<DialogClose asChild>
									<Button type='button' variant='secondary'>
										Close
									</Button>
								</DialogClose>
								<DialogClose asChild>
									<Button onClick={() => createAgent()} type='submit'>
										Confirm
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className='mt-4 w-full'>
					<div className='flex items-center py-4'>
						<Input
							placeholder='Filter emails...'
							value={table.getColumn('email')?.getFilterValue() || ''}
							onChange={e => table.getColumn('email')?.setFilterValue(e.target.value)}
							className='max-w-sm text-primary'
						/>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' className='ml-auto text-primary'>
									Columns <ChevronDown className='ml-2 h-4 w-4' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								{table
									.getAllColumns()
									.filter(column => column.getCanHide())
									.map(column => (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={value => column.toggleVisibility(!!value)}>
											{column.id}
										</DropdownMenuCheckboxItem>
									))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map(headerGroup => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map(header => (
											<TableHead key={header.id}>
												{!header.isPlaceholder &&
													flexRender(header.column.columnDef.header, header.getContext())}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows.length ? (
									table.getRowModel().rows.map(row => (
										<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
											{row.getVisibleCells().map(cell => (
												<TableCell className='text-primary' key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className='h-24 text-center text-primary'>
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>

					<div className='flex items-center justify-end space-x-2 py-4'>
						<div className='flex-1 text-sm text-muted-foreground'>
							{table.getFilteredSelectedRowModel().rows.length} of{' '}
							{table.getFilteredRowModel().rows.length} row(s) selected.
						</div>
						<div className='space-x-2 text-primary'>
							<Button
								variant='outline'
								className='cursor-pointer'
								size='sm'
								onClick={table.previousPage}
								disabled={!table.getCanPreviousPage()}>
								Previous
							</Button>
							<Button
								variant='outline'
								className='cursor-pointer'
								size='sm'
								onClick={table.nextPage}
								disabled={!table.getCanNextPage()}>
								Next
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Teammembers;
