import { Routes, Route } from 'react-router-dom';

import './App.css';
import AdminLayout from './components/containers/AdminLayout';
import AuthLayout from './components/containers/AuthLayout';
import DefaultLayout from './components/containers/DefaultLayout';
import HomePage from './components/Home';
import NoMatch from './components/NoMatch';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />

        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<HomePage />} />


        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HomePage />} />


        </Route>
      </Routes>
    </>
  );
}

export default App;
