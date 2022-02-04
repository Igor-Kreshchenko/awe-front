import { call, put, take, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { getNewMessage, READ_ALL_MESSAGES, setIsNew, SET_USER_ID } from './notifications-slice';
import { eventChannel } from '@redux-saga/core'

export function* watchNotifications() {
    yield takeEvery(SET_USER_ID, createWSChannel);
}

function* createWSChannel(action) {
    const ws = new WebSocket('ws://localhost:8080/ws/'+action.payload);
    const channel = yield call(createEventChannel, ws);
    while (true) {
      const message = yield take(channel);
      yield put(getNewMessage(message));
      yield put(setIsNew(true))
    }
}

function* createEventChannel(ws) {
  return eventChannel(emit => {
    ws.onmessage = function(message){ emit(message.data) } ;
    return () => {
      ws.close();
    };
  });
}
