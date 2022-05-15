import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import routes from './routes';
import Home from './pages/Home';
import Story from './pages/Story';

const App = () => {
  return (
    <Container className="my-5">
      <Routes>
        <Route path={routes.homePath()} element={<Home />} />
        <Route path="/hackernews/:id" exact element={<Story />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default App;
