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
import AdminTypeOfApartmentsList from './components/admin/TypeOfApartments/List';
import UpdateTypeOfApartment from './components/admin/TypeOfApartments/Update';
import CreateTypeOfApartment from './components/admin/TypeOfApartments/Create';
import AdminFilterGroupsList from './components/admin/FilterGroups/List';
import UpdateFilterGroup from './components/admin/FilterGroups/Update';
import CreateFilterGroup from './components/admin/FilterGroups/Create';
import AdminFiltersList from './components/admin/Filters/List';
import UpdateFilter from './components/admin/Filters/Update';
import CreateFilter from './components/admin/Filters/Create';
import AdminApartmentsList from './components/admin/Apartments/List';
import UserLayout from './components/containers/UserLayout';
import Profile from './components/user/Profile';
import UserApartmentsList from './components/user/Apartments/List';
import CreateApartment from './components/user/Apartments/Create';
import UpdateApartment from './components/user/Apartments/Update';
import ApartmentOrdersList from './components/user/Apartments/Orders/List';
import ApartmentViewOrder from './components/user/Apartments/Orders/View';

import OrdersList from './components/user/Orders/List';
import ViewOrder from './components/user/Orders/View';

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
          <Route element={<AdminLayout />}>
            <Route path="/admin/countries/list" element={<CountriesList />} />
            <Route path="/admin/countries/create" element={<CreateCountry />} />
            <Route path="/admin/countries/update/:id" element={<UpdateCountry />} />

            <Route path="/admin/cities/list" element={<AdminCitiesList />} />
            <Route path="/admin/cities/create" element={<CreateCity />} />
            <Route path="/admin/cities/update/:id" element={<UpdateCity />} />

            <Route path="/admin/typeOfApartments/list" element={<AdminTypeOfApartmentsList />} />
            <Route path="/admin/typeOfApartments/create" element={<CreateTypeOfApartment />} />
            <Route path="/admin/typeOfApartments/update/:id" element={<UpdateTypeOfApartment />} />

            <Route path="/admin/filterGroups/list" element={<AdminFilterGroupsList />} />
            <Route path="/admin/filterGroups/create" element={<CreateFilterGroup />} />
            <Route path="/admin/filterGroups/update/:id" element={<UpdateFilterGroup />} />

            <Route path="/admin/filters/list" element={<AdminFiltersList />} />
            <Route path="/admin/filters/create" element={<CreateFilter />} />
            <Route path="/admin/filters/update/:id" element={<UpdateFilter />} />

            <Route path="/admin/apartments/list" element={<AdminApartmentsList />} />
          </Route>
        )}
        {isAuth && (
          <Route path="/user" element={<UserLayout />}>
            <Route path="/user/profile" element={<Profile />} />
            {/* <Route path="/user/wishlist" element={<WishList />} /> */}
            <Route path="/user/apartments/list" element={<UserApartmentsList />} />
            <Route path="/user/apartments/create" element={<CreateApartment />} />
            <Route path="/user/apartments/update/:id" element={<UpdateApartment />} />
            <Route path="/user/apartments/orders/list/:id" element={<ApartmentOrdersList />} />
            <Route path="/user/apartments/orders/view/:id" element={<ApartmentViewOrder />} />


            <Route path="/user/orders/list" element={<OrdersList />} />
            <Route path="/user/orders/view/:id" element={<ViewOrder />} />

          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
