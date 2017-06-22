//import { get, post } from '../utils/ajax';
//import { url } from '../config';
import subMorsConstants from '../constants/subMorsConstants';
//import { normalize } from 'normalizr';
//import uuid from '../utils/uuid';
//import toArray from 'lodash/toArray';

//import { error } from './appCreators';

import {
    getMockCollaborators
} from './mock';

export function getSubMors(){
	return dispatch => {
		dispatch({ type: subMorsConstants.SUB_MORS_GET_DATA });

		setTimeout(() => {
			const data = getMockCollaborators();
			dispatch({
				type: subMorsConstants.SUB_MORS_GET_DATA_SUCCESS,
				result: data
			});
		}, 300);
	};
}
