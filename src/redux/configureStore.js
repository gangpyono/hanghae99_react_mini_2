import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import User from './modules/user';
import Post from './modules/post';
import image from './modules/image';

export const history = createBrowserHistory(); // hsitory 객체생성

const rootReducer = combineReducers({
  user: User, //  필요시 리듀서추가
  post: Post,
  image: image,
  router: connectRouter(history), // 라우터와 히스토리가 연결된다.
});

const middlewares = [thunk.withExtraArgument({ history: history })]; // 필요시 미들웨어 추가

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === 'development') {
  const { logger } = require('redux-logger'); // require를 사용해서 if문안에서만 불러올수있게만듬(패키지 가져오기)
  middlewares.push(logger);
}

// redux devTools설정
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // 브라우저일떄만 작동시키기 위함
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

//미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

//스토어 만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store(); // 실행된후 만들어진 스토어를 export.
