import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';



import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import AdminLayout from './components/containers/AdminLayout';
import AuthLayout from './components/containers/AuthLayout';
import DefaultLayout from './components/containers/DefaultLayout';
import HomePage from './components/Home';
import NotFound from './components/NotFound';
import CountriesList from './components/admin/Countries/List';
import UpdateCountry from './components/admin/Countries/Update';
import CreateCountry from './components/admin/Countries/Create';
import UserLayout from './components/containers/UserLayout';
import Profile from './components/user/Profile';
import WishList from './components/user/WishList';

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
          <Route path="/admin/countries/list" element={<CountriesList />} />
          <Route path="/admin/countries/create" element={<CreateCountry />} />
          <Route path="/admin/countries/update/:id" element={<UpdateCountry />} />

        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/wishlist" element={<WishList />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
