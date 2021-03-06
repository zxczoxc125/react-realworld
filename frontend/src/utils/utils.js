import fp from "lodash/fp";
import { call, fork, put, takeLatest } from "redux-saga/effects";

const isDevelopment = fp.isEqual(process.env.NODE_ENV, "development");

export const EMAIL_MAX_LENGTH = 20;
export const USERNAME_MAX_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 20;

const utils = {
  log: isDevelopment ? console.log : fp.noop,
  error: isDevelopment ? console.error : fp.noop,
  validate: fp.find(({ v, pred }) => !pred(v)),
  createAsyncSaga: (type, api) =>
    function* ({ payload }) {
      try {
        const { data } = yield call(api, payload);

        yield put({
          type: `${type}_SUCCESS`,
          payload: data,
          orgPayload: payload,
        });
        utils.log(`✅ [Saga - ${type}] :: `, data);
      } catch (e) {
        const { errors } = e.response.data;

        utils.error(`❌ [Saga - ${type}] ERROR :: `, errors);
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
