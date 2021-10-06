import React from 'react';
import styled from 'styled-components';

import { Grid, Input, Image, Text, Button } from '../elements/index';
import Upload from '../shared/Upload';
const PostWrite = (props) => {
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

        <Image shape="rectangle" />
      </Grid>

      <Grid padding="16px">
        <Input label="게시글 내용" placeholder="게시글 작성" multiline></Input>
      </Grid>

      <Grid padding="16px">
        <Button text="작성 완료"></Button>
      </Grid>
    </>
  );
};

export default PostWrite;
