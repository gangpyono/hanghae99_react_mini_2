import { createAction, handleActions } from 'redux-actions'; // 액션,리듀서를 편하게 만들게해줌.
import { produce } from 'immer'; // 불변성관리

const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
  user_info: {
    id: 0,
    user_name: 'gangpyo',
    user_profile:
      'https://lh3.googleusercontent.com/proxy/rmnzK3GlBcJt59GaP5zA24g7HK6pRXuc9yMQpfeGM9kH9O7CDf_xjFvmkFlOELG9UI8wJCg4v_QMto38ZtJ82tLsNezxACea-f1OkOCMbqdnRi5XWYM',
  },
  image_url:
    'https://lh3.googleusercontent.com/proxy/rmnzK3GlBcJt59GaP5zA24g7HK6pRXuc9yMQpfeGM9kH9O7CDf_xjFvmkFlOELG9UI8wJCg4v_QMto38ZtJ82tLsNezxACea-f1OkOCMbqdnRi5XWYM',
  contents: '강아지네요',
  comment_cnt: 10,
  insert_dt: '2021-01-01 21:00:00',
};
