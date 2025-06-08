// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // combineReducers hoặc index.js

const makeStore = () => createStore(rootReducer, applyMiddleware(thunk));

export const wrapper = createWrapper(makeStore, { debug: false });