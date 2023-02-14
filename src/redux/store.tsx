import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import filefolderReducer from "./reducer/filefolderReducer";
import { sagas } from "./action/sagas";
const rootReducer = combineReducers({ filefolder: filefolderReducer });
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(sagas);
export default store;
