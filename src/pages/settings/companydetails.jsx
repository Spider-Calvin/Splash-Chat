import { Input } from '@/components/ui/input';

function Companydetails() {
	return (
		<div className='h-full w-3/4 p-8 pt-0'>
			<div className='noBar h-[90dvh] w-full space-y-5 overflow-auto pb-16 pt-4'>
				<div className='rounded-lg border bg-background shadow-md'>
					<p className='text-md p-3 font-semibold text-primary'>Database Information</p>
					<div className='w-full border-t border-gray-200'></div>
					<ul className='space-y-2 p-3 text-primary'>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>Username</p>
								<Input placeholder='Enter Username' className='max-w-lg text-primary' />
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>Password</p>
								<Input
									type='password'
									placeholder='Enter Password'
									className='max-w-lg text-primary'
								/>
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>Connection URL</p>
								<Input placeholder='Enter URL' className='max-w-lg text-primary' />
							</div>
						</li>
					</ul>
				</div>

				<div className='rounded-lg border bg-background shadow-md'>
					<p className='text-md p-3 font-semibold text-primary'>WhatsApp Information</p>
					<div className='w-full border-t border-gray-200'></div>
					<ul className='space-y-2 p-3 text-primary'>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>AppID</p>
								<Input placeholder='Enter AppID' className='max-w-lg text-primary' />
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>Auth Token</p>
								<Input
									type='password'
									placeholder='Enter Auth Token'
									className='max-w-lg text-primary'
								/>
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>WhatsApp Meta URL</p>
								<Input placeholder='Enter Meta URL' className='max-w-lg text-primary' />
							</div>
						</li>
					</ul>
				</div>
				<div className='rounded-lg border bg-background shadow-md'>
					<p className='text-md p-3 font-semibold text-primary'>AWS Information</p>
					<div className='w-full border-t border-gray-200'></div>
					<ul className='space-y-2 p-3 text-primary'>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>Region</p>
								<Input placeholder='Enter Region' className='max-w-lg text-primary' />
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>Access Key</p>
								<Input placeholder='Enter Accesskey' className='max-w-lg text-primary' />
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>Secret Access Key</p>
								<Input
									type='password'
									placeholder='Enter Secret Access key'
									className='max-w-lg text-primary'
								/>
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>S3-Bucket Name</p>
								<Input placeholder='Enter Bucket Name' className='max-w-lg text-primary' />
							</div>
						</li>
						<li className='rounded-lg p-2'>
							<div className='text-md flex items-center justify-between gap-3'>
								<p>S3-Bucket URL</p>
								<Input placeholder='Enter Bucket Url' className='max-w-lg text-primary' />
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Companydetails;
