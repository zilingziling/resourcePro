
import { makeRequest, validations } from './config';
import { Collect } from './url';

export const CollectList = (param) => {
	const params = new URLSearchParams();
	Object.keys(param).map(key => params.append(key, param[key]));
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(Collect.list, params);
};