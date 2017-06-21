//import { get, post } from '../utils/ajax';
//import { url } from '../config';
import regionsConstants from '../constants/regionsConstants';
//import { normalize } from 'normalizr';
//import uuid from '../utils/uuid';
//import toArray from 'lodash/toArray';

//import { error } from './appCreators';
//import queryString from 'query-string';

import {
	getMockRegions,
	getMockRegion
} from './mock';
//import regionsSchema from '../schemas';

export function getRegions(){
	return dispatch => {
		dispatch({ type: regionsConstants.REGIONS_GET_DATA });

		setTimeout(() => {
			const data = getMockRegions();
			dispatch({
				type: regionsConstants.REGIONS_GET_DATA_SUCCESS,
				result: data
			});
		}, 300);

		/*const uriParams = queryString.parse(location.search);
		const path = url.createPath({
			server_name: 'assessment',
			action_name: 'Assessment',
			pa_id: uriParams.pa_id
		});
		get(path)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: constants.ASSESSMENT_GET_DATA_SUCCESS,
					...normalize(data, assessmentSchema)
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
	};
}

export function getRegion(regionId){
	return dispatch => {
		dispatch({ type: regionsConstants.REGIONS_GET_REGION });

		setTimeout(() => {
			const data = getMockRegion(regionId);
			dispatch({
				type: regionsConstants.REGIONS_GET_REGION_SUCCESS,
				result: data
			});
		}, 300);
	};
}

export function removeRegionFromStore(){
	return {
		type: regionsConstants.REGIONS_REMOVE_REGION_FROM_STORE
	};
}
