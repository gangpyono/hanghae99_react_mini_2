// 업로드한 이미지url을 현재 업로드 컴포넌트만 알고있다.
// 이를 PostWrite에서도 알아야하기떄문에 리덕스에 이 경로를 저장시켜야 가져다 쓸수 있다.
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { storage } from '../../shared/firebase';
import { firestore } from '../../shared/firebase';

//actions

const UPLOADING = 'UPLOADING';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: '',
  uploading: false,
  preview: 'http://via.placeholder.com/400x300',
};

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));
    const _upload = storage.ref(`images/${image.name}`).put(image); // 파일 이름을 포함한 경로 만들고 put으로 이미지를 storage에 업로드한다.

    _upload
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          dispatch(uploadImage(url));
        });
      })
      .catch((err) => {
        dispatch(uploading(false));
      });
  };
};

export default handleActions(
  {
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImageFB,
  setPreview,
};

export { actionCreators };
