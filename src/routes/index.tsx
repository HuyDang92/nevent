import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/Layout/DefaultLayout';
import Home from '~/pages/Home';
import LogIn from '~/pages/Auth/LogIn';
import NotFound from '~/pages/NotFound';
import SignUp from '~/pages/Auth/SignUp';
import DetailEvent from '~/pages/DetailEvent';
import About from '~/pages/About';
import Categories from '~/pages/Categories';
import SignUpEmail from '~/pages/Auth/SignUpEmail';
import ForgotPassword from '~/pages/Auth/ForgotPassword';
import Payment from '~/pages/Payment';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { NotLoggedMiddleware } from './RouteMiddleware';

export default function AppRoutes() {
  const auth = useSelector((state: RootState) => state.auth.loggedIn);

  return (
    <>
      <Routes>
        {/* public */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event-detail/:slug" element={<DetailEvent />} />
          <Route path="/event-categories" element={<Categories />} />
          <Route path="/event-categories/:slug" element={<Categories />} />
        </Route>

        {/* Giới thiệu */}
        <Route path="/about" element={<About />} />
        {/* Cho người tổ chức */}
        <Route path="/organizer-about" element={<About />} />

        <Route element={<NotLoggedMiddleware />}>
          {/* đăng nhập */}
          <Route path="/login" element={<LogIn />} />
          {/* đăng ký */}
          <Route path="/signup" element={<SignUp />} />
          {/* đăng ký email */}
          <Route path="/signup-email" element={<SignUpEmail />} />
          {/* đăng quên mật khẩu */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* user */}
        <Route path="/user" element={<PrivateRoute allowedRoles={['user']} />}>
          <Route element={<DefaultLayout />}>
            <Route index path="profile" element={<DetailEvent />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
