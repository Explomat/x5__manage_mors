import keyMirror from 'keymirror';
import createRemoteActions from './utils/createRemoteActions';
import merge from 'lodash/merge';

const remoteConstants = createRemoteActions([
	'REGIONS_GET_DATA',
	'REGIONS_GET_REGION'
]);

const constants = keyMirror({
	REGIONS_REMOVE_REGION_FROM_STORE: null
});

export default merge(remoteConstants, constants);
