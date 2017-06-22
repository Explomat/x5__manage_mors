import keyMirror from 'keymirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'COLLABORATORS_GET_DATA'
]);

const constants = keyMirror({
	COLLABORATORS_SET_SELECTED: null
});

export default merge(remoteConstants, constants);
