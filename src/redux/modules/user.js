import { createAction, handleActions } from 'redux-actions'; // 액션,리듀서를 편하게 만들게해줌.
import { produce } from 'immer'; // 불변성관리

import { auth } from '../../shared/firebase';
import firebase from 'firebase/app';

// actions
//const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
// action creators
//const logIn = createAction(LOG_IN, (user) => ({ user })); // 아래와 동일한 내용이된다.

// const logIn = (user) =>{
//     return {
//         type : LOG_IN,
//         user :
//     }
// }
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

//middelware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((res) => {
        auth.signInWithEmailAndPassword(id, pwd).then((user) => {
          console.log(user);

          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: '',
              uid: user.user.uid,
            })
          );
          history.push('/');
        });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    // auth로 회원가입요청
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        // 회원가입완료시 user_name넣어주기위해 바로 업데이트시킴
        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            // user_name까지 등록이되면 리덕스에 넣는다.
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                user_profile: '',
                uid: user.user.uid,
              })
            );
            // 그후 메인페이지로 이동.
            history.push('/');
          })
          .catch((error) => {
            console.log(error);
          });

        // Signed in
        // ...
      })
      .catch((error) => {
        // firebase에서 설정한 회원가입 규칙을 위반할시 실행됨.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: '',
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
        history.replace('/Login');
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
    });
  };
};

//reducer  ( 여기서 불변성유지 immer)
export default handleActions(
  {
    // 어떤 액션에대한 내용인지.  (스위치문 대신하여 사용된다.)
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // state는 원본 , draft는 사본(불변성유지됨)
        //setCookie('is_login', 'success');
        draft.user = action.payload.user; // action안에 type,payload가 존재하며, payload에 내용이담긴다.
        draft.is_login = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        //     deleteCookie('is_login');
        draft.user = null;
        draft.is_login = false;
      }),

    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);
//모양이 훨씬 간결하다.
// const reducer = (state = {}, action = {}) => {
//   switch (action.type) {
//     case 'LOG_IN': {
//       state.user = action.user;
//     }
//   }
// };

//action creator export
const actionCreators = {
  //logIn,
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
