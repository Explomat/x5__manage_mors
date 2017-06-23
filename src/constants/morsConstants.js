import keyMirror from 'keymirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'MORS_GET_DATA'
]);

const constants = keyMirror({
	MORS_SET_SELECTED: null,
	MORS_SAVE: null
});

export default merge(remoteConstants, constants);
