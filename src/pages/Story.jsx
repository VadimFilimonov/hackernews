import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Stack } from "react-bootstrap";
import routes from '../routes';

const Story = () => {
  const { id } = useParams();
  const story = useSelector((state) =>
    state.stories.list.find((story) => story.id === Number(id))
  );

  if (!story) {
    return null;
  }

  return (
    <Stack>
      <Link to={routes.homePath()}>Home</Link>
      <a href={story.url}>Source</a>
      <h1>{story.title}</h1>
      <time>{story.time}</time>
      <div>
        {story.score} points by {story.by}
      </div>
      <div>The total comments count: {story.descendants}</div>
    </Stack>
  );
};

export default Story;
