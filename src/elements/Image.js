import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === 'circle') {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return <></>;
};

Image.defaultProps = {
  shape: 'circle',
  src: 'https://lh3.googleusercontent.com/proxy/rmnzK3GlBcJt59GaP5zA24g7HK6pRXuc9yMQpfeGM9kH9O7CDf_xjFvmkFlOELG9UI8wJCg4v_QMto38ZtJ82tLsNezxACea-f1OkOCMbqdnRi5XWYM',
  size: 36,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url('${(props) => props.src}');
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url('${(props) => props.src}');
  background-size: cover;
  margin: 4px;
`;

export default Image;
