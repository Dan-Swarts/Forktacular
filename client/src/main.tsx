import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RecipeBook from './pages/RecipeBook';
import RecipeMaker from './pages/RecipeMaker';
import UserInfo from './pages/UserInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, 
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'recipe-book',
        element: <RecipeBook />
      },
      {
        path: 'recipe-maker',
        element: <RecipeMaker />
      },
      {
        path: 'user-info',
        element: <UserInfo />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}