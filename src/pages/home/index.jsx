import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import ChatDisplay from '../chat';
import ChatList from '../chats-list';
import AllPatientsChatList from '../all-patients-list';
import Notifications from '../notification';
import { useLocation } from 'react-router-dom';

function Index() {
	const defaultLayout = [40, 60];
	const location = useLocation();

	return (
		<div className='flex'>
			<ResizablePanelGroup direction='horizontal' className='h-full max-h-dvh items-stretch'>
				<ResizablePanel defaultSize={defaultLayout[0]} minSize={35} maxSize={50}>
					{location.pathname == '/notification' ? <Notifications /> : null}
					{location.pathname == '/' ? <ChatList /> : null}
					{location.pathname == '/allinbox' ? <AllPatientsChatList /> : null}
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={defaultLayout[1]}>
					<ChatDisplay />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}

export default Index;
