import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// layouts and pages
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/eventorganizer/CreateEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Transaction from './pages/user/Transaction';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="register" element={<Register />} />
      <Route path="create-event" element={<CreateEvent />} />
      <Route path="login" element={<Login />} />
      <Route path="transaction/:id" element={<Transaction />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
