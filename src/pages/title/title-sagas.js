import { put, takeLatest, call } from 'redux-saga/effects';
import { startDataAction, setDataAction, setErrorAction, START } from './title-slice';
import { getUserTransactionData, getRateData } from '../../api';

export function* watcherDataLoad() {
    yield takeLatest(START, getLandPageData);
}

function *getLandPageData(){
    try {
        const userTransactionData = yield getUserTransactionData()
        const rateData = yield getRateData()
        yield put(setDataAction({ ...userTransactionData.data.data,  ...rateData.data }))
    }catch (e){
        yield put(setErrorAction(e.response.data))
    }
}