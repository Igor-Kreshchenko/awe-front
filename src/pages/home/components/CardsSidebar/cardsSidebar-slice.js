export const LOAD_CARDS = 'cards/LOAD';
export const LOAD_TRANSACTIONS = 'cards/LOAD_TRANSACTIONS';
export const SET_TRANSACTIONS = 'cards/SET_TRANSACTIONS';
export const SET_CARDS = 'cards/SET';
export const LOAD_SELECTED_CARD = 'cards/LOAD_SELECTED_CARD';
export const SET_SELECTED_CARD = 'cards/SET_SELECTED_CARD';
export const LOAD_CARDS_ERROR = 'cards/LOAD_ERROR';
export const CREATED_CARD = 'cards/CREATE';
export const CREATE_CARD_START = 'cards/CREATE_START';
export const CREATE_CARD_STOP = 'cards/CREATE_STOP';
export const CREATE_CARD_ERROR = 'cards/CREATE_ERROR';
export const CREATED_TRANSACTION = 'transactions/CREATE';
export const CREATE_TRANSACTION_START = 'transactions/CREATE_START';
export const CREATE_TRANSACTION_STOP = 'transactions/CREATE_STOP';
export const CREATE_TRANSACTION_ERROR = 'transactions/CREATE_ERROR';
export const SET_ERROR = 'cards/SET_ERROR';
export const START_CHARTS_DATA = 'cards/START_CHARTS_DATA';
export const SET_CHARTS_DATA = 'cards/SET_CHARTS_DATA';
export const START_GET_LOAN = 'cards/START_GET_LOAN';
export const SUCCESS_GET_LOAN = 'cards/SUCCESS_GET_LOAN';
export const STOP_GET_LOAN = 'cards/STOP_GET_LOAN';
export const ERROR_GET_LOAN = 'cards/ERROR_GET_LOAN';
export const SET_NEW_CREATED_CARD = 'cards/SET_NEW_CREATED_CARD';
export const GET_LOAN_LIST = 'cards/GET_LOAN_LIST';
export const PAY_LOAN = 'cards/PAY_LOAN';
export const SUCCESS_PAY_LOAN = 'cards/SUCCESS_PAY_LOAN';
export const UPDATE_LOAN_LIST = 'cards/UPDATE_LOAN_LIST';

const dataChart = {
    TotalSavings: 0,
    SavingsToday: 0,
    SavingsThisWeek: 0,
    SavingsThisMonth: 0,
    TotalExpenses: 0,
    ExpensesToday: 0,
    ExpensesThisWeek: 0,
    ExpensesThisMonth: 0,
    ExpensesDay: [],
    ExpensesWeek: [],
    ExpensesMonth: []
}

const initialState = {
    cards: [],
    selectedCard: {},
    selectedCardTransactions: [],
    newCreatedCard: {},
    isLoadingChartsData: false,
    chartsData: dataChart,
    isLoading: false,
    isCardCreating: false,
    creatingCardSuccess: false,
    isTransactionCreating: false,
    creatingTransactionSuccess: false,
    loadError: null,
    createCardError: null,
    createTransactionError: null,
    isGettingLoan: false,
    gettingLoanSucces: false,
    gettingLoanError: null,
    loanList: []
};

export const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CARDS:
            return {
                ...state,
                isLoadingCards: true
            };
        case LOAD_TRANSACTIONS:
            return {
                ...state,
                isLoadingCards: true
            };
        case SET_TRANSACTIONS:
            return {
                ...state,
                selectedCardTransactions: action.payload
            };
        case SET_SELECTED_CARD:
            return {
                ...state,
                isLoadingTransactions: false,
                selectedCard: action.payload
            }
        case SET_CARDS:
            return {
                ...state,
                isLoadingCards: false,
                cards: action.payload ? action.payload : []
            }
        case LOAD_SELECTED_CARD:
            return {
                ...state,
                isLoadingTransactions: true
            }
        case CREATE_CARD_START:
            return  {
                ...state,
                isCardCreating: true,
                createCardError: null
            }
        case CREATED_CARD:
            return {
                ...state,
                isCardCreating: false,
                creatingCardSuccess: true,
                createCardError: null
            }
        case SET_NEW_CREATED_CARD:
            return {
                ...state,
                newCreatedCard: action.payload
            }
        case CREATE_CARD_STOP:
            return {
                ...state,
                creatingCardSuccess: false,
                createCardError: null
            }
        case CREATE_TRANSACTION_START:
            return  {
                ...state,
                isTransactionCreating: true,
                createTransactionError: null
            }
        case CREATED_TRANSACTION:
            return {
                ...state,
                isTransactionCreating: false,
                creatingTransactionSuccess: true,
                createTransactionError: null
            }
        case CREATE_TRANSACTION_STOP:
            return {
                ...state,
                creatingTransactionSuccess: false,
                createTransactionError: null
            }
        case LOAD_CARDS_ERROR:
            return {
                ...state,
                isLoadingCards: false,
                isLoadingTransactions: false,
                loadError: action.payload
            };
        case CREATE_TRANSACTION_ERROR:
            return {
                ...state,
                isTransactionCreating: false,
                creatingTransactionSuccess: false,
                createTransactionError: action.payload
            };
        case CREATE_CARD_ERROR:
            return {
                ...state,
                isCardCreating: false,
                creatingCardSuccess: false,
                createCardError: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                createCardError: action.payload,
                createTransactionError: action.payload
            }
        case START_CHARTS_DATA:
            return {
                ...state,
                isLoadingChartsData: true,
            }
        case SET_CHARTS_DATA:
              return {
                  ...state,
                  chartsData: action.payload,
                  isLoadingChartsData: false
              }
        case START_GET_LOAN:
            return {
                ...state,
                isGettingLoan: true,
                gettingLoanError: null
            }
        case SUCCESS_GET_LOAN:
            return {
                ...state,
                isGettingLoan: false,
                gettingLoanSucces: true,
                cards: state.cards.map(card => card.ID == state.selectedCard.ID ? { ...card, Amount: card.Amount + action.payload.amount } : card),
                selectedCard: {
                    ...state.selectedCard,
                    Amount: state.selectedCard.Amount + action.payload.amount
                }
            }
        case UPDATE_LOAN_LIST: 
            return {
                ...state,
                loanList: [ ...state.loanList, action.payload ]
            }
        case STOP_GET_LOAN:
            return {
                ...state,
                gettingLoanSucces: false,
                gettingLoanError: null
            }
        case ERROR_GET_LOAN:
            return {
                ...state,
                gettingLoanError: action.payload
            }
        case GET_LOAN_LIST:
            return {
                ...state,
                loanList: action.payload ? action.payload : []
            }
        case PAY_LOAN: 
            return {
                ...state,
                loanList: state.loanList.map(loan => loan.ID == action.payload.loanID ? action.payload : loan)
            }
        case SUCCESS_PAY_LOAN:
            return {
                ...state,
                cards: state.cards.map(card => card.ID == state.selectedCard.ID ? { ...card, Amount: card.Amount - action.payload.amount } : card),
                selectedCard: {
                    ...state.selectedCard,
                    Amount: state.selectedCard.Amount - action.payload.amount
                }
            }
        default:
            return state;
    }
};

export const loadChartDataAction = () => ({ type: START_CHARTS_DATA })
export const setChartDataAction = (data) => ({ type: SET_CHARTS_DATA, payload: data })
export const loadCardsErrorAction = (data) => ({ type: LOAD_CARDS_ERROR, payload: data });
export const createCardsErrorAction = (data) => ({ type: CREATE_CARD_ERROR, payload: data });
export const createTransactionsErrorAction = (data) => ({ type: CREATE_TRANSACTION_ERROR, payload: data });
export const loadCardsAction = (data) => ({ type: LOAD_CARDS, payload: data });
export const loadTransactionsAction = (data) => ({ type: LOAD_TRANSACTIONS, payload: data });
export const setTransactionsAction = (data) => ({ type: SET_TRANSACTIONS, payload: data });
export const setCardsAction = (data) => ({ type: SET_CARDS, payload: data });
export const setSelectedCardAction = (data) => ({ type: SET_SELECTED_CARD, payload: data  });
export const loadSelectedCardAction = (data) => ({ type: LOAD_SELECTED_CARD, payload: data });
export const createCardStartAction = (data) => ({ type: CREATE_CARD_START, payload: data });
export const createdCardAction = () => ({ type: CREATED_CARD });
export const createCardStopAction = () => ({ type: CREATE_CARD_STOP });
export const createTransactionStartAction = (data) => ({ type: CREATE_TRANSACTION_START, payload: data });
export const createdTransactionAction = () => ({ type: CREATED_TRANSACTION });
export const createTransactionStopAction = () => ({ type: CREATE_TRANSACTION_STOP });
export const setErrorAction = (data) => ({ type: SET_ERROR, payload: data })
export const startGettingLoan = (data) => ({ type: START_GET_LOAN, payload: data });
export const stopGettingLoan = () => ({ type: STOP_GET_LOAN });
export const successGettingLoan = (data) => ({ type: SUCCESS_GET_LOAN, payload: data });
export const setLoanError = (data) => ({ type: ERROR_GET_LOAN, payload: data });
export const setNewCreatedCard = (data) => ({ type: SET_NEW_CREATED_CARD, payload: data });
export const loadLoanListAction = (data) => ({ type: GET_LOAN_LIST, payload: data });
export const updateLoanListAction = (data) => ({ type: UPDATE_LOAN_LIST, payload: data })
export const payLoanAction = (data) => ({ type: PAY_LOAN, payload: data });
export const successPayLoan = (data) => ({ type: SUCCESS_PAY_LOAN, payload: data })