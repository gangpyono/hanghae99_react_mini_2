import React from 'react';
import { Grid, Button, Input } from '../elements/index';
const CommentWrite = (props) => {
  return (
    <>
      <Grid padding="16px" is_flex>
        <Input placeholder="댓글을 작성해주세요" />
        <Button text="작성" margin="10px" width="60px">
          작성
        </Button>
      </Grid>
    </>
  );
};

export default CommentWrite;
