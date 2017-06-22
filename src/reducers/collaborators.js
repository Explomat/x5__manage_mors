import collaboratorsConstants from '../constants/collaboratorsConstants';

const initialState = {
	items: [],
	selectedItems: [],
	isLoading: false
};

export default function regions(state = initialState, action) {
	switch (action.type) {
		case collaboratorsConstants.COLLABORATORS_GET_DATA:
			return {
				...state,
				isLoading: true
			};
		case collaboratorsConstants.COLLABORATORS_GET_DATA_SUCCESS: {
			return {
				...state,
				...action.result,
				isLoading: false
			};
		}

		default:
			return state;
	}
}
