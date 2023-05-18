import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyle from './styles';

const Posts = ({ setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const posts = useSelector((state) => state.posts);
  const classes = useStyle();
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts