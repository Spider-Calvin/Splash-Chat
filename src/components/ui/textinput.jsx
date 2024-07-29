import { useState } from 'react';
// import { TextInput } from '@tremor/react';
import { generateRandomString } from '@/utils';

const CustomTextInput = ({
	label,
	update,
	type = 'text',
	placeholder = '',
	value = '',
	onChange,
	className = 'w-full p-1 rounded',
	error,
	setError,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const id = generateRandomString(8);

	const handleInputFocus = () => {
		setIsFocused(true);
	};

	const handleInputBlur = () => {
		setIsFocused(false);
	};

	const handleInputChange = e => {
		const inputValue = e.target.value;
		onChange(e, update);

		// Regex patterns for validation
		const emailRegex = /^\w+([.+]\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
		const mobileRegex = /^\d{10}$/;
		const otpRegex = /^\d{6}$/;
		const min12Num = /^.{8,}$/;

		// Validate input based on the update type
		switch (update) {
			case 'email':
				setError(!emailRegex.test(inputValue));
				break;
			case 'txtNo':
				setError(!min12Num.test(inputValue));
				break;
			case 'mobile':
				setError(!mobileRegex.test(inputValue));
				break;
			case 'otp':
				setError(!otpRegex.test(inputValue));
				break;
			default:
				setError(false);
				break;
		}
	};

	return (
		<div className='relative'>
			{label && (
				<label
					htmlFor={id}
					className={`bg-white ml-2 px-2 absolute transition-all duration-300 z-50 ${
						isFocused || value ? '-top-3 text-sm text-gray-500' : 'top-1/2 -translate-y-1/2'
					}`}>
					{label}
				</label>
			)}
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleInputChange}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				className={className}
				error={error}
			/>
		</div>
	);
};

export default CustomTextInput;
