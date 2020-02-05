// import createHistory from 'history';
const createHistory = require("history").createBrowserHistory
const history = createHistory({ basename: '/' });


// ATTENTION PLEASE ! tabIndex is based on below
// const router = ['/', '/monitor', '/energy', '/device', '/plan', '/platform', '/login', '/404'];

const pushByIndex = (tabIndex) => {
	console.log(history);

};
const replace = (path) => {
	history.replace(path);
};

export default {
	history,
	replace,
	// pushByIndex
};