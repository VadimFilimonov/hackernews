import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { convertTimestampToDate } from '../../utilities/time';

const Comments = ({ ids }) => {
  // TODO: fix undefined in comments
  const comments = useSelector(({ stories }) =>
    ids.map((id) => {
      return stories.entities[id];
    })
  );

  const fetchingStatus = useSelector(({ stories }) => stories.status);

  if (fetchingStatus === 'loading') {
    return <>Loading...</>;
  }

  if (comments.length === 0) {
    return null;
  }

  return (
    <ListGroup>
      {comments
        .filter(Boolean)
        .filter(({ deleted, dead }) => !deleted && !dead)
        .map((comment) => (
          <ListGroup.Item key={comment.id} as="li">
            <div className="fw-bold">
              {comment.by} / {convertTimestampToDate(comment.time)}{' '}
            </div>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default Comments;
