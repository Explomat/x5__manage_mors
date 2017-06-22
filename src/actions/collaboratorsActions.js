//import { get, post } from '../utils/ajax';
//import { url } from '../config';
import collaboratorsConstants from '../constants/collaboratorsConstants';
//import { normalize } from 'normalizr';
//import uuid from '../utils/uuid';
//import toArray from 'lodash/toArray';

//import { error } from './appCreators';

import {
    getMockCollaborators
} from './mock';

export function getCollaborators(){
	return dispatch => {
		dispatch({ type: collaboratorsConstants.COLLABORATORS_GET_DATA });

		setTimeout(() => {
			const data = getMockCollaborators();
			dispatch({
				type: collaboratorsConstants.COLLABORATORS_GET_DATA_SUCCESS,
				result: data
			});
		}, 300);
	};
}
