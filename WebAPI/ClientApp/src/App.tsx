import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';


import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import AdminLayout from './components/containers/AdminLayout';
import AuthLayout from './components/containers/AuthLayout';
import DefaultLayout from './components/containers/DefaultLayout';
import HomePage from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />

        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LogIn />} />
          <Route path="/auth/signup" element={<SignUp />} />

        </Route>
        <Route path="/admin" element={<AdminLayout />}>


        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
