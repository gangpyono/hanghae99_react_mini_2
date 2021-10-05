import React from 'react';
import { useSelector } from 'react-redux';
import { apiKey } from './firebase';
const Permit = (props) => {
  // 유저 정보가 있는지, 토큰이 있는지를 체크합니다
  const user_info = useSelector((state) => state.user.user);
  const _session_key = `firebase:authUser:${apiKey}: [EDFAULT]`;
  // 세션이 있나 확인합니다.

  const is_login = sessionStorage.getItem(_session_key);

  if (is_login && user_info) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};

export default Permit;
