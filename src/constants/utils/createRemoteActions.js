import merge from 'lodash/merge';

function createAction(action){
	return [action, `${action}_SUCCESS`, `${action}_FAILURE`].reduce((f, s) => {
		f[s] = s;
		return f;
	}, {});
}

export default function createRemoteActions(actions){
	if (!Array.isArray(actions)){
		throw new Error('Actions must be an array');
	}
	return actions.reduce((f, s) => merge(f, createAction(s)), {});
}
