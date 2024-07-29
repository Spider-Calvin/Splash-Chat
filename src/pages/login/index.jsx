import React from 'react';

const Index = () => {
	return (
		<section className='bg-gray-50'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<a href='#' className='flex items-center mb-6 text-2xl font-bold text-gray-900 font-nunito'>
					<img
						className='w-8 h-8 mr-2'
						src='https://circlehealth-assets.s3.ap-south-1.amazonaws.com/ch-logo.png'
						alt='logo'
					/>
					Circle Health
				</a>
				<div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl'>
							Sign in to your account
						</h1>
						<form className='space-y-4 md:space-y-6' action='#'>
							<div>
								<label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
									Your email
								</label>
								<input
									type='email'
									name='email'
									id='email'
									className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
									placeholder='name@company.com'
									required={true}
								/>
							</div>
							{false && (
								<div>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-gray-900'>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
										required=''
									/>
								</div>
							)}

							<button
								type='submit'
								className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary'>
								Send Otp
							</button>
							<p class='text-sm text-center font-light text-gray-500'>
								Copyright © Circle Health, Version: 1.0.0
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
