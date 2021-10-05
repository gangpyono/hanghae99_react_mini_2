import React from 'react';

import { Grid, Image, Text, Button } from '../elements/index';

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          {/* is_flex 값은 무엇인가?  값을 넣지않으면 true로 들어감. (jsx 문법)*/}
          <Image shape="circle" />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>

        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>

        <Grid>
          <Image shape="rectangle" src={props.src} />
        </Grid>

        <Grid is_flex padding="16px">
          <Text bold>댓글{props.comment_cnt}개</Text>
          <Button like></Button>
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
};

// props가 전달되지않았을시를 대비 (잘못 가져왔을시의 대비는 못한다.)
Post.defaultProps = {
  user_info: {
    user_name: 'gangpyo',
    user_profile:
      'https://lh3.googleusercontent.com/proxy/rmnzK3GlBcJt59GaP5zA24g7HK6pRXuc9yMQpfeGM9kH9O7CDf_xjFvmkFlOELG9UI8wJCg4v_QMto38ZtJ82tLsNezxACea-f1OkOCMbqdnRi5XWYM',
  },
  image_url:
    'https://lh3.googleusercontent.com/proxy/rmnzK3GlBcJt59GaP5zA24g7HK6pRXuc9yMQpfeGM9kH9O7CDf_xjFvmkFlOELG9UI8wJCg4v_QMto38ZtJ82tLsNezxACea-f1OkOCMbqdnRi5XWYM', // 게시글이미지
  contents: '강아지네요!',
  comment_cnt: 10,
  insert_dt: '2021-09-30 15:28',
};

export default Post;
