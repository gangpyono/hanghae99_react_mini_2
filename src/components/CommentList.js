import React from 'react';
import { Grid, Image, Text } from '../elements/index';

const CommentList = (props) => {
  return (
    <>
      <Grid>
        <CommentItem></CommentItem>
      </Grid>
    </>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, contents, insert_dt } = props;

  return (
    <Grid is_flex padding="16px">
      <Grid is_flex width="100px">
        <Image shape="circle"></Image>
        <Text>{user_name}</Text>
      </Grid>

      <Grid is_flex margin="0px 0px 0px 20px">
        <Text bold>{contents}</Text>
        <Text>{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: '',
  user_name: 'gangpyo',
  user_id: '',
  post_id: 1,
  contents: '강아지네요',
  insert_dt: '2021-01-01 20:00:00',
};
