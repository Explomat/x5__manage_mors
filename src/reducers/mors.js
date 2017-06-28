import morsConstants from '../constants/morsConstants';

const initialState = {
	headerCols: [],
	items: [],
	selectedItems: [],
	page: 0,
	pagesCount: 1,
	isFetching: true
};

export default function regions(state = initialState, action) {
	switch (action.type) {
		case morsConstants.MORS_GET_DATA:
			return {
				...state,
				isFetching: true
			};
		case morsConstants.MORS_GET_DATA_SUCCESS: {
			return {
				...state,
				...action.result,
				isFetching: false
			};
		}

		case morsConstants.MORS_SAVE: {
			return {
				...state,
				selectedItems: action.selectedItems
			};
		}

		default:
			return state;
	}
}
