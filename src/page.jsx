import React from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';

import Mail from '@/components/view/mail';
import { accounts, mails } from './data';

export default function MailPage() {
	const defaultLayout = [20, 40, 40];
	const defaultCollapsed = false;

	return (
		<div className='flex-col md:flex'>
			<Mail
				accounts={accounts}
				mails={mails}
				defaultLayout={defaultLayout}
				defaultCollapsed={defaultCollapsed}
				navCollapsedSize={4}
			/>
		</div>
	);
}
