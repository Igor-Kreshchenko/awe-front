import { put, takeLatest } from '@redux-saga/core/effects';
import { getCardsByUserID } from '../../api';
import { changePiggyPercent, createPiggyWithData, getPiggyByCardID, sendMoneyToCard, sendMoneyToPiggy } from '../../api/piggyApi';
import { CHANGE_PERCENT_START, changePercentSuccessAction, changePercentErrorAction, loadCardsErrorAction, loadPiggyErrorAction, LOAD_CARDS_START, LOAD_PIGGY_START, setCardsAction, setPiggyAction, CREATE_PIGGY_START, createPiggySuccessAction, createPiggyErrorAction, SEND_MONEY_TO_CARD_START, SEND_MONEY_TO_PIGGY_START, sendMoneySuccessAction, sendMoneyErrorAction } from './piggyPage-slice';

export function* watchPiggy() {
    yield takeLatest(LOAD_CARDS_START, getAllCards)
    yield takeLatest(LOAD_PIGGY_START, getPiggy)
    yield takeLatest(CHANGE_PERCENT_START, changePercent)
    yield takeLatest(CREATE_PIGGY_START, createPiggy)
    yield takeLatest(SEND_MONEY_TO_CARD_START, sendToCard)
    yield takeLatest(SEND_MONEY_TO_PIGGY_START, sendToPiggy)
}

function* getAllCards(action) {
    try {
        const resCards = yield getCardsByUserID()
        yield put(setCardsAction(resCards.data.cards))
        if(resCards.data.cards.length) {
            const resPiggy = yield getPiggyByCardID(resCards.data.cards[ action.payload.index ].ID)
            yield put(setPiggyAction(resPiggy.data.piggy))
        }
    } catch(error) {
        yield put(loadCardsErrorAction(error.response))
    }
}

function* getPiggy(action) {
    try {
        const res = yield getPiggyByCardID(action.payload.cardID)
        yield put(setPiggyAction(res.data.piggy))
    } catch(error) {
        yield put(loadPiggyErrorAction(error.response))
    }
}

function* changePercent(action) {
    try {
        yield changePiggyPercent(action.payload)
        yield put(changePercentSuccessAction())
        const res2 = yield getPiggyByCardID(action.payload.cardID)
        yield put(setPiggyAction(res2.data.piggy))

    } catch(error) {
        yield put(changePercentErrorAction(error.response))
    }
}

function* createPiggy(action) {
    try {
        yield createPiggyWithData(action.payload)
        yield put(createPiggySuccessAction())
        const res = yield getPiggyByCardID(action.payload.cardID)
        yield put(setPiggyAction(res.data.piggy))
    } catch(error) {
        yield put(createPiggyErrorAction(error.response))
    }
}

function* sendToCard(action) {
    try {
        yield sendMoneyToCard(action.payload)
        yield put(sendMoneySuccessAction())
    } catch(error) {
        yield put(sendMoneyErrorAction(error.response))
    }
}

function* sendToPiggy(action) {
    try {
        yield sendMoneyToPiggy(action.payload)
        yield put(sendMoneySuccessAction())
    } catch(error) {
        yield put(sendMoneyErrorAction(error.response))
    }
}