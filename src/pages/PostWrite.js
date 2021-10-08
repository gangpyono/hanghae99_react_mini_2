import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Input, Image, Text, Button } from '../elements/index';
import Upload from '../shared/Upload';
import post, { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';
const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);

  const post_list = useSelector((state) => state.post.list);

  // 수정페이지 인지 아닌지확인하는작업.
  const post_id = props.match.params.id;

  const is_edit = post_id ? true : false;

  // 수정시, 기존의 내용이 작성되어져있어야한다. 그 데이터를 어디서 가져올것아냐? 파이어베이스 or 리덕스.
  // 여기선 리덕스에서 가져온다고 가정하고, 만약 수정페이지에서 새로고침시 리덕스에서 데이터가 날아가 보이지 않는현상을 방지하기위해 새로고침을 누를시 뒤로가기처리를 해준다.

  const { history } = props;
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : '';
  console.log(_post);
  const [contents, setContents] = React.useState('');

  React.useEffect(() => {
    if (is_edit && !_post) {
      history.goBack();
      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []); // 새로고침시, 리덕스에 데이터가 사라짐으로, 메인페이지로 보낸다.

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace('/login');
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  // 페이지 수정시 보여줌
  if (is_edit) {
    return (
      <>
        <Grid padding="16px">
          <Text bold size="32px">
            게시글 수정
          </Text>
          <Upload />
        </Grid>

        <Grid>
          <Grid padding="16px">
            <Text bold size="25px">
              미리보기
            </Text>
          </Grid>

          <Image
            shape="rectangle"
            src={preview ? preview : 'http://via.placeholder.com/400x300'}
          />
        </Grid>

        <Grid padding="16px">
          <Input
            label="게시글 내용"
            placeholder="게시글 작성"
            multiline
            _onChange={changeContents}
            defaultValue={_post.contents}
          ></Input>
        </Grid>

        <Grid padding="16px">
          <Button
            text="수정 완료"
            _onClick={() => {
              dispatch(postActions.updatePostFB(_post.id, contents));
            }}
          ></Button>
        </Grid>
      </>
    );
  }

  // 새로만들떄 보여줌
  return (
    <>
      <Grid padding="16px">
        <Text bold size="32px">
          게시글 작성
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text bold size="25px">
            미리보기
          </Text>
        </Grid>

        <Image
          shape="rectangle"
          src={preview ? preview : 'http://via.placeholder.com/400x300'}
        />
      </Grid>

      <Grid padding="16px">
        <Input
          label="게시글 내용"
          placeholder="게시글 작성"
          multiline
          _onChange={changeContents}
        ></Input>
      </Grid>

      <Grid padding="16px">
        <Button
          text="작성 완료"
          _onClick={() => {
            console.log('작성완료');
            dispatch(postActions.addPostFB(contents));
          }}
        ></Button>
      </Grid>
    </>
  );
};

export default PostWrite;
