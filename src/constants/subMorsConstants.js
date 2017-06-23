import keyMirror from 'keymirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'SUB_MORS_GET_DATA'
]);

const constants = keyMirror({
	SUB_MORS_SET_SELECTED: null,
	SUB_MORS_SAVE: null
});

export default merge(remoteConstants, constants);
