
import { makeRequest, validations,returnResults } from './config';
import { LOGIN } from './url';

export const UpLogin = (user, pass, code, loginType) => {
	// console.log(code);
	const params = new URLSearchParams();
	params.append('username', user);
	params.append('password', pass);
	params.append('code', code);
	params.append('loginType', loginType);
	return makeRequest(LOGIN.Login, params);

};
export const validation = (nbm) => {
	return validations(LOGIN.validation, nbm);
};
export const refreshToke = (tokne) => {
	const params = new URLSearchParams();
	params.append('token', tokne);
	return makeRequest(LOGIN.tokenUlr, params);
};
export const permissionsVerify = (tokne) => {
	const params = new URLSearchParams();
	return returnResults(LOGIN.permissionsVerify, params);
};