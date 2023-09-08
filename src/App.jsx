import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// layouts and pages
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Transaction from './pages/user/Transaction';
import EventCreation from './pages/organizers/eventCreation';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="register" element={<Register />} />
      <Route path="create" element={<EventCreation />} />
      <Route path="login" element={<Login />} />
      <Route path="transaction" element={<Transaction />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
