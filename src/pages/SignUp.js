import React from 'react';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { Grid, Text, Input, Button } from '../elements/index';
import { emailCheck } from '../shared/common';
const SignUp = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');
  const [user_name, setUserName] = React.useState('');

  const signup = () => {
    if (id === '' || pwd === '' || user_name === '') {
      window.alert('아이디,패스워드,닉네임 모두 입력해주세요.');
      return;
    }

    if (!emailCheck(id)) {
      window.alert('이메일 형식이 맞지않습니다!');
      return;
    }

    if (pwd !== pwd_check) {
      window.alert('비밀번호가 일치하지 않습니다.');
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
            label="아이디"
            placeholder="아이디를 입력하세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력하세요"
            _onChange={(e) => {
              setUserName(e.target.value);
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
