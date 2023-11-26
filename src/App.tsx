import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './pages/router';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
