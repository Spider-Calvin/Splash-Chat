import { useState, useRef } from 'react';
import {
	SendHorizonal,
	LayoutPanelTop,
	Paperclip,
	SmilePlus,
	Image,
	File,
	Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SingleTextArea } from '@/components/ui/singleTextArea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import EmojiPicker from 'emoji-picker-react';
import { Toaster } from '@/components/ui/toaster';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function MsgSend({
	message,
	setMessage,
	handleAddEmoji,
	handleImagePicker,
	handleDocumentPicker,
	handleVideoPicker,
	sendTextMessage,
	type,
	sendMsgStatus,
	setTemplateClicked,
}) {
	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
	const imageInputRef = useRef();
	const documentInputRef = useRef();
	const videoInputRef = useRef();

	return (
		<div className='absolute bottom-0 w-full bg-background p-3'>
			<Toaster position='top-right' />

			<div className='flex w-full flex-1 items-center gap-x-5'>
				<div className='relative flex flex-1 flex-row items-center justify-center rounded-lg border border-input bg-muted'>
					<SingleTextArea
						className='flex-1 p-2 text-primary'
						placeholder={`Message`}
						value={message}
						onValueChange={value => {
							setMessage(value);
						}}
					/>

					<Tooltip delayDuration={1000}>
						<TooltipTrigger asChild>
							<SmilePlus
								onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
								className={cn('mr-4 h-5 w-5 cursor-pointer text-primary')}
							/>
						</TooltipTrigger>
						<TooltipContent side='right' className='flex items-center gap-4'>
							emoji
						</TooltipContent>
					</Tooltip>

					<div className='absolute bottom-12 right-0'>
						<EmojiPicker
							theme='dark'
							open={emojiPickerOpen}
							onEmojiClick={handleAddEmoji}
							autoFocusSearch={false}
						/>
					</div>

					<Tooltip delayDuration={1000}>
						<TooltipTrigger asChild>
							<LayoutPanelTop
								onClick={() => setTemplateClicked(!emojiPickerOpen)}
								className={cn('mr-4 h-5 w-5 cursor-pointer text-primary')}
							/>
						</TooltipTrigger>
						<TooltipContent side='right' className='flex items-center gap-4'>
							Template Message
						</TooltipContent>
					</Tooltip>

					<Tooltip delayDuration={500}>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<TooltipTrigger asChild>
									<Paperclip
										onClick={() => {
											if (message?.trim()?.length > 0) {
												sendTextMessage();
											}
										}}
										className={cn('mr-2 h-5 w-5 cursor-pointer text-primary')}
									/>
								</TooltipTrigger>
							</DropdownMenuTrigger>
							<TooltipContent side='right' className='flex items-center gap-4'>
								attach files
							</TooltipContent>
							<DropdownMenuContent>
								<DropdownMenuItem
									className='flex cursor-pointer gap-3'
									onClick={() => {
										imageInputRef.current.click();
									}}>
									<Image className='ml-2 h-5 w-5' /> Image
								</DropdownMenuItem>
								<DropdownMenuItem
									className='flex cursor-pointer gap-3'
									onClick={() => {
										documentInputRef.current.click();
									}}>
									<File className='ml-2 h-5 w-5' /> Document
								</DropdownMenuItem>
								<DropdownMenuItem
									className='flex cursor-pointer gap-3'
									onClick={() => {
										videoInputRef.current.click();
									}}>
									<Video className='ml-2 h-5 w-5' /> Video
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Tooltip>
				</div>

				<Tooltip delayDuration={500}>
					<TooltipTrigger asChild>
						<SendHorizonal
							onClick={() => {
								if ((message?.trim()?.length > 0 || type === 'blob') && sendMsgStatus !== 1) {
									sendTextMessage();
								}
							}}
							className={cn(
								'mr-2 h-7 w-7 cursor-pointer',
								(message?.trim()?.length > 0 || type === 'blob') && sendMsgStatus !== 1
									? 'text-primary'
									: 'text-muted-foreground',
							)}
						/>
					</TooltipTrigger>
					<TooltipContent side='right' className='flex items-center gap-4'>
						Send Message
					</TooltipContent>
				</Tooltip>
			</div>

			<input
				className='hidden opacity-0'
				type='file'
				ref={imageInputRef}
				accept='image/png, image/gif, image/jpeg'
				onChange={e => {
					handleImagePicker(e);
				}}
			/>

			<input
				className='hidden opacity-0'
				type='file'
				ref={documentInputRef}
				accept='application/pdf'
				onChange={e => {
					handleDocumentPicker(e);
				}}
			/>

			<input
				className='hidden opacity-0'
				type='file'
				ref={videoInputRef}
				accept='video/mp4, video/mpeg, video/webm'
				onChange={e => {
					handleVideoPicker(e);
				}}
			/>
		</div>
	);
}

export default MsgSend;
