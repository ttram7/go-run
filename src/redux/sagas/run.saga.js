import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
// READ
function* fetchRecentActivity() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/runs', config);
    yield put({ type: 'SET_RECENT_ACTIVITY', payload: response.data });
  } catch (error) {
    console.log('Run list get request failed', error);
    alert('Something went wrong');
  }
}

function* fetchWeeklyRuns() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/runs/weekly', config);
    yield put({ type: 'SET_WEEKLY_RUN_LIST', payload: response.data });
  } catch (error) {
    console.log('Run list get request failed', error);
    alert('Something went wrong');
  }
}

// function* fetchLastWeekRuns() {
//   try {
//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//     };
//     const response = yield axios.get('/api/runs/last-week', config);
//     yield put({ type: 'SET_LAST_WEEK_RUN_LIST', payload: response.data });
//   } catch (error) {
//     console.log('Run list get request failed', error);
//     alert('Something went wrong');
//   }
// }

function* fetchMonthlyRuns() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/runs/monthly', config);
    yield put({ type: 'SET_MONTHLY_RUN_LIST', payload: response.data });
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
    yield put({ type: 'FETCH_RECENT_ACTIVITY'});
    yield put({ type: 'FETCH_WEEKLY_RUN_LIST'});
  } catch (error) {
    console.log('Add run failed', error);
    alert('Something went wrong');
  }
}

function* deleteRun(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.delete(`/api/runs/${action.payload}`, config);
    yield put({ type: 'FETCH_RECENT_ACTIVITY'});
    yield put({ type: 'FETCH_WEEKLY_RUN_LIST'});
    yield put({ type: 'FETCH_MONTHLY_RUN_LIST'});
  } catch (error) {
    console.log('Delete run failed', error);
    alert('Something went wrong');
  }
}

function* updateRun(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('in updateRun', action.payload, action.payload.id)
    const response = yield axios.put(`/api/runs/${action.payload.id}`, action.payload, config)
      console.log('put request success');
    yield put({ type: 'FETCH_RECENT_ACTIVITY'});
    yield put({ type: 'FETCH_WEEKLY_RUN_LIST'});
    yield put({ type: 'FETCH_MONTHLY_RUN_LIST'});
  } catch (error) {
    console.log('Set edit run failed', error);
    alert('Something went wrong');
  }
}


function* runSaga() {
  yield takeLatest('FETCH_RECENT_ACTIVITY', fetchRecentActivity);
  yield takeLatest('ADD_RUN', addRun);
  yield takeLatest('DELETE_RUN', deleteRun);
  yield takeLatest('UPDATE_RUN', updateRun);
  // yield takeLatest('FETCH_LAST_WEEK_RUN_LIST', fetchLastWeekRuns);
  yield takeLatest('FETCH_WEEKLY_RUN_LIST', fetchWeeklyRuns);
  yield takeLatest('FETCH_MONTHLY_RUN_LIST', fetchMonthlyRuns);
}

export default runSaga;