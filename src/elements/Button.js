import React from 'react';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Button = (props) => {
  const { _onClick, text, is_float, header, margin, width } = props;

  if (is_float) {
    return <FloatButton onClick={_onClick}>{text}</FloatButton>;
  }

  // if (like) {
  //   return (
  //     <LikeButton onClick={_onClick}>
  //       <FavoriteBorderIcon></FavoriteBorderIcon>
  //     </LikeButton>
  //   );
  // }

  if (header) {
    return <HeaderBtn onClick={_onClick}>{text}</HeaderBtn>;
  }

  const styles = {
    margin: margin,
    width: width,
  };

  return (
    <Btn {...styles} onClick={_onClick}>
      {text}
    </Btn>
  );
};

Button.defaultProps = {
  _onClick: function () {
    // 메서드
    console.log('Pop함수를 받지 못했습니다.');
  },
  text: 'text값을 전달받지 못했습니다.',
  is_float: false,
  like: false,
  header: false,
  margin: false,
  width: '100%',
  heigth: '80px',
};

const Btn = styled.button`
  font-size: 20px;
  width: ${(props) => props.width};
  padding: 12px 0px;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;
  ${(props) => (props.margin ? `margin : ${props.margin}` : '')};
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

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 420px;
  right: 16px;
  border-radius: 50%;
  text-align: center;
  padding-top: 4px;
  cursor: pointer;
`;

export default Button;
