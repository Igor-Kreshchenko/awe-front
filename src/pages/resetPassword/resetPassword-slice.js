export const START = 'resetPassword/START';
export const SUCCESS = 'resetPassword/SUCCESS';
export const ERROR = 'resetPassword/ERROR';

const STATE = {
  loading: false,
  isSuccess: null,
  error: null,
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
        loading: false,
        isSuccess: action.payload,
        error: null
      };

    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

reducer.getResetPasswordStart = function (email) {
  return {
    type: START,
    payload: email,
  };
};

reducer.getResetPasswordSuccess = function (data) {
  return {
    type: SUCCESS,
    payload: data,
  };
};

reducer.getResetPasswordError = function (err) {
  return {
    type: ERROR,
    payload: err,
  };
};

export default reducer;
