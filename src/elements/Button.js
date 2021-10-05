import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { _onClick, text } = props;

  if (text === '로그인하기' || text === '회원가입하기') {
    return <Btn onClick={_onClick}>{text}</Btn>;
  } else {
    return <HeaderBtn onClick={_onClick}>{text}</HeaderBtn>;
  }
};

Button.defaultProps = {
  _onClick: function () {
    // 메서드
    console.log('Pop함수를 받지 못했습니다.');
  },
  text: 'text값을 전달받지 못했습니다.',
};

const Btn = styled.button`
  font-size: 20px;
  width: 100%;
  height: 80px;
  padding: 12px 0px;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;
`;

const HeaderBtn = styled.button`
  color: #000000;
  width: 100%;
  margin-left: 4px;
  height: 40px;
  background-color: #c4c4c4;
  border: none;
  cursor: pointer;
`;

export default Button;
