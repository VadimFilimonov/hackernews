import React, { useEffect } from 'react';
import { Button, Card, Spinner, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import { fetchStories } from '../slices/storiesSlice';
import { convertTimestampToRelativeTime } from '../utilities/time';

const Home = () => {
  const { t } = useTranslation();
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
        {t('refresh')}
      </Button>
      <hr />
      {status === 'loading' && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t('spinnerText')}</span>
        </Spinner>
      )}
      {status === 'idle' && (
        <Stack gap={3} className="col-12 col-lg-6">
          {stories.map(({ id, title, score, by, time, descendants }) => (
            <Card key={id}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {t('cardText', { score, by, descendants, time: convertTimestampToRelativeTime(time) })}
                </Card.Text>
                <Link to={routes.postPath(id)}>{t('more')}</Link>
              </Card.Body>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
};

export default Home;
