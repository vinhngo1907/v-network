import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // từ index.js bạn tạo

const makeStore = () => createStore(rootReducer, applyMiddleware(thunk));

export const wrapper = createWrapper(makeStore);
