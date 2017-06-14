//import { get, post } from '../utils/ajax';
//import { url } from '../config';
import constants from '../constants';
import { normalize } from 'normalizr';
import uuid from '../utils/uuid';
//import toArray from 'lodash/toArray';

//import { error } from './appCreators';
//import queryString from 'query-string';

import {
	getMockAssessment
} from './mock';
import assessmentSchema from '../schemas';

export function getAssessment(){
	return dispatch => {
		dispatch({ type: constants.ASSESSMENT_GET_DATA });
		
		setTimeout(() => {
			const data = getMockAssessment();
			dispatch({
				type: constants.ASSESSMENT_GET_DATA_SUCCESS,
				...normalize(data, assessmentSchema)
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

export function addTask(paId, task){
	return (dispatch, getState) => {
		/*const path = url.createPath({
			server_name: 'assessment',
			action_name: 'AddTask'
		});
		post(path, JSON.stringify({ task, pa_id: paId }))
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				const pa = getState().pas[paId];
				dispatch({
					type: constants.ASSESSMENT_UPDATE_CALCS_IN_PA,
					pa: {
						...pa,
						calcs: data.calcs
					}
				});
				
				dispatch({
					type: constants.ASSESSMENT_ADD_TASK_SUCCESS,
					paId,
					task: data.task
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
		setTimeout(() => {
			const pa = getState().pas[paId];
			dispatch({
				type: constants.ASSESSMENT_UPDATE_CALCS_IN_PA,
				pa: {
					...pa,
					calcs: []
				}
			});
			
			dispatch({
				type: constants.ASSESSMENT_ADD_TASK_SUCCESS,
				paId,
				task: {
					...task,
					id: uuid(),
					percent: 1000
				}
			});
		}, 300);
	};
}

export function editTask(paId, task){
	return (dispatch, getState) => {
		/*const path = url.createPath({
			server_name: 'assessment',
			action_name: 'EditTask'
		});
		post(path, JSON.stringify({ task, pa_id: paId }))
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				const pa = getState().pas[paId];
				dispatch({
					type: constants.ASSESSMENT_UPDATE_CALCS_IN_PA,
					pa: {
						...pa,
						calcs: data.calcs
					}
				});
				
				dispatch({
					type: constants.ASSESSMENT_EDIT_TASK_SUCCESS,
					paId,
					task: data.task
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
		setTimeout(() => {
			const pa = getState().pas[paId];
			dispatch({
				type: constants.ASSESSMENT_UPDATE_CALCS_IN_PA,
				pa: {
					...pa,
					calcs: []
				}
			});
			
			dispatch({
				type: constants.ASSESSMENT_EDIT_TASK_SUCCESS,
				paId,
				task
			});
		}, 300);
	};
}

export function removeTasks(paId){
	return (dispatch, getState) => {
		setTimeout(() => {
			const pa = getState().pas[paId];
			dispatch({
				type: constants.ASSESSMENT_UPDATE_CALCS_IN_PA,
				pa: {
					...pa,
					calcs: []
				}
			});
			dispatch({
				type: constants.ASSESSMENT_REMOVE_TASKS_SUCCESS,
				paId
			});
		}, 300);
	
		
		/*const path = url.createPath({
			server_name: 'assessment',
			action_name: 'RemoveTasks'
		});
		const { tasks } = getState();
		const checkedTasks = toArray(tasks).filter(t => t.checked).map(t => {
			return {
				...t,
				isRemoved: true
			};
		});
		
		post(path, JSON.stringify({ pa_id: paId, tasks: checkedTasks }))
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				const pa = getState().pas[paId];
				dispatch({
					type: constants.ASSESSMENT_UPDATE_CALCS_IN_PA,
					pa: {
						...pa,
						calcs: data.calcs
					}
				});
				dispatch({
					type: constants.ASSESSMENT_REMOVE_TASKS_SUCCESS,
					removedTasks: checkedTasks.reduce((pv, cv) => {
						pv[cv.id] = cv;
						return pv;
					}, {})
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
	};
}

export function activateTest(testId){
	return (dispatch, getState) => {
		setTimeout(() => {
			const { tests } = getState();
			dispatch({
				type: constants.ASSESSMENT_ACTIVATE_TEST_SUCCESS,
				test: {
					...tests[testId],
					isAssignTest: true,
					message: 'Тест назначен. Для его прохождения перейдите по ссылке, отправленной вам на почту.'
				}
			});
		}, 300);
		/*const path = url.createPath({
			server_name: 'assessment',
			action_name: 'ActivateTest'
		});
		post(path, JSON.stringify({ test_id: testId }))
		.then(resp => JSON.parse(resp))
		.then(data => {
			if (data.error){
				dispatch(error(data.error));
			} else {
				dispatch({
					type: constants.ASSESSMENT_ACTIVATE_TEST_SUCCESS,
					test: data.test
				});
			}
		})
		.catch(e => {
			dispatch(error(e.message));
		});*/
	};
}

export function toggleSelectTask(taskId, val){
	return {
		type: constants.ASSESSMENT_TOGGLE_SELECT_TASK,
		taskId,
		val
	};
}