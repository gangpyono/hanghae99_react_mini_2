import { createAction, handleActions } from 'redux-actions'; // 액션,리듀서를 편하게 만들게해줌.
import { produce } from 'immer'; // 불변성관리


const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST ,(post_list) => ({post_list}));

const addPost = createAction(ADD_POST,(post) => ({post}));

const initialState = {
  list: [],

}


 