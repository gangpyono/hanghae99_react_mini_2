import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './index';

const Input = (props) => {
  const { label, placeholder, _onChange, type } = props;

  return (
    //   여기서 Grid는 묶어주는 용도로만 사용한다. (추가적인 margin은 해당 페이지에서 설정해야 다른곳에서 인풋을 사용할떄 원하는 값을 주기가 편하다.)
    <Grid>
      <Text margin="0px">{label}</Text>
      {/* input의 onChange속성 : input의 내용의 변경 직후 발생. */}
      <InputBox
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
      ></InputBox>
    </Grid>
  );
};

Input.defaultProps = {
  label: '라벨을 설정해 주세요',
  placeholder: 'placeholder을 설정해주세요',
  type: 'text',
  _onChange: () => {}, // Input을 사용중인 부모컴포넌트가 현재 쓰여진 텍스트를 알고싶기떄문에
};

const InputBox = styled.input`
  border: 1px solid #212121;
  width: 100%;
  height: 50px;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
