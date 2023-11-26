import { BaseLayout } from '@/ui/layout/layout';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import MainPage from './app/index.page';
import { ChatRoomPage } from './app/room.page';
import WelcomePage from './welcome/index.page';

export const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/',
    element: (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    ),
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/room/:rid',
        element: <ChatRoomPage />,
      },
    ],
  },
]);
