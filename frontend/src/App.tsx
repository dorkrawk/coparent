import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Routine from './pages/Routine';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'routine',
        element: <Routine />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;