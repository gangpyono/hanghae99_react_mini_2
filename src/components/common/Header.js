import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Grid } from '../../elements/index';
import { actionCreators as userActions } from '../../redux/modules/user';
import { useHistory } from 'react-router';
const Header = (props) => {
  //const [is_login, setIsLogin] = React.useState(false);
  const dispatch = useDispatch();
  // 세션으로 체크할시, 딜레이가생겨 화면 렌더링이 안됨.
  const is_login = useSelector((state) => state.user.is_login);
  const history = props.history;
  if (is_login) {
    return (
      <Grid padding="4px 16px" is_flex>
        <Grid>
          <Logo />
        </Grid>

        <Grid is_flex>
          <Button text="내정보" header />
          <Button text="알림" header />
          <Button
            header
            text="로그아웃"
            _onClick={() => {
              // 화살표함수로 넣어야 클릭시 실행되는 구조를 만들 수있다.
              dispatch(userActions.logoutFB());
              history.replace('/Ligon');
            }}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid padding="4px 16px" is_flex>
      <Grid>
        <Logo />
      </Grid>

      <Grid is_flex>
        <Button
          header
          text="회원가입"
          _onClick={() => {
            history.push('/SignUp');
          }}
        />
        <Button header text="로그인" />
      </Grid>
    </Grid>
  );
};

const Logo = styled.div`
  width: 40px;
  height: 40px;
  background-color: #c4c4c4;
`;

export default Header;
