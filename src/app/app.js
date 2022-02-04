import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { requireAuth } from '../common';
import { Routes }  from './routes';

function App() {
  return (
    <Suspense fallback={ <div>Loading...</div> }>
      <Router>
        <Routes />
      </Router>
    </Suspense>
  );
}

export default requireAuth(App);
