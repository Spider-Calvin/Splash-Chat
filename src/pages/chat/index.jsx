import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { chatOpened as rChatOpened } from '@/recoil';
import { useRecoilState } from 'recoil';
import ChatBox from './chat-box';
import MsgSend from './msg-send';
import Template from './template-msg';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { postService, postFormData, API_ROUTES, stringInterpolator, getService } from '@/api';
import { agent as rAgent, openedChatMessages as rOpenedChatMessages } from '@/recoil';
import { cn } from '@/lib/utils';
import { X, Files } from 'lucide-react';

const audio = new Audio('https://wacomm-assets.s3.ap-south-1.amazonaws.com/messagepopshort.mp3');

function MailDisplay() {
	// eslint-disable-next-line no-unused-vars
	const [chatOpened, setChatOpened] = useRecoilState(rChatOpened);
	const [isOpen, setIsOpen] = useState(false);

	//* Chat Block functions and states end
	const [msgs, setMsgs] = useRecoilState(rOpenedChatMessages);
	const [getMessagesStatus, setGetMessagesStatus] = useState(0);
	const [templateClicked, setTemplateClicked] = useState(false);
	const [templateParams, setTemplateParams] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState(undefined);

	useEffect(() => {
		const intervalId = setInterval(() => {
			// Access the current value from the ref
			if (chatOpened?.roomId) {
				getPatientsChats();
			}
		}, 7500);

		return () => clearInterval(intervalId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatOpened?.roomId, msgs?.[0]?.roomid]);

	const getPatientsChats = async () => {
		const updateState = msgs?.[0]?.roomid !== chatOpened.roomId;

		if (updateState) {
			setGetMessagesStatus(1);
		} else if (getMessagesStatus !== 2) {
			setGetMessagesStatus(2);
		}

		try {
			const getMessagesResponse = await getService(
				stringInterpolator(API_ROUTES.GET_ROOM_MSGS, { roomId: chatOpened.roomId }),
			);

			if (getMessagesResponse.status === 1) {
				const messages = [...getMessagesResponse.data];
				setMsgs(messages);

				if (updateState) {
					setGetMessagesStatus(2);
				}
			} else {
				if (updateState) {
					setGetMessagesStatus(-1);
					console.log('ERROR', getMessagesResponse);
				}
			}
		} catch (error) {
			if (updateState) {
				setGetMessagesStatus(-1);
			}
			console.log('ERROR', error);
		}
	};

	const addTextMessagesToArray = (text = '') => {
		let messages = [...msgs];
		messages.push({
			displaytext: text,
			sent_by: null,
			sent_to: null,
			msg_type: 'text',
			created_at: getTime5hrs30minsLessFromNow(),
		});

		setMsgs(messages);
		setMessage('');
	};

	const addTemplateMessagesToArray = (text = '') => {
		let messages = [...msgs];
		messages.push({
			displaytext: text,
			sent_by: null,
			sent_to: null,
			msg_type: 'template',
			created_at: getTime5hrs30minsLessFromNow(),
		});

		setMsgs(messages);
		setMessage('');
	};

	const addImagesToMessagesArray = (text = '', link) => {
		let messages = [...msgs];
		messages.push({
			displaytext: text,
			details: JSON.stringify({ link: link }),
			sent_by: null,
			sent_to: null,
			msg_type: 'image',
			created_at: getTime5hrs30minsLessFromNow(),
		});

		setMsgs(messages);
		setMessage('');
		setUploadingImageUrl(undefined);
	};

	const addDocumentToMessagesArray = (text = '', link) => {
		let messages = [...msgs];
		messages.push({
			displaytext: text,
			details: JSON.stringify({ link: link }),
			sent_by: null,
			sent_to: null,
			msg_type: 'document',
			created_at: getTime5hrs30minsLessFromNow(),
		});

		setMsgs(messages);
		setMessage('');
		setDocumentUrl(undefined);
	};

	const addVideoToMessagesArray = (text = '', link) => {
		let messages = [...msgs];
		messages.push({
			displaytext: text,
			details: JSON.stringify({ link: link }),
			sent_by: null,
			sent_to: null,
			msg_type: 'video',
			created_at: getTime5hrs30minsLessFromNow(),
		});

		setMsgs(messages);
		setMessage('');
		setVideoUrl(undefined);
	};

	useEffect(() => {
		if (chatOpened?.roomId) {
			getPatientsChats();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatOpened?.roomId]);
	//* Chat Block functions and states end

	//* send messages functions and states start
	const [message, setMessage] = useState('');
	// eslint-disable-next-line no-unused-vars
	const [agent, setAgent] = useRecoilState(rAgent);
	// eslint-disable-next-line no-unused-vars
	const [sendMsgStatus, setSendMsgStatus] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [imagePickerStatus, setImagePickerStatus] = useState(0);
	const setImagePickerDefault = () => {
		setImagePickerStatus(0);
	};
	const [uploadingImageUrl, setUploadingImageUrl] = useState(undefined);
	const [documentUrl, setDocumentUrl] = useState(undefined);
	const [documentName, setDocumentName] = useState(undefined);
	const [videoUrl, setVideoUrl] = useState(undefined);

	const handleAddEmoji = e => {
		setMessage(msg => msg + e.emoji);
	};

	const getTime5hrs30minsLessFromNow = () => {
		const newDate = new Date();
		newDate.setHours(newDate.getHours() - 5);
		newDate.setMinutes(newDate.getMinutes() - 30);

		return newDate;
	};

	const sendTextMessage = async () => {
		try {
			setSendMsgStatus(1);
			const body = {
				agentid: agent.email,
				messaging_product: 'whatsapp',
				recipient_type: 'individual',
				to: '91' + chatOpened.mobile?.substring(chatOpened.mobile?.length - 10),
				type: 'text',
				text: {
					body: message,
				},
			};

			const sendMsgResponse = await postService(API_ROUTES.SEND_TEXT_MSG, body);

			if (sendMsgResponse.status === 1) {
				setSendMsgStatus(2);
				audio.play();
				addTextMessagesToArray(message);
			} else {
				setSendMsgStatus(-1);
				setTimeout(() => setSendMsgStatus(0), 2500);
			}
		} catch (error) {
			console.log('ERROR', error);
			setSendMsgStatus(-1);
			setTimeout(() => setSendMsgStatus(0), 2500);
		}
	};

	const sendImageInChat = async () => {
		try {
			setSendMsgStatus(1);
			const body = {
				agentid: agent.email,
				messaging_product: 'whatsapp',
				recipient_type: 'individual',
				to: '91' + chatOpened.mobile?.substring(chatOpened.mobile?.length - 10),
				type: 'image',
				image: {
					link: uploadingImageUrl,
					caption: message,
				},
			};

			const sendMsgResponse = await postService(API_ROUTES.SEND_TEXT_MSG, body);

			if (sendMsgResponse.status === 1) {
				setSendMsgStatus(2);
				audio.play();
				addImagesToMessagesArray(message, uploadingImageUrl);
			} else {
				setSendMsgStatus(-1);
				setTimeout(() => setSendMsgStatus(0), 2500);
			}
		} catch (error) {
			console.log('ERROR', error);
			setSendMsgStatus(-1);
			setTimeout(() => setSendMsgStatus(0), 2500);
		}
	};

	const sendDocumentInChat = async () => {
		try {
			setSendMsgStatus(1);
			const body = {
				agentid: agent.email,
				messaging_product: 'whatsapp',
				recipient_type: 'individual',
				to: '91' + chatOpened.mobile?.substring(chatOpened.mobile?.length - 10),
				type: 'document',
				document: {
					link: documentUrl,
					filename: documentName,
					caption: message,
				},
			};

			const sendMsgResponse = await postService(API_ROUTES.SEND_TEXT_MSG, body);

			if (sendMsgResponse.status === 1) {
				setSendMsgStatus(2);
				audio.play();
				addDocumentToMessagesArray(message, documentUrl);
			} else {
				setSendMsgStatus(-1);
				setTimeout(() => setSendMsgStatus(0), 2500);
			}
		} catch (error) {
			console.log('ERROR', error);
			setSendMsgStatus(-1);
			setTimeout(() => setSendMsgStatus(0), 2500);
		}
	};

	const sendVideoInChat = async () => {
		try {
			setSendMsgStatus(1);
			const body = {
				agentid: agent.email,
				messaging_product: 'whatsapp',
				recipient_type: 'individual',
				to: '91' + chatOpened.mobile?.substring(chatOpened.mobile?.length - 10),
				type: 'video',
				video: {
					link: videoUrl,
					caption: message,
				},
			};

			const sendMsgResponse = await postService(API_ROUTES.SEND_TEXT_MSG, body);

			if (sendMsgResponse.status === 1) {
				setSendMsgStatus(2);
				audio.play();
				addVideoToMessagesArray(message, videoUrl);
			} else {
				setSendMsgStatus(-1);
				setTimeout(() => setSendMsgStatus(0), 2500);
			}
		} catch (error) {
			console.log('ERROR', error);
			setSendMsgStatus(-1);
			setTimeout(() => setSendMsgStatus(0), 2500);
		}
	};

	const sendTemplateInChat = async () => {
		try {
			setSendMsgStatus(1);
			setTemplateClicked(false);

			const body = {
				agentid: agent.email,
				messaging_product: 'whatsapp',
				to: '91' + chatOpened.mobile?.substring(chatOpened.mobile?.length - 10),
				type: 'template',
				template: {
					name: selectedTemplate,
					language: {
						policy: 'deterministic',
						code: 'en',
					},
					components: [
						{
							type: 'body',
							parameters: templateParams.map(text => ({
								type: 'text',
								text,
							})),
						},
					],
				},
			};

			const sendMsgResponse = await postService(API_ROUTES.SEND_TEXT_MSG, body);

			if (sendMsgResponse.status === 1) {
				setSendMsgStatus(2);
				audio.play();
				addTemplateMessagesToArray(message);
			} else {
				setSendMsgStatus(-1);
				setTimeout(() => setSendMsgStatus(0), 2500);
			}
		} catch (error) {
			console.log('ERROR', error);
			setSendMsgStatus(-1);
			setTimeout(() => setSendMsgStatus(0), 2500);
		}
	};

	const handleImagePicker = event => {
		try {
			setImagePickerStatus(0);
			let formdata = new FormData();
			formdata.append('file', event.target.files[0]);
			formdata.append('usage', 'sales');

			postFormData(API_ROUTES.IMAGE_UPLOAD, formdata)
				.then(res => {
					if (res.status == 1) {
						setUploadingImageUrl(res.url);
						setImagePickerStatus(2);
					} else {
						setImagePickerStatus(-1);
						setImagePickerDefault();
					}
				})
				.catch(error => {
					setImagePickerStatus(-1);
					setImagePickerDefault();
					console.log('setImagePickerStatus(-1)', error);
				});
		} catch (error) {
			setImagePickerStatus(-1);
			setImagePickerDefault();
			console.log('Error', error);
		}
	};

	const handleDocumentPicker = event => {
		try {
			setImagePickerStatus(0);
			let formdata = new FormData();
			formdata.append('file', event.target.files[0]);
			formdata.append('usage', 'sales');
			setDocumentName(event.target.files[0].name);
			postFormData(API_ROUTES.IMAGE_UPLOAD, formdata)
				.then(res => {
					if (res.status == 1) {
						setDocumentUrl(res.url);
						setImagePickerStatus(2);
					} else {
						setImagePickerStatus(-1);
						setImagePickerDefault();
					}
				})
				.catch(error => {
					setImagePickerStatus(-1);
					setImagePickerDefault();
					console.log('setImagePickerStatus(-1)', error);
				});
		} catch (error) {
			setImagePickerStatus(-1);
			setImagePickerDefault();
			console.log('Error', error);
		}
	};

	const handleVideoPicker = event => {
		try {
			setImagePickerStatus(0);
			let formdata = new FormData();
			formdata.append('file', event.target.files[0]);
			formdata.append('usage', 'sales');
			setDocumentName(event.target.files[0].name);
			postFormData(API_ROUTES.IMAGE_UPLOAD, formdata)
				.then(res => {
					if (res.status == 1) {
						setVideoUrl(res.url);
						setImagePickerStatus(2);
					} else {
						setImagePickerStatus(-1);
						setImagePickerDefault();
					}
				})
				.catch(error => {
					setImagePickerStatus(-1);
					setImagePickerDefault();
					console.log('setImagePickerStatus(-1)', error);
				});
		} catch (error) {
			setImagePickerStatus(-1);
			setImagePickerDefault();
			console.log('Error', error);
		}
	};

	const clearImage = () => {
		setUploadingImageUrl(undefined);
	};
	//* send messages functions and states end

	return (
		<div className='relative flex h-dvh flex-col'>
			{chatOpened?.roomId ? (
				<div className='flex flex-1 flex-col'>
					<div
						className={cn(
							!(uploadingImageUrl || documentUrl || videoUrl || templateClicked) &&
								'absolute top-0 z-50 w-full',
						)}>
						<div className='flex items-start bg-background p-3'>
							<div className='flex items-start gap-4 text-sm'>
								<Avatar>
									<AvatarImage alt={chatOpened?.name} />
									<AvatarFallback className='dark:bg-primary dark:text-secondary'>
										{chatOpened.name
											?.split(' ')
											.map((chunk, i) => {
												if (i < 2) return chunk[0];
												else return '';
											})
											.join('')}
									</AvatarFallback>
								</Avatar>
								<div className='grid gap-1'>
									<div className='font-semibold text-primary'>{chatOpened?.name}</div>
									<div className='line-clamp-1 text-xs text-muted-foreground'>
										+91 {chatOpened.mobile.substring(chatOpened.mobile.length - 10)}
									</div>
								</div>
							</div>
						</div>
						<Separator />
					</div>
					<div className='h-dvh'>
						{!uploadingImageUrl && !documentUrl && !videoUrl && !templateClicked ? (
							<>
								<ChatBox
									sendMsgStatus={sendMsgStatus}
									chatOpened={chatOpened}
									msgs={msgs}
									getMessagesStatus={getMessagesStatus}
								/>
								<Separator className='mt-auto' />
								<MsgSend
									type={'text'}
									chatOpened={chatOpened}
									message={message}
									setMessage={setMessage}
									handleAddEmoji={handleAddEmoji}
									handleImagePicker={handleImagePicker}
									handleDocumentPicker={handleDocumentPicker}
									sendTextMessage={sendTextMessage}
									sendMsgStatus={sendMsgStatus}
									handleVideoPicker={handleVideoPicker}
									templateClicked={templateClicked}
									setTemplateClicked={setTemplateClicked}
								/>
							</>
						) : null}

						{uploadingImageUrl ? (
							<>
								<div className='relative mx-auto w-full max-w-4xl px-5 py-5'>
									<img
										src={uploadingImageUrl}
										alt='Preview'
										className='h-[80dvh] w-full object-contain'
									/>
									<X
										onClick={clearImage}
										className='absolute right-10 top-10 cursor-pointer rounded-md bg-background text-primary opacity-80'
									/>
								</div>
								<MsgSend
									type={'blob'}
									chatOpened={chatOpened}
									message={message}
									setMessage={setMessage}
									handleAddEmoji={handleAddEmoji}
									handleImagePicker={handleImagePicker}
									handleDocumentPicker={handleDocumentPicker}
									sendTextMessage={sendImageInChat}
									sendMsgStatus={sendMsgStatus}
									handleVideoPicker={handleVideoPicker}
									templateClicked={templateClicked}
									setTemplateClicked={setTemplateClicked}
								/>
							</>
						) : null}

						{documentUrl ? (
							<>
								<div className='relative mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center px-5 py-5'>
									<Files className='h-60 w-52' />
									<p className='text-base text-primary'>{documentName}</p>
									<X
										onClick={clearImage}
										className='absolute right-10 top-10 cursor-pointer rounded-md bg-background text-primary opacity-80'
									/>
								</div>
								<MsgSend
									type={'blob'}
									chatOpened={chatOpened}
									message={message}
									setMessage={setMessage}
									handleAddEmoji={handleAddEmoji}
									handleImagePicker={handleImagePicker}
									handleDocumentPicker={handleDocumentPicker}
									sendTextMessage={sendDocumentInChat}
									sendMsgStatus={sendMsgStatus}
									handleVideoPicker={handleVideoPicker}
									templateClicked={templateClicked}
									setTemplateClicked={setTemplateClicked}
								/>
							</>
						) : null}

						{videoUrl ? (
							<>
								<div className='relative mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center px-5 py-5'>
									<video controls className='h-[80dvh] w-full object-contain'>
										<source src={videoUrl} type='video/mp4' />
									</video>
									<X
										onClick={clearImage}
										className='absolute right-10 top-10 cursor-pointer rounded-md bg-background text-primary opacity-80'
									/>
								</div>
								<MsgSend
									type={'blob'}
									chatOpened={chatOpened}
									message={message}
									setMessage={setMessage}
									handleAddEmoji={handleAddEmoji}
									handleImagePicker={handleImagePicker}
									handleDocumentPicker={handleDocumentPicker}
									sendTextMessage={sendVideoInChat}
									sendMsgStatus={sendMsgStatus}
									handleVideoPicker={handleVideoPicker}
									templateClicked={templateClicked}
									setTemplateClicked={setTemplateClicked}
								/>
							</>
						) : null}

						{templateClicked ? (
							<Template
								type={'template'}
								sendMessageFunc={sendTemplateInChat}
								templateParams={templateParams}
								setTemplateParams={setTemplateParams}
								setSelectedTemplate={setSelectedTemplate}
								selectedTemplate={selectedTemplate}
							/>
						) : null}
					</div>
				</div>
			) : (
				<div className='flex flex-1 flex-col items-center justify-center bg-background p-8'>
					<a
						href='#'
						className='dark: mb-2 flex items-center font-nunito text-2xl font-bold text-gray-900 text-muted-foreground'>
						<img className='bg-whit mr-2 h-8 w-8' src='/splashLogo.png' alt='logo' />
						Splash Chat
					</a>
					<p className='text-center text-sm font-light text-muted-foreground'>
						Copyright © spider-calvin, Version: 1.0.0
					</p>
				</div>
			)}

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className='sm:max-w-[425px]'>
					<div>Sample Template</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default MailDisplay;
