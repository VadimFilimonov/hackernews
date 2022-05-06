import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Stack, Spinner } from "react-bootstrap";
import routes from "../../routes";

const Stories = () => {
  const { list, status } = useSelector((state) => state.stories);

  if (status === "loading") {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Stack gap={3}>
      {list.map((story) => (
        <Row key={story.id}>
          <h2 className="h5">
            <Link
              className="text-decoration-none"
              to={routes.newsPath(story.id)}
            >
              {story.title}
            </Link>
          </h2>
          <div>
            {story.score} points by {story.by}
          </div>
        </Row>
      ))}
    </Stack>
  );
};

export default Stories;
