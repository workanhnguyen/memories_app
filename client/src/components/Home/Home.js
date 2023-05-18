import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import useStyle from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  
  const handleAdd = (tag) => setTags([...tags, tag]);
  
  const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));
  
  const searchPost = () => {
    if (searchTerm.trim() || tags) {
      // dispatch --> fetch searched posts
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));

      navigate(`/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignContent="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown={handleKeyDown}
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0'}} 
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
