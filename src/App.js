import React, { useEffect }  from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { fetchStories } from "./slices/storiesSlice";
import Home from './pages/Home';
import Story from './pages/Story';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":id" exact element={<Story />} />
        </Routes>
    </Container>
  );
};

export default App;
