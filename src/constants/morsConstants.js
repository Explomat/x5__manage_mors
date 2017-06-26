import keyMirror from 'keymirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'MORS_GET_DATA'
]);

const constants = keyMirror({
	MORS_SAVE: null
});

export default merge(remoteConstants, constants);
