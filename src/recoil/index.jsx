import { atom } from 'recoil';

const chatOpened = atom({
	key: 'chatOpened',
	default: {},
});

const agent = atom({
	key: 'agent',
	default: {
		name: '',
		email: '',
		role: '',
	},
});

const openedChatMessages = atom({
	key: 'openedChatMessages',
	default: [],
});

const allPatients = atom({
	key: 'allPatients',
	default: [],
});

const unReadChats = atom({
	key: 'unReadChats',
	default: [],
});

const recentChats = atom({
	key: 'recentChats',
	default: [],
});

const careData = atom({
	key: 'careData',
	default: {},
});

const cSick = atom({
	key: 'cSick',
	default: {},
});

const mentalData = atom({
	key: 'mentalData',
	default: {},
});

const dealsData = atom({
	key: 'dealsData',
	default: {},
});

const corporate = atom({
	key: 'corporate',
	default: {},
});

const loggedIn = atom({
	key: 'loggedIn',
	default: false,
});

const claimData = atom({
	key: 'claimData',
	default: false,
});

const uploadingImageUrl = atom({
	key: 'uploadingImageUrl',
	default: false,
});

const notification = atom({
	key: 'notification',
	default: [],
});

export {
	chatOpened,
	agent,
	openedChatMessages,
	uploadingImageUrl,
	allPatients,
	careData,
	cSick,
	mentalData,
	dealsData,
	corporate,
	loggedIn,
	claimData,
	unReadChats,
	recentChats,
	notification
};
