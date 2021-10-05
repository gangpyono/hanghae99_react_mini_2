import React from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { Grid, Text, Input, Button } from '../elements/index';

const SignUp = (props) => {
  // const id_ref = React.useRef(null);
  // const nick_ref = React.useRef(null);
  // const pw_ref = React.useRef(null);
  // const pwpw_ref = React.useRef(null);

  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');
  const [user_name, setUserName] = React.useState('');

  const signup = () => {
    if (id === '' || pwd === '' || user_name === '') {
      return;
    }

    if (pwd !== pwd_check) {
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  };

  return (
    <>
      <Grid padding="16px">
        <Text size="32px" color="#000000" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            // ref={id_ref}
            label="아이디"
            placeholder="아이디를 입력하세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            // ref={nick_ref}
            label="닉네임"
            placeholder="닉네임을 입력하세요"
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            // ref={pw_ref}
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            // ref={pwpw_ref}
            label="비밀번호확인"
            placeholder="비밀번호를 다시 입력하세요"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Button text="회원가입하기" _onClick={signup}></Button>
        {/* 버튼이 클릭될시 값을 넘겨주는 방법..? */}
      </Grid>
    </>
  );
};

SignUp.defaultProps = {};

export default SignUp;
