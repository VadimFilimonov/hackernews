import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Stack } from 'react-bootstrap';
import routes from '../routes';

const Story = () => {
  const { id } = useParams();
  const story = useSelector((state) => state.stories.list.find((item) => item.id === Number(id)));

  if (!story) {
    return null;
  }

  const { url, title, time, score, by, descendants } = story;

  return (
    <Stack>
      <Link to={routes.homePath()}>Home</Link>
      <a href={url}>Source</a>
      <h1>{title}</h1>
      <time>{time}</time>
      <div>
        {score} points by {by}
      </div>
      <div>The total comments count: {descendants}</div>
    </Stack>
  );
};

export default Story;
