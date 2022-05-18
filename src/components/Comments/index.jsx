import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import { convertTimestampToDate } from '../../utilities/time';

const Comments = ({ ids = [], onLoadChildrenComments }) => {
  const comments = useSelector((state) =>
    ids.filter((id) => state.comments.entities[id]).map((id) => state.comments.entities[id])
  );

  if (comments.length === 0) {
    return null;
  }

  return (
    <ListGroup as="ul" variant="flush">
      {comments
        .filter(({ deleted, dead }) => !deleted && !dead)
        .map((comment) => (
          <ListGroup.Item key={comment.id} as="li">
            <div className="fw-bold">
              {comment.by} / {convertTimestampToDate(comment.time)}{' '}
            </div>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            {comment.kids && (
              <Button
                className="mt-2"
                variant="secondary"
                size="sm"
                onClick={() => onLoadChildrenComments(comment.kids)}
              >
                {comment.kids.length} comments
              </Button>
            )}
            <div className="mt-3 mx-3">
              <Comments ids={comment.kids} onLoadChildrenComments={onLoadChildrenComments} />
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default Comments;
