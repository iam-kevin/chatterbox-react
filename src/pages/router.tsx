import { createBrowserRouter, Outlet } from 'react-router-dom';
import WelcomePage from './welcome/index.page';

export const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/',
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [],
  },
]);
