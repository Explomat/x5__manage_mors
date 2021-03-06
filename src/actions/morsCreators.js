import { get } from '../utils/ajax';
import { url } from '../config';
import morsConstants from '../constants/morsConstants';
//import { normalize } from 'normalizr';
//import uuid from '../utils/uuid';
//import toArray from 'lodash/toArray';

import { error } from './appCreators';

// import {
//     getMockCollaborators
// } from './mock';

export function getMors(search, page){
	return dispatch => {
		dispatch({ type: morsConstants.MORS_GET_DATA });

		// setTimeout(() => {
		// 	const data = getMockCollaborators();
		// 	dispatch({
		// 		type: morsConstants.MORS_GET_DATA_SUCCESS,
		// 		result: data
		// 	});
		// }, 300);
		const path = url.createPath({
			server_name: 'manageMors',
			action_name: 'Collaborators',
			search: search || '',
			page: page || 0
		});
		get(path)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: morsConstants.MORS_GET_DATA_SUCCESS,
					result: data
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function saveMors(selectedItems){
	return {
		type: morsConstants.MORS_SAVE,
		selectedItems
	};
}
