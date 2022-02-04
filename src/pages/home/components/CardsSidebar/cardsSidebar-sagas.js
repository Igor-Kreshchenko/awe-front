import { takeLatest, put, call } from 'redux-saga/effects';
import { LOAD_CARDS, LOAD_SELECTED_CARD, CREATE_TRANSACTION_START, CREATE_CARD_START, START_CHARTS_DATA, START_GET_LOAN, PAY_LOAN,
    errorAction, setCardsAction, setSelectedCardAction, loadSelectedCardAction,
    createdCardAction, createdTransactionAction, createCardsErrorAction,
    createTransactionsErrorAction, setChartDataAction, loadCardsErrorAction, loadChartDataAction,
    successGettingLoan, setLoanError, setNewCreatedCard, loadLoanListAction, updateLoanListAction, payLoanAction, successPayLoan, LOAD_TRANSACTIONS, setTransactionsAction } from './cardsSidebar-slice';
import { getCardsByUserID, createCards, createTransactions, loadChartsData, getLoanApi, getLoanList, updateLoan, getLoanByID, getTransactionsByCardID } from '../../../../api';

export function* watchCards() {
    yield takeLatest(LOAD_CARDS, getCards);
    yield takeLatest(LOAD_TRANSACTIONS, getTransactions);
    yield takeLatest(LOAD_SELECTED_CARD, setCard);
    yield takeLatest(CREATE_CARD_START, createCard);
    yield takeLatest(CREATE_TRANSACTION_START, createTransaction);
    yield takeLatest(START_GET_LOAN, getLoan);
    yield takeLatest(PAY_LOAN, createPayment);
}

function* getCards(action) {
    try {
        const res = yield getCardsByUserID();
        yield put(setCardsAction(res.data.cards));
        if(res.data.cards.length)  {
            yield put(setSelectedCardAction(res.data.cards[ action.payload.indx ]))
            yield put(loadChartDataAction())
            const response = yield loadChartsData({ cardID: res.data.cards[ action.payload.indx ].ID })
            yield put(setChartDataAction(response.data.data))
            const loan = yield getLoanList({ cardID: res.data.cards[ action.payload.indx ].ID })
            yield put(loadLoanListAction(loan.data.data))
        }
    } catch (error) {
        yield put(loadCardsErrorAction(error.response));
    }
}

function* getTransactions(action) {
    try {
        const res = yield getTransactionsByCardID(action.payload);
        yield put(setTransactionsAction(res.data.transactions));
    } catch (error) {
        yield put(loadCardsErrorAction(error.response));
    }
}

function *setCard(action) {
    try {
        const card = yield action.payload.cards.find((el, index)=> index === action.payload.index )
        yield put(setSelectedCardAction(card))
        yield put(loadChartDataAction())
        const response = yield loadChartsData({ cardID: card.ID })
        yield put(setChartDataAction(response.data.data))
        const loan = yield getLoanList({ cardID: card.ID })
        yield put(loadLoanListAction(loan.data.data))
    }catch (error){
        yield put(loadCardsErrorAction(error.response));
    }
}

function* createCard(action) {
    try {
        const res = yield createCards(action.payload)
        yield put(setNewCreatedCard(res.data.card))
        yield put(createdCardAction())
    } catch (error) {
        yield put(createCardsErrorAction(error.response));
    }
}

function* createTransaction(action) {
    try {
        yield createTransactions(action.payload)
        yield put(createdTransactionAction())
    } catch (error) {
        yield put(createTransactionsErrorAction(error.response));
    }
}

function* getLoan(action) {
    try {
        const res = yield getLoanApi(action.payload)
        yield put(successGettingLoan(action.payload))
        yield put(updateLoanListAction(res.data.data))
    } catch (error) {
        yield put(setLoanError(error.response))
    }
}

function* createPayment(action) {
    try {
        yield updateLoan(action.payload)
        yield put(successPayLoan(action.payload))
        const loan = yield getLoanList({ cardID: action.payload.cardID })
        yield put(loadLoanListAction(loan.data.data))
    } catch (error) {
        yield put(setLoanError(error.response))
    }
}