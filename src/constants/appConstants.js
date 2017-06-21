import keyMirror from 'keymirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'APP_GET_ACCESS'
]);

const constants = keyMirror({
	'APP_ERROR_MESSAGE': null,
	'APP_INFO_MESSAGE': null
});

export default merge(remoteConstants, constants);
