import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/Layout/DefaultLayout';
import Home from '~/pages/Home';
import LogIn from '~/pages/Auth/LogIn';
import NotFound from '~/pages/NotFound';
import SignUp from '~/pages/Auth/SignUp';
import PrivateRoute from './PrivateRoute';
import DetailEvent from '~/pages/DetailEvent';
import About from '~/pages/About';
import Categories from '~/pages/Categories';
import SignUpEmail from '~/pages/Auth/SignUpEmail';
import ForgotPassword from '~/pages/Auth/ForgotPassword';
import Payment from '~/pages/Payment';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event-detail/:slug" element={<DetailEvent />} />
          <Route path="/event-categories/:slug" element={<Categories />} />
          {/* Thanh toán */}
          <Route path="/payment" element={<Payment />} />
        </Route>

        {/* Giới thiệu */}
        <Route path="/about" element={<About />} />

        {/* Cho người tổ chức */}
        <Route path="/organizer-about" element={<About />} />

        {/* đăng nhập */}
        <Route path="/login" element={<LogIn />} />

        {/* đăng ký */}
        <Route path="/signup" element={<SignUp />} />

        {/* đăng ký email */}
        <Route path="/signup-email" element={<SignUpEmail />} />

        {/* đăng quên mật khẩu */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* user */}
        {/* <Route path="/student" element={<PrivateRoute allowedRoles={['user']} />}>
          <Route element={<DefaultLayout />}>
            <Route index path="" element={<Home />} />
          </Route>
        </Route> */}

        <Route path="*" element={<Navigate to="/NotFound-404" />} />
        <Route path="/NotFound-404" element={<NotFound />} />
      </Routes>
    </>
  );
}
