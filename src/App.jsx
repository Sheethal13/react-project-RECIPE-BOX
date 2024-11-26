import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import WelcomePage from './pages/Welcome.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import DataContextProvider from './store/DataContext.jsx';
import Favorites from './pages/Favorites.jsx';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <WelcomePage /> ,
    children: [
    {
      path:'login',
      element:<Login/>
    },
    {
      path:'signup',
      element:<Signup/>
    },
    
  ]
  },
  {
    path:'recipes/:id',
    element:<RecipeDetail/>
  },
  {
    path:'my-favorites',
    element:<Favorites/>
  }
]);

function App() {
  return   <DataContextProvider>
  <RouterProvider router={router} />
  </DataContextProvider>;
}

export default App;
