import React from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import { useSelector } from 'react-redux';
import user from '../redux/modules/user';

const PostDetail = (props) => {
  const id = props.match.params.id;
  console.log(id);

  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((state) => state.post.list);

  const idx = post_list.findIndex((post) => post.id === id);

  const post = post_list[idx];

  return (
    <>
      <Post {...post} is_me={post.user_info.user_id === user_info.uid} />
    </>
  );
};

export default PostDetail;
