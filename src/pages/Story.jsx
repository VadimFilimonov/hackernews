import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Spinner, Table } from 'react-bootstrap';
import { fetchItem, selectors } from '../slices/storiesSlice';
import { clearComments, fetchComments } from '../slices/commentsSlice';
import routes from '../routes';
import Comments from '../components/Comments';
import { convertTimestampToRelativeTime } from '../utilities/time';

const Story = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = useSelector((state) => selectors.selectById(state, Number(id)));

  useEffect(() => {
    if (!story) {
      dispatch(fetchItem(id));
    }
  }, [id, story, dispatch]);

  useEffect(() => {
    if (story?.kids) {
      dispatch(fetchComments(story.kids));
    }

    return () => {
      dispatch(clearComments());
    };
  }, [story?.kids, dispatch]);

  const handleRefreshComments = () => {
    dispatch(clearComments());
    dispatch(fetchComments(story.kids));
  };

  const handleLoadChildrenComments = (ids) => {
    dispatch(fetchComments(ids));
  };

  if (!story) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t('spinnerText')}</span>
      </Spinner>
    );
  }

  const { url, title, time, score, by, descendants } = story;

  return (
    <Stack gap={3}>
      <Link className="btn btn-primary align-self-start" to={routes.homePath()}>
        {t('back')}
      </Link>
      <h1>{title}</h1>
      <Table striped bordered responsive>
        <tbody>
          <tr>
            <th>{t('date')}</th>
            <td>
              <time>{convertTimestampToRelativeTime(time)}</time>
            </td>
          </tr>
          <tr>
            <th>{t('points')}</th>
            <td>{score}</td>
          </tr>
          <tr>
            <th>{t('author')}</th>
            <td>{by}</td>
          </tr>
          <tr>
            <th>{t('source')}</th>
            <td>
              <a href={url} target="_blank" rel="noreferrer">
                {t('link')}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>

      {Boolean(descendants) && (
        <>
          <div className="d-flex justify-content-between">
            <h2>{t('comments')}</h2>
            <Button onClick={handleRefreshComments}>{t('refresh')}</Button>
          </div>
          <Comments ids={story.kids} onLoadChildrenComments={handleLoadChildrenComments} />
        </>
      )}
    </Stack>
  );
};

export default Story;
