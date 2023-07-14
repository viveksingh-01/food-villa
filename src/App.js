import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/about',
    element: <AboutUs />
  }
]);

const App = () => (
  <>
    <Header />
    <RouterProvider router={appRouter} />
  </>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
