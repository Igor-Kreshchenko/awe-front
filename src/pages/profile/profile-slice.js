export const START = 'profile/START';
export const SUCCESS = 'profile/SUCCESS';
export const ERROR = 'profile/ERROR';
export const LOGOUT = 'profile/LOGOUT';

export const START_UPDATE = 'profile/START_UPDATE';
export const SUCCESS_UPDATE = 'profile/SUCCESS_UPDATE';
export const ERROR_UPDATE = 'profile/ERROR_UPDATE';

const STATE = {
  loading: null,
  auth: false,
  user: null,
  error: null,
  isUpdated: false,
};

function reducer(state = STATE, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        loading: true,
      };

    case SUCCESS:
      return {
        ...state,
        user: action.payload,
        auth: true,
        loading: false,
        error: null,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
        auth: false
      };

    case LOGOUT:
      return {
        ...state,
        auth: false,
        user: null
      }
    case START_UPDATE:
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };

    case SUCCESS_UPDATE:
      return {
        ...state,
        user: action.payload,
        auth: true,
        loading: false,
        error: null,
        isUpdated: true,
      };

    case ERROR_UPDATE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        auth: true,
        isUpdated: true,
      };
    default:
      return state;
  }
}

reducer.getProfileStart = function () {
  return {
    type: START,
  }
};

reducer.getProfileSuccess = function (user) {
  return {
    type: SUCCESS,
    payload: user,
  };
};

reducer.getProfileError = function (err) {
  return {
    type: ERROR,
    payload: err
  };
};

export const logoutUser = () => ({ type: LOGOUT });

reducer.updateProfileStart = function (user) {
  return {
    type: START_UPDATE,
    payload: user,
  }
};

reducer.updateProfileSuccess = function (user) {
  return {
    type: SUCCESS_UPDATE,
    payload: user,
  };
};

reducer.updateProfileError = function (err) {
  return {
    type: ERROR_UPDATE,
    payload: err
  };
};

export default reducer;
