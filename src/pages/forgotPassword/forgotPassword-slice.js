export const START = 'forgotPassword/START';
export const SUCCESS = 'forgotPassword/SUCCESS';
export const ERROR = 'forgotPassword/ERROR';

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

reducer.getForgotPasswordStart = function (email) {
  return {
    type: START,
    payload: email,
  };
};

reducer.getForgotPasswordSuccess = function (data) {
  return {
    type: SUCCESS,
    payload: data,
  };
};

reducer.getForgotPasswordError = function (err) {
  return {
    type: ERROR,
    payload: err,
  };
};

export default reducer;
