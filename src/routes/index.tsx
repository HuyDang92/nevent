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
import ManageEventLayout from '~/Layout/ManageEventLayout';
import Statistics from '~/pages/ManageEvent/Statistics';
import RsvpsManage from '~/pages/ManageEvent/RsvpsManage';
import Pr from '~/pages/ManageEvent/Pr';
import Discount from '~/pages/ManageEvent/Discount';
import MyPallet from '~/pages/MyPallet/MyPallet';
import InformationBanking from '~/pages/InformationBanking/InformationBanking';
import PrIframe from '~/Layout/components/PrIframe';

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event-detail/:idEvent" element={<DetailEvent />} />
          <Route path="/event-categories" element={<Categories />} />
          <Route path="/event-categories/:idCate" element={<Categories />} />
          <Route path="/event-categories/:keyword" element={<Categories />} />
          <Route path="/search" element={<SearchMobile />} />
        </Route>

        {/* Giới thiệu */}
        <Route path="/about" element={<About />} />
        {/* Cho người tổ chức */}
        <Route path="/organizer-about" element={<Organizer />} />
        <Route element={<CreateEventLayout />}>
          <Route path="/organizer-my-pallet" element={<MyPallet />} />
          <Route path="/organizer-information-banking" element={<InformationBanking />} />
        </Route>
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
          <Route index path="payment/:step" element={<Payment />} />
          <Route element={<CreateEventLayout />}>
            <Route path="organization-profile" element={<OrganizationProfile />} />
          </Route>
        </Route>

        {/* Tạo sự kiện */}
        <Route></Route>
        {/* Tạo sự kiện */}
        <Route path="/organization" element={<PrivateRoute allowedRoles={['business']} />}>
          <Route element={<CreateEventLayout />}>
            <Route path="event-list" element={<EventManage />} />
            <Route path="create-event/:step" element={<CreateEvent />} />
            <Route path="organization-profile" element={<OrganizationProfile />} />
          </Route>
          <Route path="manage-event" element={<ManageEventLayout />}>
            <Route path="statistics/:idEvent" element={<Statistics />} />
            <Route path="rsvps/:idEvent" element={<RsvpsManage />} />
            <Route path="pr/:idEvent" element={<Pr />} />
            <Route path="discount/:idEvent" element={<Discount />} />
          </Route>
          <Route path="scan-ticket" element={<Scan />} />
        </Route>
        <Route path="/pr/:idEvent" element={<PrIframe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
