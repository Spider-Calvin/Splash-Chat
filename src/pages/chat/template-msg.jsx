import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { SendHorizonal } from 'lucide-react';
import { getService, API_ROUTES, stringInterpolator } from '@/api';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SingleTextArea } from '@/components/ui/singleTextArea';
import { Input } from '@/components/ui/input';

function TemplateMsg({
	templateParams,
	setTemplateParams,
	sendMessageFunc,
	selectedTemplate,
	setSelectedTemplate,
}) {
	const [message, setMessage] = useState('');
	const [paramsLength, setParamsLength] = useState(0);
	//This is set to 2 because we are not getting templates from api we have hardcoded it
	const [getTemplatesStatus, setGetTemplatesStatus] = useState(2);
	// eslint-disable-next-line no-unused-vars
	const [templates, setTemplates] = useState([]);
	const clearGetTemplatesStatus = () => {
		setTimeout(() => setGetTemplatesStatus(0), 2800);
	};

	const Templates = [
		{
			name: 'free_message',
			text: 'Hi {{1}},\n\nHope you are doing well, {{2}}, thanks',
			paramsLength: 2,
		},
	];

	const getTemplates = async () => {
		setGetTemplatesStatus(1);
		try {
			const searchPatientsRes = await getService(stringInterpolator(API_ROUTES.GET_TEMPLATES));

			if (searchPatientsRes.status === 1) {
				setGetTemplatesStatus(2);
			} else {
				setGetTemplatesStatus(-1);
				clearGetTemplatesStatus();
				console.log('ERROR', searchPatientsRes);
			}
		} catch (error) {
			setGetTemplatesStatus(-1);
			clearGetTemplatesStatus();
			console.log('ERROR', error);
		}
	};

	useEffect(() => {
		// getTemplates();
	}, []);

	const handleSelectedTemplate = templateId => {
		const templateObject = Templates.find(item => item.name === templateId);
		setSelectedTemplate(templateObject?.name);
		setMessage(templateObject?.text);
		setParamsLength(templateObject?.paramsLength);
		setTemplateParams(Array(templateObject?.paramsLength).fill(''));
	};

	const handleParamsChange = (index, value) => {
		const newValues = [...templateParams];
		newValues[index] = value;
		setTemplateParams(newValues);
	};

	useEffect(() => {
		if (templateParams.length > 0 && selectedTemplate) {
			const templateObject = Templates.find(item => item.name === selectedTemplate);

			const resultString = templateObject.text.replace(/{{\d+}}/g, match => {
				const placeholderIndex = parseInt(match.replace(/[{}]/g, '')) - 1;
				const value = templateParams[placeholderIndex];
				return value && value.length > 0 ? value : match;
			});

			setMessage(resultString);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [templateParams]);

	return (
		<div className='relative mx-auto flex h-full w-full max-w-4xl flex-col bg-background'>
			{getTemplatesStatus === 0 ? (
				<div className='flex flex-1 flex-col items-center justify-center'>
					<h4 className='p-4 font-medium text-muted-foreground'>Template Messages</h4>
					<Button onClick={getTemplates} size='sm'>
						Get Templates
					</Button>
				</div>
			) : null}

			{getTemplatesStatus === 1 ? (
				<div className='flex flex-1 flex-col items-center justify-center'>
					<h4 className='p-4 font-medium text-muted-foreground'>Getting Template Messages...</h4>
				</div>
			) : null}

			{getTemplatesStatus === -1 ? (
				<div className='flex flex-1 flex-col items-center justify-center'>
					<h4 className='p-4 font-medium text-destructive'>Getting Template Messages Failed</h4>
				</div>
			) : null}
			{getTemplatesStatus === 2 ? (
				<>
					<h4 className='p-4 font-medium text-muted-foreground'>Select Template Message</h4>
					<div className='p-4 pt-0'>
						<Select
							onValueChange={templateId => {
								handleSelectedTemplate(templateId);
							}}>
							<SelectTrigger className='text-muted-foreground'>
								<SelectValue placeholder='select template' />
							</SelectTrigger>
							<SelectContent className='text-muted-foreground'>
								{Templates?.map((item, i) => {
									return (
										<SelectItem key={i} value={item.name}>
											{item.name}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
					</div>
					<div className='p-4 pt-0'>
						<SingleTextArea
							className='flex-1 p-2 text-primary'
							placeholder={`Template Message...`}
							value={message}
						/>
					</div>
					<div className='ml-auto p-4 pt-0'>
						<Button
							onClick={() => {
								if (templateParams.length > 0 && templateParams.every(val => val.length > 0)) {
									sendMessageFunc();
								} else if (selectedTemplate && templateParams.length === 0) {
									sendMessageFunc();
								}
							}}>
							<div className='flex items-center justify-center gap-x-2'>
								Send Message
								<SendHorizonal className='h-3 w-3' />
							</div>
						</Button>
					</div>
					{paramsLength.length > 0 && (
						<p className='px-4 text-sm font-medium text-muted-foreground'>
							Please enter the Params
						</p>
					)}
					<div className='px-4'>
						{Array.from({ length: paramsLength }, () => 0)?.map((x, i) => {
							return (
								<Input
									key={i}
									onChange={e => handleParamsChange(i, e.target.value)}
									placeholder={`Params ${i + 1}`}
									className='mt-4'
								/>
							);
						})}
					</div>
				</>
			) : null}
		</div>
	);
}

export default TemplateMsg;
