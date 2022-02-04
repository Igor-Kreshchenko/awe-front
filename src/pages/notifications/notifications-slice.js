export const GET_NEW_MESSAGES = 'notifications/GET_NEW_MESSAGES';
export const READ_ALL_MESSAGES = 'notifications/READ_ALL_MESSAGES';
export const SET_USER_ID = 'notifications/SET_USER_ID';

const initialState = {
    userID: null,
    messages: [],
    isNew: false
}

export const notificationsReduser = (state = initialState, action) => {
    switch(action.type) {
        case GET_NEW_MESSAGES: {
            const newMessage = JSON.parse(action.payload)
            newMessage.key = state.messages.length
            return {
                ...state,
                messages: [ ...state.messages, newMessage ],
                isNew: true
            }
        }
        case READ_ALL_MESSAGES: {
            return {
                ... state,
                isNew: action.payload
            }
        }
        case SET_USER_ID: {
            return {
                ...state,
                userID: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export const setUserId = (data) => ({ type: SET_USER_ID, payload: data })
export const getNewMessage = (data) => ({ type: GET_NEW_MESSAGES, payload: data })
export const setIsNew = (data) => ({ type: READ_ALL_MESSAGES, payload: data })