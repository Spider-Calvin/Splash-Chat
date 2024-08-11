const baseUrl = import.meta.env.VITE_APP_APIURL;

async function postService(url = '', body = {}) {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	return await response.json();
}

async function postFormData(url = '', body) {
	const response = await fetch(`${'https://api.circle.care/v1'}${url}`.replace(/\+/g, '%2b'), {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: body,
	});
	return await response.json();
}

async function getService(url = '') {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
	return await response.json();
}

async function getTokenService(url = '', token = '') {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
	return await response.json();
}

async function putService(url = '', body = {}) {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	return await response.json();
}

async function patchService(url = '', body = {}) {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'PATCH',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	return await response.json();
}

async function patchTokenService(url = '', body = {}, token = '') {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'PATCH',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	return await response.json();
}

async function putTokenService(url = '', body = {}, token = '') {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	return await response.json();
}

async function deleteService(url = '', body = {}) {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	return await response.json();
}

async function deleteTokenService(url = '', body = {}, token = '') {
	const response = await fetch(`${baseUrl}${url}`.replace(/\+/g, '%2b'), {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body),
	});
	return await response.json();
}

const stringInterpolator = (stringToReplace, data) => {
	return stringToReplace.replace(
		/{\w+}/g,
		placeholder => data[placeholder.substring(1, placeholder.length - 1)] || placeholder,
	);
};

const API_ROUTES = {
	SEND_OTP: `/v2/agent/login`,
	VERIFY_OTP: `/v2/agent/verifyotp`,
	SEND_TEXT_MSG: `/v2/message/agent`,
	GET_ALL_PATIENTS: `/v2/agent/customers/{agent}`,
	GET_RECENT_CHATS: `/v2/message/recent/{agent}`,
	GET_UNREAD_CHATS: `/v2/message/unread/{agent}`,
	GET_ROOM_MSGS: `/v2/messages/room/{roomId}`,
	SYNC_DATA: `/v2/sync/agent/{agent}`,
	IMAGE_UPLOAD: `/misc/upload?mobile=wacom`,
	GET_NOTIFICATION: `/v2/notifications/{agent}`,
	PATCH_NOTIFICATION: `/v2/notifications/read/{agent}`,
	GET_ALL_AGENTS: `/v2/all/agents`,
	CREATE_AGENT: `/v2/agent/create`,
	SEARCH_PATIENTS: `/v2/customers/search?searchterm={term}`,
	GET_ALL_NOTIFICATION: `/v2/all/notifications/{agent}`,
	GET_TEMPLATES: `/v2/templates/get/all`,
};

const environment = import.meta.env.VITE_APP_ENVIRON;
const corporateId = sessionStorage.getItem('corporateid');

export {
	getService,
	postService,
	putService,
	deleteService,
	patchService,
	API_ROUTES,
	stringInterpolator,
	putTokenService,
	patchTokenService,
	getTokenService,
	deleteTokenService,
	postFormData,
	baseUrl,
	environment,
	corporateId,
};
