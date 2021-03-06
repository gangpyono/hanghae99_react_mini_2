import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configureStore';

import { Grid, Image, Text, Button, LikeButton } from '../elements/index';
import { actionCreators as postActions } from '../redux/modules/post';

const Post = React.memo((props) => {
  const user_info = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  console.log('post');

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex width="auto">
          {/* is_flex 값은 무엇인가?  값을 넣지않으면 true로 들어감. (jsx 문법)*/}

          <Image shape="circle" src={props.user_profile} />
          <Text bold>{props.user_info.user_name}</Text>

          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && ( // 내가작성한 게시물에만 보여주기
              <Button
                text="수정"
                width="100px"
                _onClick={() => {
                  history.push(`/PostWrite/${props.id}`);
                }}
              ></Button>
            )}
          </Grid>
        </Grid>

        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>

        <Grid>
          <Image
            shape="rectangle"
            src={props.image_url}
            _onClick={() => {
              history.push(`/PostDetail/${props.id}`);
            }}
          />
        </Grid>

        <Grid is_flex padding="16px">
          <Text bold>{props.comment_cnt}개</Text>
          <Grid is_flex width="auto">
            <LikeButton
              is_like={props.like}
              _onClick={() => {
                dispatch(postActions.likeFB(props.id, user_info.uid));
              }}
            ></LikeButton>
            <Text bold>좋아요 : {props.likes.length}개</Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>

    /* 우선 아래와같이 틀을 잡아놓고 위에처럼 스타일 컴포넌트로 구성한다. */
    /* <div>user Profile / user name / insert_dt / is_me btn</div> */
    /* is_me btn 은 아직나인지 아닌지 구분이 안가기떄문에 구현미룸 */
    /* <div>contents</div> */
    /* <div>image</div>
        <div>comment cnt </div> */
  );
});

// props가 전달되지않았을시를 대비 (잘못 가져왔을시의 대비는 못한다.)
Post.defaultProps = {
  user_info: {
    user_name: 'gangpyo',
    user_profile:
      'https://t1.daumcdn.net/liveboard/holapet/0e5f90af436e4c218343073164a5f657.JPG',
  },
  image_url:
    'https://lh3.googleusercontent.com/proxy/rmnzK3GlBcJt59GaP5zA24g7HK6pRXuc9yMQpfeGM9kH9O7CDf_xjFvmkFlOELG9UI8wJCg4v_QMto38ZtJ82tLsNezxACea-f1OkOCMbqdnRi5XWYM', // 게시글이미지
  contents: '강아지네요!',
  comment_cnt: 10,
  insert_dt: '2021-09-30 15:28',
  is_me: false,
};

export default Post;
