export const LOAD_CARDS_START = 'piggy/LOAD_CARDS_START'
export const SET_CARDS_SUCCESS = 'piggy/SET_CARDS_SUCCESS'
export const LOAD_CARDS_ERROR = 'piggy/LOAD_CARDS_ERROR'

export const LOAD_PIGGY_START = 'piggy/LOAD_PIGGY_START'
export const SET_PIGGY_SUCCESS = 'piggy/SET_PIGGY_SUCCESS'
export const LOAD_PIGGY_ERROR = 'piggy/LOAD_PIGGY_ERROR'

export const CHANGE_PERCENT_START = 'piggy/CHANGE_PERCENT_START'
export const CHANGE_PERCENT_SUCCESS = 'piggy/CHANGE_PERCENT_SUCCESS'
export const CHANGE_PERCENT_ERROR = 'piggy/CHANGE_PERCENT_ERROR'
export const CHANGE_PERCENT_STOP = 'piggy/CHANGE_PERCENT_STOP'

export const CREATE_PIGGY_START = 'piggy/CREATE_PIGGY_START'
export const CREATE_PIGGY_SUCCESS = 'piggy/CREATE_PIGGY_SUCCESS'
export const CREATE_PIGGY_ERROR = 'piggy/CREATE_PIGGY_ERROR'
export const CREATE_PIGGY_STOP = 'piggy/CREATE_PIGGY_STOP'

export const SEND_MONEY_TO_PIGGY_START = 'piggy/SEND_MONEY_TO_PIGGY_START'
export const SEND_MONEY_TO_CARD_START = 'piggy/SEND_MONEY_TO_CARD_START'
export const SEND_MONEY_SUCCESS = 'piggy/SEND_MONEY_SUCCESS'
export const SEND_MONEY_ERROR = 'piggy/SEND_MONEY_ERROR'
export const SEND_MONEY_STOP = 'piggy/SEND_MONEY_STOP'

const initialState = {
    cards: [],
    isLoadingCards: false,
    loadCardsError: null,

    selectedPiggy: {},
    isLoadingPiggy: false,
    loadPiggyError: null,

    isChangingPercent: false,
    changedPercentSuccess: false,
    changePercentError: null,

    isCreatingPiggy: false,
    createdPiggySuccess: false,
    createPiggyError: null,

    isSendingMoney: false,
    sendedMoneySuccess: false,
    sendMoneyError: null
}

export const piggyReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_CARDS_START: {
            return {
                ...state,
                isLoadingCards: true
            }
        }
        case SET_CARDS_SUCCESS: {
            return {
                ...state,
                isLoadingCards: false,
                cards: action.payload || []
            }
        }
        case LOAD_CARDS_ERROR: {
            return {
                ...state,
                isLoadingCards: false,
                loadCardsError: action.payload
            }            
        }
        case LOAD_PIGGY_START: {
            return {
                ...state,
                isLoadingPiggy: true,
            }
        }
        case SET_PIGGY_SUCCESS: {
            return {
                ...state,
                isLoadingPiggy: false,
                selectedPiggy: action.payload
            }
        }
        case LOAD_PIGGY_ERROR: {
            return {
                ...state,
                isLoadingPiggy: false,
                loadPiggyError: action.payload
            }
        }
        case CHANGE_PERCENT_START: {
            return {
                ...state,
                isChangingPercent: true,
            }
        }
        case CHANGE_PERCENT_SUCCESS: {
            return {
                ...state,
                isChangingPercent: false,
                changedPercentSuccess: true,
                changePercentError: null
            }
        }
        case CHANGE_PERCENT_ERROR: {
            return {
                ...state,
                isChangingPercent: false,
                changePercentError: action.payload
            }
        }
        case CHANGE_PERCENT_STOP: {
            return {
                ...state,
                changedPercentSuccess: false,
                changePercentError: null
            }
        }
        case CREATE_PIGGY_START: {
            return {
                ...state,
                isCreatingPiggy: true,
            }
        }
        case CREATE_PIGGY_SUCCESS: {
            return {
                ...state,
                isCreatingPiggy: false,
                createPiggyError: null,
                createdPiggySuccess: true
            }
        }
        case CREATE_PIGGY_STOP: {
            return {
                ...state,
                createdPiggySuccess: false,
                createPiggyError: null
            }
        }
        case CREATE_PIGGY_ERROR: {
            return {
                ...state,
                isCreatingPiggy: false,
                createPiggyError: action.payload
            }
        }
        case SEND_MONEY_TO_PIGGY_START: {
            return {
                ...state,
                isSendingMoney: true,
                sendedMoneySuccess: false
            }
        }
        case SEND_MONEY_TO_CARD_START: {
            return {
                ...state,
                isSendingMoney: true,
                sendedMoneySuccess: false
            }
        }
        case SEND_MONEY_SUCCESS: {
            return {
                ...state,
                isSendingMoney: false,
                sendMoneyError: null,
                sendedMoneySuccess: true
            }
        }
        case SEND_MONEY_ERROR: {
            return {
                ...state,
                isSendingMoney: false,
                sendMoneyError: action.payload
            }
        }
        case SEND_MONEY_STOP: {
            return {
                ...state,
                sendedMoneySuccess: false,
                sendMoneyError: null
            }
        }
        default: {
            return state
        }
    }
}

export const loadCardsAction = (data) => ({ type: LOAD_CARDS_START, payload: data })
export const setCardsAction = (data) => ({ type: SET_CARDS_SUCCESS, payload: data })
export const loadCardsErrorAction = (data) => ({ type: LOAD_CARDS_ERROR, payload: data })

export const loadPiggyAction = (data) => ({ type: LOAD_PIGGY_START, payload: data })
export const setPiggyAction = (data) => ({ type: SET_PIGGY_SUCCESS, payload: data })
export const loadPiggyErrorAction = (data) => ({ type: LOAD_PIGGY_ERROR, payload: data })

export const changePercentAction = (data) => ({ type: CHANGE_PERCENT_START, payload: data })
export const changePercentSuccessAction = () => ({ type: CHANGE_PERCENT_SUCCESS })
export const changePercentErrorAction = (data) => ({ type: CHANGE_PERCENT_ERROR, payload: data })
export const changePercentStopAction = () => ({ type: CHANGE_PERCENT_STOP })

export const createPiggyAction = (data) => ({ type: CREATE_PIGGY_START, payload: data })
export const createPiggySuccessAction = () => ({ type: CREATE_PIGGY_SUCCESS })
export const createPiggyErrorAction = (data) => ({ type: CREATE_PIGGY_ERROR, payload: data })
export const createPiggyStopAction = () => ({ type: CREATE_PIGGY_STOP })

export const sendMoneyToPiggyAction = (data) => ({ type: SEND_MONEY_TO_PIGGY_START, payload: data })
export const sendMoneyToCardAction = (data) => ({ type: SEND_MONEY_TO_CARD_START, payload: data })
export const sendMoneySuccessAction = () => ({ type: SEND_MONEY_SUCCESS })
export const sendMoneyErrorAction = (data) => ({ type: SEND_MONEY_ERROR, payload: data })
export const sendMoneyStopAction = () => ({ type: SEND_MONEY_STOP })