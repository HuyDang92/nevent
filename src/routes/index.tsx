import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/Layout/DefaultLayout';
import Home from '~/pages/Home';
import LogIn from '~/pages/Auth/LogIn';
import NotFound from '~/pages/NotFound';
import SignUp from '~/pages/Auth/SignUp';
import DetailEvent from '~/pages/DetailEvent';
import About from '~/pages/About';
import Categories from '~/pages/Categories';
import ForgotPassword from '~/pages/Auth/ForgotPassword';
import Payment from '~/pages/Payment';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { NotLoggedMiddleware } from './RouteMiddleware';
import FAQ from '~/pages/FAQ';
import CreateEventLayout from '~/Layout/CreateEventLayout';
import Profile from '~/pages/Auth/Profile';
//Trang tạo sự kiện
import OrganizationProfile from '~/pages/CreateEvent/OrganizationProfile';
import EventManage from '~/pages/CreateEvent/EventManage';
import CreateEvent from '~/pages/CreateEvent/CreateEvent';
import Organizer from '~/pages/Organizer';
import SearchMobile from '~/pages/SearchMobile';
import Scan from '~/pages/Scan/Scan';
import PassTicket from '~/pages/Auth/PassTicket';

export default function AppRoutes() {
  const auth = useSelector((state: RootState) => state.auth.loggedIn);

  return (
    <>
      <Routes>
        {/* public */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event-detail/:idEvent" element={<DetailEvent />} />
          <Route path="/event-categories" element={<Categories />} />
          <Route path="/event-categories/:keyword" element={<Categories />} />
          <Route path="/search" element={<SearchMobile />} />
        </Route>

        {/* Giới thiệu */}
        <Route path="/about" element={<About />} />
        {/* Cho người tổ chức */}
        <Route path="/organizer-about" element={<Organizer />} />
        {/* FAQ */}
        <Route path="/help-center" element={<FAQ />} />

        <Route element={<NotLoggedMiddleware />}>
          {/* đăng nhập */}
          <Route path="/login" element={<LogIn />} />
          {/* đăng ký */}
          <Route path="/signup" element={<SignUp />} />

          {/* đăng quên mật khẩu */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* user */}
        <Route path="/user" element={<PrivateRoute allowedRoles={['user']} />}>
          <Route element={<DefaultLayout />}>
            <Route index path="profile/:tab" element={<Profile />} />
            <Route index path="pass-event" element={<PassTicket />} />
          </Route>
          <Route index path="payment/:idEvent/:step" element={<Payment />} />
        </Route>

        {/* Tạo sự kiện */}
        <Route>
          <Route element={<CreateEventLayout />}>
            <Route path="/organization-profile" element={<OrganizationProfile />} />
            <Route path="/event-manage" element={<EventManage />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/create-event2/" element={<Categories />} />
            <Route path="/create-event3/" element={<Categories />} />
          </Route>
        </Route>

        {/* Scan ticket */}
        <Route element={<PrivateRoute allowedRoles={['bussiness']} />}>
          <Route element={<DefaultLayout />}>
            <Route path="/scan-ticket" element={<Scan />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
