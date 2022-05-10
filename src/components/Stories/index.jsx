import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Stack, Spinner } from 'react-bootstrap';
import { fetchStories, selectors } from '../../slices/storiesSlice';
import routes from '../../routes';
import { STORIES_COUNT_LIMIT } from '../../constants';

const Stories = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.stories);
  const stories = useSelector(selectors.selectAll);

  useEffect(() => {
    if (stories.length < STORIES_COUNT_LIMIT) {
      dispatch(fetchStories());
    }
  }, [stories, dispatch]);

  if (status === 'loading') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Stack gap={3}>
      {stories.map(({ id, title, score, by }) => (
        <Row key={id}>
          <h2 className="h5">
            <Link className="text-decoration-none" to={routes.postPath(id)}>
              {title}
            </Link>
          </h2>
          <div>
            {score} points by {by}
          </div>
        </Row>
      ))}
    </Stack>
  );
};

export default Stories;
