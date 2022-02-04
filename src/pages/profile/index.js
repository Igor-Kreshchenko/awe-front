import profileReducer from './profile-slice';
import { watchGetProfile, watchUpdateProfile, watchLogout } from './profile-sagas';
import Profile from './profile';

export { profileReducer, watchGetProfile, watchUpdateProfile, watchLogout }
export { logoutUser } from './profile-slice'

export default Profile;