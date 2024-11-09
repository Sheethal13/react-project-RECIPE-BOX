import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import WelcomePage from './pages/Welcome.jsx';
import ChallengesPage from './pages/Challenges.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import DataContextProvider from './store/DataContext.jsx';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <WelcomePage /> ,
    children: [
      {
      path: 'challenges',
      element: <ChallengesPage/>
    },
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
  }
]);

function App() {
  return   <DataContextProvider>
  <RouterProvider router={router} />
  </DataContextProvider>;
}

export default App;
