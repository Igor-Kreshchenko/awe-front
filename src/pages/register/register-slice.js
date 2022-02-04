export const START = 'register/START';
export const SUCCESS = 'register/SUCCESS';
export const ERROR = 'register/ERROR';

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

reducer.getRegisterStart = function (user) {
  return {
    type: START,
    payload: user,
  };
};

reducer.getRegisterSuccess = function (data) {
  return {
    type: SUCCESS,
    payload: data,
  };
};

reducer.getRegisterError = function (err) {
  return {
    type: ERROR,
    payload: err,
  };
};

export default reducer;
