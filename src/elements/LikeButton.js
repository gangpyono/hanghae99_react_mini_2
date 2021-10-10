import React from 'react';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikeButton = (props) => {
  const { is_like, _onClick } = props;

  if (is_like) {
    return (
      <LikeBtn onClick={_onClick}>
        <FavoriteIcon></FavoriteIcon>
      </LikeBtn>
    );
  } else {
    return (
      <LikeBtn onClick={_onClick}>
        <FavoriteBorderIcon></FavoriteBorderIcon>
      </LikeBtn>
    );
  }
};

LikeButton.defaultProps = {
  is_like: false,
  _onClick: () => {},
};

const LikeBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default LikeButton;
