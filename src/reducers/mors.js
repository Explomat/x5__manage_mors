import morsConstants from '../constants/morsConstants';

const initialState = {
	headerCols: [],
	items: [],
	selectedItems: [],
	pagesCount: 1,
	isLoading: false
};

export default function regions(state = initialState, action) {
	switch (action.type) {
		case morsConstants.MORS_GET_DATA:
			return {
				...state,
				isLoading: true
			};
		case morsConstants.MORS_GET_DATA_SUCCESS: {
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
