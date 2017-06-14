import constants from '../constants';

function _pa(state = {
	id: null,
	isEdit: false,
	title: '',
	tasksHeader: {
		name: 'Наименование',
		unit: 'Ед. измерения',
		weight: 'Вес %',
		min: 'MIN',
		targ: 'targ',
		max: 'MAX',
		fact: 'ФАКТ',
		percent: '% выполнения',
		comment: 'Комментарий'
	},
	tasks: []
}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_ADD_TASK_SUCCESS: {
			const { task } = action;
			return {
				...state,
				tasks: state.tasks.concat(task.id)
			};
		}
		default:
			return state;
	}
}

export default function pas(state = {}, action) {
	switch (action.type) {
		case constants.ASSESSMENT_GET_DATA_SUCCESS: {
			return {
				...action.entities.pas
			};
		}
		
		case constants.ASSESSMENT_UPDATE_CALCS_IN_PA: {
			const { pa } = action;
			return {
				...state,
				[pa.id]: pa
			};
		}
		
		case constants.ASSESSMENT_ADD_TASK_SUCCESS: {
			const { paId } = action;
			return {
				...state,
				[paId]: _pa(state[paId], action)
			};
		}

		default:
			return state;
	}
}