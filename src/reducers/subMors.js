import subMorsConstants from '../constants/subMorsConstants';

const initialState = {
	headerCols: [],
	items: [],
	selectedItems: [],
	pagesCount: 1,
	isLoading: false
};

export default function regions(state = initialState, action) {
	switch (action.type) {
		case subMorsConstants.SUB_MORS_GET_DATA:
			return {
				...state,
				isLoading: true
			};
		case subMorsConstants.SUB_MORS_GET_DATA_SUCCESS: {
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
