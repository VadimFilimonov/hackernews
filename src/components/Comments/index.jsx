import React from 'react';
import { useSelector } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { convertTimestampToRelativeTime } from '../../utilities/time';

const Comments = ({ ids = [], onLoadChildrenComments }) => {
  const { t } = useTranslation();
  const comments = useSelector((state) =>
    ids
      .filter((id) => state.comments.entities[id])
      .map((id) => state.comments.entities[id])
      .filter(({ deleted }) => !deleted)
      .sort((a, b) => a.time - b.time)
  );

  if (comments.length === 0) {
    return null;
  }

  return (
    <ListGroup as="ul" variant="flush">
      {comments.map((comment) => (
        <ListGroup.Item key={comment.id} disabled={comment.dead} as="li">
          <div className="fw-bold">
            {comment.by} / {convertTimestampToRelativeTime(comment.time)}{' '}
          </div>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: comment.text }} />

          {comment.kids && (
            <>
              <Button
                className="mt-2"
                variant="secondary"
                size="sm"
                onClick={() => onLoadChildrenComments(comment.kids)}
              >
                {t('expandCommentsButton', { count: comment.kids.length })}
              </Button>
              <div className="mt-3 mx-3">
                <Comments ids={comment.kids} onLoadChildrenComments={onLoadChildrenComments} />
              </div>
            </>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Comments;
