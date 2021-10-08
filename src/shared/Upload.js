import React from 'react';
import { Button } from '../elements';
import { storage } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';

const Upload = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const uploading = useSelector((state) => state.image.uploading);

  //<input type="file"/>은 파일을 선택하면 onChange 이벤트로 선택한 파일이 객체로 넘어온다.
  const selectFile = (e) => {
    //파일리더로 url가져오기
    const reader = new FileReader();
    const file = e.target.files[0];

    //파일 내용을 읽어온다.
    reader.readAsDataURL(file);

    //읽기가 끝나면 발생하는 이벤트
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert('파일을 선택해 주세요');
      return;
    } else {
      // 리덕스에 미리보기 파일 저장.
      dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={uploading}
      />
      <Button _onClick={uploadFB} text="업로드하기"></Button>
    </>
  );
};

export default Upload;
