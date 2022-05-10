import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Stack, Spinner } from 'react-bootstrap';
import { fetchStory, selectors } from '../slices/storiesSlice';
import routes from '../routes';

const Story = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = useSelector((state) => selectors.selectById(state, Number(id)));

  useEffect(() => {
    if (!story) {
      dispatch(fetchStory(id));
    }
  }, [id, story, dispatch]);

  if (!story) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const { url, title, time, score, by, descendants } = story;

  return (
    <Stack>
      <Link to={routes.homePath()}>Home</Link>
      <a href={url} target="_blank" rel="noreferrer">
        Source
      </a>
      <h1>{title}</h1>
      <time>{time}</time>
      <div>
        {score} points by {by}
      </div>
      <div>The total comments count: {descendants}</div>
    </Stack>
  );
};

export default Story;
