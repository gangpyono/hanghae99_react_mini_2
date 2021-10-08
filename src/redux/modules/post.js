import { createAction, handleActions } from 'redux-actions'; // 액션,리듀서를 편하게 만들게해줌.
import { produce } from 'immer'; // 불변성관리
import { firestore, storage } from '../../shared/firebase';
import moment from 'moment';

import { actionCreators as imageActions } from './image';

import user from './user';
const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const UPDATE_POST = 'UPDATE_POST';
const LOADING = 'LOADING';

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (post) => ({ post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  image_url:
    'https://lh3.googleusercontent.com/proxy/rmnzK3GlBcJt59GaP5zA24g7HK6pRXuc9yMQpfeGM9kH9O7CDf_xjFvmkFlOELG9UI8wJCg4v_QMto38ZtJ82tLsNezxACea-f1OkOCMbqdnRi5XWYM',
  contents: '강아지네요',
  comment_cnt: 10,
  insert_dt: '2021-01-01 21:00:00',
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true)); //로딩중.

    const postDB = firestore.collection('post'); // 파이어베이스쪽 데이터베이스 선택.

    let query = postDB.orderBy('insert_dt', 'desc'); // 쿼리설정,

    //가져오기 시작타이밍. ( is_loading을 true로 바꿔줄 타이밍.)

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        // 데이터 가져오기
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();

          //['comment_cnt','contnets'...] 객체의 키값으로 배열을 만들어준다.
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf('user_') !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] }; // 객체의 키값으로 변수명을 할당할떈, []를 활용해야한다.
            },
            { id: doc.id, user_info: {} }
          );

          post_list.push(post);
        });

        post_list.pop();
        // 마지막 하나는 빼줍니다.
        // 그래야 size대로 리스트가 추가되니까요!
        // 마지막 데이터는 다음 페이지의 유무를 알려주기 위한 친구일 뿐! 리스트에 들어가지 않아요!

        dispatch(setPost(post_list, paging));
      });

    return;
  };
};

const addPostFB = (contents = '') => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post'); // post콜렉션 가져오기

    const _user = getState().user.user; //유저정보 가져오기
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
    };

    const _image = getState().image.preview; // image모듈에서 preview가져옴
    // console.log(typeof _image);

    //storage에 이미지 넣기
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`) // 파일의 고유이름을 유저의 uid와 실시간으로 지정하여 storage에 저장한다.
      .putString(_image, 'data_url');

    //업로드가 완료되면 실행.
    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .catch((err) => {
          // 실무에선 catch에서 단순히 콘솔로 확인하는것이아닌 후처리작업을 추가해준다.
          console.log('이미지 url을 받아오는데 실패했습니다.', err);
        })
        .then((url) => {
          //getDownloadURL완료후 url을 반환해줌.

          return url;
        }) // 프로미스 체이닝을이용해 url을 넘겨준다.
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url }) // image url추가.
            .then((docRef) => {
              let post = { user_info, ..._post, id: docRef.id, image_url: url }; // 리덕스에 저장할 image url도 추가.
              dispatch(addPost(post));
              history.replace('/');

              //게시물을 업로드후, 리덕스에남아있는 preview이미지를 없애주기위함.
              dispatch(imageActions.setPreview(null));
            })
            .catch((error) => {
              console.log('post 파이어베이스에 등록 실패!', error);
            });
        });
    });
  };
};

const updatePostFB = (post_id, contents) => {
  return function (dispatch, getState, { history }) {
    const idx = getState().post.list.findIndex((post) => post.id === post_id);
    const post = getState().post.list[idx];
    //console.log(post);
    const postDB = firestore.collection('post');
    const _image = getState().image.preview;
    console.log(post, '게시물 파이어베이스 업데이트');

    if (_image === post.image_url) {
      postDB
        .doc(post_id)
        .update({ contents: contents })
        .then(() => {
          dispatch(updatePost({ ...post, contents: contents }));
          history.replace('/');
        });
    } else {
      const _upload = storage
        .ref(`images/${post.user_info.user_id}_${new Date().getTime()}`) // 파일의 고유이름을 유저의 uid와 실시간으로 지정하여 storage에 저장한다.
        .putString(_image, 'data_url');

      //업로드가 완료되면 실행.
      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .catch((err) => {
            // 실무에선 catch에서 단순히 콘솔로 확인하는것이아닌 후처리작업을 추가해준다.
            console.log('이미지 url을 받아오는데 실패했습니다.', err);
          })
          .then((url) => {
            //getDownloadURL완료후 url을 반환해줌.
            console.log(url, 'url검사');
            return url;
          }) // 프로미스 체이닝을이용해 url을 넘겨준다.
          .then((url) => {
            postDB
              .doc(post.id)
              .update({ image_url: url, contents: contents }) // image url추가.
              .then((docRef) => {
                let _post = { ...post, image_url: url, contents: contents }; // 리덕스에 저장할 image url도 추가.
                dispatch(updatePost(_post));
                history.replace('/');

                //게시물을 업로드후, 리덕스에남아있는 preview이미지를 없애주기위함.
                dispatch(imageActions.setPreview(null));
              })
              .catch((error) => {
                console.log('post 파이어베이스에 등록 실패!', error);
              });
          });
      });
    }
  };
};
//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false; // 이미 불러온 상태이므로.
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post); // 배열맨앞에 넣기.
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (post) => post.id === action.payload.post.id
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post }; // 이미지 파일이 안  바뀔 수도 있기 때문에
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  updatePostFB,
};

export { actionCreators };
