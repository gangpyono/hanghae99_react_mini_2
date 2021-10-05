import React from 'react';
import styled from 'styled-components';

import { Input, Text, Button, Grid } from '../elements/index';

import { useDispatch } from 'react-redux';
import { actionCreators as useActions } from '../redux/modules/user';
import { emailCheck } from '../shared/common';

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const login = () => {
    if (id === '' || pwd === '') {
      window.alert('아이디 혹은 비밀번호가 공란입니다! 입력해주세요!');
      return;
    }

    if (!emailCheck(id)) {
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }

    dispatch(useActions.loginFB(id, pwd));
  };

  return (
    <>
      <Grid padding="16px">
        <Text size="32px" color="#000000" bold>
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력하세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>
        <Button
          text="로그인하기"
          _onClick={(e) => {
            console.log('로그인했어!');
            login();
          }}
        ></Button>
      </Grid>
    </>
  );
};

export default Login;
