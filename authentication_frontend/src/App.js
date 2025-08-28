import React from 'react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

// PUBLIC_INTERFACE
function App() {
  /** Router host for the authentication app. */
  return <RouterProvider router={router} />;
}

export default App;
