import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Restaurant from './components/Restaurant';

const Instamart = lazy(() => import('./components/Instamart'));

const App = () => (
  <div className="bg-gray-50">
    <Header />
    <Outlet />
    <Footer />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/restaurant/:id',
        element: <Restaurant />
      },
      {
        path: '/instamart',
        element: (
          <Suspense>
            <Instamart />
          </Suspense>
        )
      }
    ]
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
