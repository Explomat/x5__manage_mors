//import { get, post } from '../utils/ajax';
//import { url } from '../config';
import morsConstants from '../constants/morsConstants';
//import { normalize } from 'normalizr';
//import uuid from '../utils/uuid';
//import toArray from 'lodash/toArray';

//import { error } from './appCreators';

import {
    getMockCollaborators
} from './mock';

export function getMors(){
	return dispatch => {
		dispatch({ type: morsConstants.MORS_GET_DATA });

		setTimeout(() => {
			const data = getMockCollaborators();
			dispatch({
				type: morsConstants.MORS_GET_DATA_SUCCESS,
				result: data
			});
		}, 300);
	};
}
