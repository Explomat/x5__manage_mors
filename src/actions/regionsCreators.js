import { get, put } from '../utils/ajax';
import { url } from '../config';
import { push } from 'react-router-redux';
import regionsConstants from '../constants/regionsConstants';
//import { normalize } from 'normalizr';
//import uuid from '../utils/uuid';
//import toArray from 'lodash/toArray';

import { error } from './appCreators';
//import queryString from 'query-string';

// import {
// 	getMockRegions,
// 	getMockRegion
// } from './mock';
//import regionsSchema from '../schemas';

export function getRegions(search, page){
	return dispatch => {
		dispatch({ type: regionsConstants.REGIONS_GET_DATA });

		// setTimeout(() => {
		// 	const data = getMockRegions();
		// 	dispatch({
		// 		type: regionsConstants.REGIONS_GET_DATA_SUCCESS,
		// 		result: data
		// 	});
		// }, 300);

		const path = url.createPath({
			server_name: 'manageMors',
			action_name: 'Regions',
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
					type: regionsConstants.REGIONS_GET_DATA_SUCCESS,
					result: data
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function getRegionsOnScroll(search, page){
	return dispatch => {
		dispatch({ type: regionsConstants.REGIONS_GET_DATA_ON_SCROLL });

		const path = url.createPath({
			server_name: 'manageMors',
			action_name: 'Regions',
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
					type: regionsConstants.REGIONS_GET_DATA_ON_SCROLL_SUCCESS,
					result: data
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function getRegion(regionId){
	return dispatch => {
		dispatch({ type: regionsConstants.REGIONS_GET_REGION });

		// setTimeout(() => {
		// 	const data = getMockRegion(regionId);
		// 	dispatch({
		// 		type: regionsConstants.REGIONS_GET_REGION_SUCCESS,
		// 		result: data
		// 	});
		// }, 300);

		const path = url.createPath({
			server_name: 'manageMors',
			action_name: 'Regions',
			region_id: regionId
		});
		get(path)
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: regionsConstants.REGIONS_GET_REGION_SUCCESS,
					result: data
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}

export function removeRegionFromStore(){
	return {
		type: regionsConstants.REGIONS_REMOVE_REGION_FROM_STORE
	};
}

export function setAlternateDate(date){
	return {
		type: regionsConstants.REGIONS_SET_ALTERNATE_DATE,
		date
	};
}

export function setRegionsSearchValue(value){
	return {
		type: regionsConstants.REGIONS_SET_SEARCH_VALUE,
		value
	};
}

export function saveRegion(){
	return (dispatch, getState) => {
		dispatch({ type: regionsConstants.REGIONS_SAVE_REGION });

		// setTimeout(() => {
		// 	dispatch(push('/home/regions'));
		// }, 300);
		const state = getState();

		const path = url.createPath({
			server_name: 'manageMors',
			action_name: 'Regions',
			region_id: state.region.id
		});
		put(path, JSON.stringify(state.region))
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch(push('/home/regions'));
				// dispatch({
				// 	type: regionsConstants.REGIONS_SAVE_REGION_SUCCESS,
				// 	result: data
				// });
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});
	};
}
