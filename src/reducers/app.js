import appConstants from '../constants/appConstants';
import { setSuccess, setFailure } from './utils/setState';

export default function app(state = {
	title: '',
	access: true,
	isFetching: false,
	errorMessage: null,
	infoMessage: null
}, action) {
	switch (action.type) {
		case appConstants.APP_GET_ACCESS:
			return {
				...state,
				isFetching: true
			};
		case appConstants.APP_GET_ACCESS_FAILURE:
			return setFailure(state, action.error, 'error', 'isFetching');
		case appConstants.APP_GET_ACCESS_SUCCESS:
			return setSuccess(state, action.response, 'error', 'isFetching');

		case appConstants.APP_ERROR_MESSAGE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.errorMessage
			};
		case appConstants.APP_INFO_MESSAGE:
			return {
				...state,
				isFetching: false,
				infoMessage: action.infoMessage
			};

		default:
			return state;
	}
}
