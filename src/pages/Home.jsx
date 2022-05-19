import React, { useEffect } from 'react';
import { Button, Card, Spinner, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../routes';
import { fetchStories } from '../slices/storiesSlice';
import { convertTimestampToRelativeTime } from '../utilities/time';

const Home = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.stories);
  const stories = useSelector((state) => Object.values(state.stories.entities).sort((a, b) => b.time - a.time));

  useEffect(() => {
    if (stories.length <= 1) {
      dispatch(fetchStories());
    }
  }, [dispatch]);

  const handleRefreshStories = () => {
    dispatch(fetchStories());
  };

  return (
    <>
      <h1 className="mb-3">HackerNews</h1>
      <Button className="mb-3" onClick={handleRefreshStories}>
        Refresh
      </Button>
      <hr />
      {status === 'loading' && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {status === 'idle' && (
        <Stack gap={3} className="col-12 col-lg-6">
          {stories.map(({ id, title, score, by, time, descendants }) => (
            <Card key={id}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {score} points by {by} {convertTimestampToRelativeTime(time)} | {descendants} comments
                </Card.Text>
                <Link to={routes.postPath(id)}>More</Link>
              </Card.Body>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
};

export default Home;
