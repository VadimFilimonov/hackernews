import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Stack, Spinner } from 'react-bootstrap';
import { fetchComments, fetchItem, selectors } from '../slices/storiesSlice';
import routes from '../routes';
import Comments from '../components/Comments';
import { convertTimestampToDate } from '../utilities/time';

const Story = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = useSelector((state) => selectors.selectById(state, Number(id)));

  useEffect(() => {
    if (!story) {
      dispatch(fetchItem(id));
    }
  }, [id, story, dispatch]);

  useEffect(() => {
    if (story && story.kids) {
      dispatch(fetchComments(story.kids));
    }
  }, [story, dispatch]);

  if (!story) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading....</span>
      </Spinner>
    );
  }

  const { url, title, time, score, by, descendants } = story;

  return (
    <Stack>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: routes.homePath() }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{title}</h1>
      <time className="text-muted">{convertTimestampToDate(time)}</time>
      <div>
        {score} points by <i>{by}</i> /{' '}
        <a href={url} target="_blank" rel="noreferrer">
          Source
        </a>
      </div>

      {descendants && <div className="my-3">The total comments count: {descendants}</div>}
      <Comments ids={story?.kids} />
    </Stack>
  );
};

export default Story;
