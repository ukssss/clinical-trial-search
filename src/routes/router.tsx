import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { ErrorPage, SearchPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
