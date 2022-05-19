import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stack, Spinner, Card, Button } from 'react-bootstrap';
import { fetchStories } from '../../slices/storiesSlice';
import routes from '../../routes';

const Stories = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.stories);
  const stories = useSelector((state) => Object.values(state.stories.entities).sort((a, b) => b.time - a.time));

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const handleRefreshStories = () => {
    dispatch(fetchStories());
  };

  if (status === 'loading') {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Button className="mb-3" onClick={handleRefreshStories}>
        Refresh
      </Button>
      <Stack gap={3} className="col-12 col-lg-6">
        {stories.map(({ id, title, score, by }) => (
          <Card key={id}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                {score} points by {by}
              </Card.Text>
              <Link to={routes.postPath(id)}>More</Link>
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Stories;
