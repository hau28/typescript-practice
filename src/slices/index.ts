import { all } from "redux-saga/effects";
import { shopSaga } from "./shopSlice";

export function* rootSaga() {
  yield all([shopSaga()]);
}
