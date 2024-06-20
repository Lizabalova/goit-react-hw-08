import { Route, Routes } from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";
import Layout from "./Layout/Layout.jsx";
import Loader from "../components/Loader/Loader.jsx";
import RestrictedRoute from "./RestrictedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage.jsx"));
const ContactPage = lazy(() =>
  import("../pages/ContactsPage/ContactPage.jsx")
);
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage.jsx"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage.jsx"));

import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations.js";
import { selectIsRefreshing } from "../redux/auth/selectors.js";

export default function App() {
  const [loading] = useState(false); // State variable for loading indicator
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return null;
  }

  return (
    <Layout>
      {/* Display loader when 'loading' state is true */}
      {loading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactPage />} redirectTo="/login" />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
