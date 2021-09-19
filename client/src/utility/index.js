import _ from 'lodash';
import axios from 'axios';

import { mainUrl } from '../config';

export const makeCapitalCase = (text) => _.capitalize(text);

export const makeRequest = (token, endpoint, method = 'GET', data) => {
	const options = {
		url: `${mainUrl}/${endpoint}`,
		method,
	};

	if (token) {
		options.headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	if (data) {
		options.data = data;
	}

	return axios(options);
};

export const setUserToStorage = (user) => window.localStorage.setItem('user', JSON.stringify(user));

export const getUserFromStorage = () => JSON.parse(window.localStorage.getItem('user'));
