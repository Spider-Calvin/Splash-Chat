import { postService, API_ROUTES } from '@/api';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRecoilState } from 'recoil';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loggedIn as rLoggedIn, agent as rAgent } from '@/recoil';

const Index = () => {
	// eslint-disable-next-line no-unused-vars
	const [loggedIn, setLoggedIn] = useRecoilState(rLoggedIn);
	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);
	const [details, setDetails] = useState({
		email: '',
		role: 'admin',
		otp: '',
	});
	const [sendOptStatus, setSendOptStatus] = useState(0);
	const [verifyOptStatus, setVerifyOptStatus] = useState(0);

	const sendOtp = async event => {
		event.preventDefault();
		try {
			setSendOptStatus(1);
			const body = {
				email: details.email,
				role: details.role,
			};

			const sendOtpRes = await postService(API_ROUTES.SEND_OTP, body);

			if (sendOtpRes.status === 1) {
				setSendOptStatus(2);
			} else {
				setSendOptStatus(-1);
				setTimeout(() => setSendOptStatus(0), 2500);
			}
		} catch (error) {
			console.log('ERROR', error);
			setSendOptStatus(-1);
			setTimeout(() => setSendOptStatus(0), 2500);
		}
	};

	const verifyOtp = async event => {
		event.preventDefault();
		try {
			setVerifyOptStatus(1);
			const body = {
				email: details.email,
				role: details.role,
				otp: details.otp,
			};

			const verifyOtpRes = await postService(API_ROUTES.VERIFY_OTP, body);

			if (verifyOtpRes.status === 1) {
				const agentDetails = JSON.stringify({
					email: details.email,
					role: details.role,
					name: verifyOtpRes.data.fullname,
				});
				sessionStorage.setItem('token', verifyOtpRes.jwt);
				setAgent({
					email: details.email,
					role: details.role,
					name: verifyOtpRes.data.fullname,
				});
				sessionStorage.setItem('agent', agentDetails);
				setLoggedIn(true);
			} else {
				setVerifyOptStatus(-1);
			}
		} catch (error) {
			console.log('ERROR', error);
			setVerifyOptStatus(-1);
			setTimeout(() => setVerifyOptStatus(0), 2500);
		}
	};

	return (
		<section className='bg-gray-50'>
			<div className='mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0'>
				<a className='mb-6 flex items-center font-nunito text-2xl font-bold text-gray-900'>
					<img className='mr-2 h-8 w-8' src='/splashLogo.png' alt='logo' />
					Splash Chat
				</a>
				<div className='w-full max-w-md rounded-lg bg-white shadow md:mt-0 xl:p-0'>
					<div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
						<h1 className='text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl'>
							Sign in to your account
						</h1>
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={sendOptStatus === 2 ? verifyOtp : sendOtp}>
							{sendOptStatus !== 2 ? (
								<>
									<div>
										<label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900'>
											Your email
										</label>
										<Input
											type='email'
											name='email'
											id='email'
											value={details.email}
											placeholder='name@circlehealth.com'
											required={true}
											onChange={e => setDetails(prev => ({ ...prev, email: e.target.value }))}
										/>
									</div>

									<Select
										onValueChange={value => setDetails(prev => ({ ...prev, role: value }))}
										defaultValue={details.role}>
										<SelectTrigger>
											<SelectValue placeholder='Select a role' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='admin'>Admin</SelectItem>
											<SelectItem value='staff'>Staff</SelectItem>
										</SelectContent>
									</Select>

									<Button
										disabled={sendOptStatus === 1 || sendOptStatus === -1}
										type='submit'
										className='w-full'>
										{sendOptStatus === 0 ? 'Send OTP' : null}
										{sendOptStatus === 1 ? (
											<>
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
												Please wait{' '}
											</>
										) : null}
										{sendOptStatus === -1 ? 'Send OTP Failed' : null}
									</Button>
								</>
							) : null}

							{sendOptStatus === 2 ? (
								<>
									<div>
										<label className='mb-2 block text-sm font-medium text-gray-900'>OTP</label>
										<div>
											<InputOTP
												maxLength={6}
												value={details.otp}
												onChange={value => {
													setVerifyOptStatus(0);
													setDetails(prev => ({ ...prev, otp: value }));
												}}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
												</InputOTPGroup>
												<InputOTPSeparator />
												<InputOTPGroup>
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</div>
									</div>

									<Button
										disabled={verifyOptStatus === 1 || verifyOptStatus === -1}
										type='submit'
										className='w-full'>
										{verifyOptStatus === 0 ? 'Verify OTP' : null}
										{verifyOptStatus === 1 ? (
											<>
												<Loader2 className='mr-2 h-4 w-4 animate-spin' />
												Please wait{' '}
											</>
										) : null}
										{verifyOptStatus === -1 ? 'Incorrect OTP' : null}
									</Button>
								</>
							) : null}

							<p className='text-center text-sm font-light text-gray-500'>
								Copyright © spider-calvin, Version: 1.0.0
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Index;
