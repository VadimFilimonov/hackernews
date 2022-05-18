import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack, Spinner, Card } from 'react-bootstrap';
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
        <Card key={id} className="col-12 col-lg-6">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {score} points by {by}
            </Card.Text>
            <Link className="stretched-link" to={routes.postPath(id)}>
              More
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
};

export default Stories;
