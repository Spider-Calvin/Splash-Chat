import * as React from 'react';
import { cn } from '@/lib/utils';

const SingleTextArea = React.forwardRef(
	({ className, value = '', onValueChange, ...props }, ref) => {
		const [isMultiline, setIsMultiline] = React.useState(value.indexOf('\n') !== -1);
		const [cursorPosition, setCursorPosition] = React.useState(0); // Track cursor position
		const textareaRef = ref || React.useRef(null);
		const inputRef = React.useRef(null);

		const adjustHeight = target => {
			target.style.height = 'auto';
			target.style.height = `${target.scrollHeight / 16 + 1}rem`;
		};

		React.useEffect(() => {
			if (textareaRef.current) {
				adjustHeight(textareaRef.current);
			}
		}, [value, textareaRef]);

		const handleKeyDown = event => {
			if (event.key === 'Enter' && !isMultiline) {
				event.preventDefault(); // Prevent the default behavior of adding a new line in the input
				const newValue = value + '\n'; // Add a new line to the value
				onValueChange(newValue); // Update the value with the new line
				setIsMultiline(true); // Switch to textarea
				setCursorPosition(newValue.length); // Set cursor position to end of the new line
			}
		};

		const handleChange = event => {
			const newValue = event.target.value;
			onValueChange(newValue);

			// Update the state based on the presence of newline characters
			setIsMultiline(newValue.indexOf('\n') !== -1);

			// Update cursor position
			setCursorPosition(event.target.selectionStart);
		};

		React.useEffect(() => {
			const setCursor = ref => {
				if (ref.current) {
					ref.current.focus();
					// Restore cursor position
					ref.current.setSelectionRange(cursorPosition, cursorPosition);
				}
			};

			if (isMultiline) {
				setCursor(textareaRef);
			} else {
				setCursor(inputRef);
			}
		}, [isMultiline, cursorPosition, textareaRef]);

		React.useEffect(() => {
			if (!isMultiline && inputRef.current) {
				// Maintain cursor position when switching from textarea to input
				inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
				inputRef.current.focus();
			}
		}, [isMultiline, cursorPosition]);

		return isMultiline ? (
			<textarea
				className={cn(
					'flex w-full rounded-lg bg-muted px-3 py-2 text-sm file:border-0 placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={textareaRef}
				value={value}
				onChange={handleChange}
				{...props}
			/>
		) : (
			<input
				className={cn(
					'flex h-9 w-full rounded-lg bg-muted px-3 py-2 text-sm shadow-none file:border-0 placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
					className,
				)}
				ref={inputRef}
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...props}
			/>
		);
	},
);

SingleTextArea.displayName = 'SingleTextArea';

export { SingleTextArea };
