import { all } from "redux-saga/effects";
import userSaga from "./user/userSaga";
import articleSaga from "./article/articleSaga";

export default function* rootSaga() {
  yield all([userSaga(), articleSaga()]);
}
