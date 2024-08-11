import { useEffect, useRef } from 'react';
import { Check, CheckCheck, Clock3, Files, Download } from 'lucide-react';
import { format, isToday, differenceInMinutes } from 'date-fns';
import { ImageWithPlaceholder, VideoWithPlaceholder } from './elements';

function ChatContainer({ chatOpened, msgs, getMessagesStatus, sendMsgStatus }) {
	const chatContainerRef = useRef(null);

	useEffect(() => {
		const container = chatContainerRef.current;
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}, [getMessagesStatus, sendMsgStatus]);

	const showDisplayTime = time => {
		if (!time) return '';
		const newDate = new Date(time);
		newDate.setHours(newDate.getHours() + 5);
		newDate.setMinutes(newDate.getMinutes() + 30);
		const now = new Date();

		if (isToday(newDate)) {
			// Check if the date is within the last hour
			const minutesAgo = differenceInMinutes(now, newDate);
			if (minutesAgo === 0) {
				return `just now`;
			} else if (minutesAgo < 60) {
				return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
			}
			// Return the time if it's today but not within the last hour
			return format(newDate, 'h:mm a');
		}
		// Return formatted date if it's not today
		return format(newDate, 'd MMM, h:mm a');
	};

	const GetStatusIcon = ({ sentStatusTime, deliveredStatusTime, readStatusTime, created_at }) => {
		if (readStatusTime) {
			return (
				<>
					<CheckCheck className='h-4 w-4 text-green-400' />
					<p className='m-0 p-0 text-[0.7rem] text-xs text-background'>
						{showDisplayTime(readStatusTime)}
					</p>
				</>
			);
		} else if (deliveredStatusTime) {
			return (
				<>
					<CheckCheck className='h-4 w-4 self-end text-background' />
					<p className='m-0 p-0 text-[0.7rem] text-xs text-background'>
						{showDisplayTime(deliveredStatusTime)}
					</p>
				</>
			);
		} else if (sentStatusTime) {
			return (
				<>
					<Check className='h-4 w-4 self-end text-background' />
					<p className='m-0 p-0 text-[0.7rem] text-xs text-background'>
						{showDisplayTime(sentStatusTime)}
					</p>
				</>
			);
		} else {
			return (
				<>
					<Clock3 className='h-3 w-3 self-end text-background' />
					<p className='m-0 p-0 text-[0.7rem] text-xs text-background'>
						{showDisplayTime(created_at)}
					</p>
				</>
			);
		}
	};

	return (
		<div>
			{getMessagesStatus === 2 ? (
				<div
					ref={chatContainerRef}
					className='bg_scrollbar flex h-dvh flex-col overflow-y-auto bg-background py-28'>
					<div className='flex flex-col'>
						{msgs.map((msg, index) => {
							const imgLink = msg?.msg_type === 'image' && JSON.parse(msg?.details)?.link;
							const docLink = msg?.msg_type === 'document' && JSON.parse(msg?.details)?.link;
							const videoLink = msg?.msg_type === 'video' && JSON.parse(msg?.details)?.link;

							if ((msg?.msg_type === 'text' || msg?.msg_type === 'template') && msg.displaytext) {
								if (msg?.sent_by) {
									return (
										<div
											key={index}
											className='mx-4 my-2 flex w-max min-w-32 max-w-sm flex-col gap-y-1 rounded-2xl rounded-bl-none bg-input px-4 py-2'>
											<p className='m-0 p-0 text-sm text-primary'>{msg.displaytext}</p>
											<p className='m-0 self-end p-0 text-[0.7rem] text-muted-foreground'>
												{showDisplayTime(msg?.created_at)}
											</p>
										</div>
									);
								} else {
									return (
										<div
											key={index}
											className='m-4 my-2 flex w-max min-w-32 max-w-sm flex-col gap-y-1 self-end rounded-2xl rounded-br-none bg-primary px-4 py-2'>
											<p className='m-0 p-0 text-sm text-background'>{msg.displaytext}</p>
											<div className='flex items-center justify-end gap-x-1'>
												<GetStatusIcon
													status={msg.status}
													sentStatusTime={msg.sentstatustime}
													deliveredStatusTime={msg.deliveredstatustime}
													readStatusTime={msg.readstatustime}
													created_at={msg.created_at}
												/>
											</div>
										</div>
									);
								}
							} else if (msg?.sent_by && imgLink) {
								return (
									<div
										key={index}
										className='mx-4 my-2 flex w-max min-w-32 max-w-sm flex-col gap-y-1 rounded-2xl rounded-bl-none bg-input p-2'>
										<div className='w-full'>
											<ImageWithPlaceholder src={imgLink} alt={'preview'} />
										</div>
										{msg?.displaytext ? (
											<p className='m-0 p-2 text-sm text-background'>{msg?.displaytext}</p>
										) : null}
										<p className='m-0 self-end p-0 text-[0.7rem] text-muted-foreground'>
											{showDisplayTime(msg?.created_at)}
										</p>
									</div>
								);
							} else if (imgLink) {
								return (
									<div
										key={index}
										className='m-4 my-2 flex w-full min-w-44 max-w-sm flex-col gap-y-2 self-end rounded-2xl rounded-br-none bg-primary p-2'>
										<div className='w-full'>
											<ImageWithPlaceholder src={imgLink} alt={'preview'} />
										</div>
										{msg?.displaytext ? (
											<p className='m-0 p-2 text-sm text-background'>{msg?.displaytext}</p>
										) : null}
										<div className='flex items-center justify-end gap-x-1'>
											<GetStatusIcon
												status={msg.status}
												sentStatusTime={msg.sentstatustime}
												deliveredStatusTime={msg.deliveredstatustime}
												readStatusTime={msg.readstatustime}
												created_at={msg.created_at}
											/>
										</div>
									</div>
								);
							} else if (msg?.sent_by && docLink) {
								return (
									<div
										key={index}
										className='mx-4 my-2 flex w-max min-w-32 max-w-sm flex-col gap-y-1 rounded-2xl rounded-bl-none bg-input p-2'>
										<div className='flex w-full items-center justify-between'>
											<Files className='h-8 w-8 text-primary' />
											<a href={docLink} download target='_blank'>
												<Download className='h-4 w-4 text-primary' />
											</a>
										</div>

										{msg?.displaytext ? (
											<p className='m-0 p-2 text-sm text-background'>{msg?.displaytext}</p>
										) : null}
										<p className='m-0 self-end p-0 text-[0.7rem] text-muted-foreground'>
											{showDisplayTime(msg?.created_at)}
										</p>
									</div>
								);
							} else if (docLink) {
								return (
									<div
										key={index}
										className='m-4 my-2 flex min-w-32 max-w-sm flex-col gap-y-2 self-end rounded-2xl rounded-br-none bg-primary p-2'>
										<div className='flex w-full items-center justify-between'>
											<Files className='h-8 w-8 text-background' />
											<a href={docLink} download target='_blank'>
												<Download className='h-4 w-4 text-background' />
											</a>
										</div>

										{msg?.displaytext ? (
											<p className='m-0 p-2 text-sm text-background'>{msg?.displaytext}</p>
										) : null}

										<div className='flex items-center justify-end gap-x-1'>
											<GetStatusIcon
												status={msg.status}
												sentStatusTime={msg.sentstatustime}
												deliveredStatusTime={msg.deliveredstatustime}
												readStatusTime={msg.readstatustime}
												created_at={msg.created_at}
											/>
										</div>
									</div>
								);
							} else if (msg?.sent_by && videoLink) {
								return (
									<div
										key={index}
										className='mx-4 my-2 flex w-max min-w-32 max-w-sm flex-col gap-y-1 rounded-2xl rounded-bl-none bg-input p-2'>
										<div className='w-full'>
											<VideoWithPlaceholder src={videoLink} alt={'preview'} />
										</div>
										{msg?.displaytext ? (
											<p className='m-0 p-2 text-sm text-background'>{msg?.displaytext}</p>
										) : null}
										<p className='m-0 self-end p-0 text-[0.7rem] text-muted-foreground'>
											{showDisplayTime(msg?.created_at)}
										</p>
									</div>
								);
							} else if (videoLink) {
								return (
									<div
										key={index}
										className='m-4 my-2 flex w-full min-w-44 max-w-sm flex-col gap-y-2 self-end rounded-2xl rounded-br-none bg-primary p-2'>
										<div className='w-full'>
											<VideoWithPlaceholder src={videoLink} alt={'preview'} />
										</div>
										{msg?.displaytext ? (
											<p className='m-0 p-2 text-sm text-background'>{msg?.displaytext}</p>
										) : null}
										<div className='flex items-center justify-end gap-x-1'>
											<GetStatusIcon
												status={msg.status}
												sentStatusTime={msg.sentstatustime}
												deliveredStatusTime={msg.deliveredstatustime}
												readStatusTime={msg.readstatustime}
												created_at={msg.created_at}
											/>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			) : (
				<div className='flex h-dvh flex-1 items-center justify-center bg-background'>
					<h6 className='font-medium text-muted-foreground'>
						Loading chats of {chatOpened.name}...
					</h6>
				</div>
			)}
		</div>
	);
}

export default ChatContainer;
