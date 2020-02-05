
import { makeRequest, validations } from './config';
import { EducationInfo } from './url';

export const EducationInfoList = () => {
	const params = new URLSearchParams();
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(EducationInfo.list, params);
};
export const beforeAndNext = (param) => {
	const params = new URLSearchParams();
	Object.keys(param).map(key => params.append(key, param[key]));
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(EducationInfo.beforeAndNext, params);
};