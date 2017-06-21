//import { get } from '../utils/ajax';
//import { url } from '../config';
import appConstants from '../constants/appConstants';

export function getAccess(){
	return dispatch => {
		dispatch({ type: appConstants.APP_GET_ACCESS });

		setTimeout(() => {
			dispatch({
				type: appConstants.APP_GET_ACCESS_SUCCESS,
				response: { access: true }
			});
		}, 300);
		/*const path = url.createPath({ server_name: 'assessment', action_name: 'Access' });
		get(path)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({ type: constants.APP_GET_ACCESS_SUCCESS, response: data });
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
	};
}

export function error(errorMessage){
	return {
		type: appConstants.APP_ERROR_MESSAGE,
		errorMessage
	};
}

export function info(infoMessage){
	return {
		type: appConstants.APP_INFO_MESSAGE,
		infoMessage
	};
}
