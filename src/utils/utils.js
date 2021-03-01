import fp from "lodash/fp";
import { call, fork, put, takeLatest } from "redux-saga/effects";

const utils = {
  validate: fp.find(({ v, pred }) => !pred(v)),
  createAsyncSaga: (type, api) =>
    function* ({ payload }) {
      try {
        const res = yield call(api, payload);
        yield put({ type: `${type}_SUCCESS`, payload: res });
      } catch (e) {
        console.error(`[Saga-${type}] ERROR :: `, e);
        yield put({ type: `${type}_FAILURE`, payload: e });
      }
    },
  watchSaga: (action, api) =>
    fork(function* () {
      yield takeLatest(action, utils.createAsyncSaga(action.type, api));
    }),
  handleChangeTextField: fp.curry((setState, prop, e) => {
    setState((prev) => ({ ...prev, [prop]: e.target.value }));
  }),
};

export default utils;
