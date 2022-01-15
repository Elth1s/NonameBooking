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
import AdminCitiesList from './components/admin/Cities/List';
import UpdateCity from './components/admin/Cities/Update';
import CreateCity from './components/admin/Cities/Create';
import UserLayout from './components/containers/UserLayout';
import Profile from './components/user/Profile';
import WishList from './components/user/WishList';

import { useTypedSelector } from './hooks/useTypedSelector';
import CitiesList from './components/user/CitiesList';
import ApartmentsList from './components/user/ApartmentsList';
import ApartmentPage from './components/user/ApartmentPage';

function App() {
  const { isAuth, user: { roles } } = useTypedSelector((store) => store.auth);
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
          <Route path="/cities" element={<CitiesList />} />
          <Route path="/apartments" element={<ApartmentsList />} />
          <Route path="/apartment" element={<ApartmentPage />} />

        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LogIn />} />
          <Route path="/auth/signup" element={<SignUp />} />

        </Route>
        {isAuth && roles === "Admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/countries/list" element={<CountriesList />} />
            <Route path="/admin/countries/create" element={<CreateCountry />} />
            <Route path="/admin/countries/update/:id" element={<UpdateCountry />} />

            <Route path="/admin/cities/list" element={<AdminCitiesList />} />
            <Route path="/admin/cities/create" element={<CreateCity />} />
            <Route path="/admin/cities/update/:id" element={<UpdateCity />} />
          </Route>
        )}
        {isAuth && (
          <Route path="/user" element={<UserLayout />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/wishlist" element={<WishList />} />

          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
