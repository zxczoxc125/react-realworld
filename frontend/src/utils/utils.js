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
        const { errors } = e.response.data;
        console.error(`[Saga - ${type}] ERROR :: `, errors);
        yield put({
          type: `${type}_FAILURE`,
          payload: {
            errors: fp.pipe(
              fp.keys,
              fp.map((k) => `${k} ${errors[k]}`),
              fp.join("\n")
            )(errors),
          },
        });
      }
    },
  watchSaga: (type, api) =>
    fork(function* () {
      yield takeLatest(type, utils.createAsyncSaga(type, api));
    }),
  handleChangeTextField: fp.curry((setState, prop, e) => {
    setState((prev) => ({ ...prev, [prop]: e.target.value }));
  }),
};

export default utils;