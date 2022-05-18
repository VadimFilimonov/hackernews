import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Badge, Stack, Spinner, Table } from 'react-bootstrap';
import { fetchItem, selectors } from '../slices/storiesSlice';
import { fetchComments } from '../slices/commentsSlice';
import routes from '../routes';
import Comments from '../components/Comments';
import { convertTimestampToDate } from '../utilities/time';

const Story = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // TODO: delete saved state
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
  }, [story?.kids, dispatch]);

  const handleLoadChildrenComments = (ids) => {
    dispatch(fetchComments(ids));
  };

  if (!story) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading....</span>
      </Spinner>
    );
  }

  const { url, title, time, score, by, descendants } = story;

  return (
    <Stack gap={3}>
      <Link className="btn btn-primary align-self-start" role="button" to={routes.homePath()}>
        Back to Home page
      </Link>
      <h1>{title}</h1>
      <Table striped bordered responsive>
        <tbody>
          <tr>
            <th>Date</th>
            <td>
              <time>{convertTimestampToDate(time)}</time>
            </td>
          </tr>
          <tr>
            <th>Points</th>
            <td>{score}</td>
          </tr>
          <tr>
            <th>Author</th>
            <td>{by}</td>
          </tr>
          <tr>
            <th>Source</th>
            <td>
              <a href={url} target="_blank" rel="noreferrer">
                Link
              </a>
            </td>
          </tr>
        </tbody>
      </Table>

      {descendants && (
        <div className="d-flex">
          <h2>Comments </h2>
          <Badge className="align-self-start mx-1" pill bg="primary">
            {descendants}
          </Badge>
        </div>
      )}
      <Comments ids={story?.kids} onLoadChildrenComments={handleLoadChildrenComments} />
    </Stack>
  );
};

export default Story;
