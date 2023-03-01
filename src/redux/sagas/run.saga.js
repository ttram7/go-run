import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
// READ
function* fetchRuns() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // config allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/runs', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_RUN_LIST', payload: response.data });
  } catch (error) {
    console.log('Run list get request failed', error);
    alert('Something went wrong');
  }
}

function* addRun(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.post('/api/runs', action.payload, config);
    yield put({ type: 'FETCH_RUN_LIST'});
  } catch (error) {
    console.log('Add run failed', error);
    alert('Something went wrong');
  }
}

function* runSaga() {
  yield takeLatest('FETCH_RUN_LIST', fetchRuns);
  yield takeLatest('ADD_RUN', addRun);
}

export default runSaga;