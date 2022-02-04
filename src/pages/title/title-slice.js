export const START = 'landing-page/START';
export const SET_DATA = 'landing-page/SET_DATA';
export const ERROR = 'landing-page/ERROR';

const initialState = {
    data: null,
    isLoading: true,
    error: null
};

export const landingPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case SET_DATA:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const startDataAction = () => ({ type: START })
export const setDataAction = (data) => ({ type: SET_DATA, payload: data })
export const setErrorAction = (data) => ({ type: ERROR, payload: data })