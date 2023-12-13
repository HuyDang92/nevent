import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotLoggedMiddleware } from './RouteMiddleware';
import LoadingPage from '~/pages/LoadingPage';
import NotFound from '~/pages/NotFound';
import VerifyEmail from '~/pages/Auth/VerifyEmail';

const FAQ = lazy(() => import('~/pages/FAQ'));
const PrivateRoute = lazy(() => import('./PrivateRoute'));
const DefaultLayout = lazy(() => import('~/Layout/DefaultLayout'));
const ManageEventLayout = lazy(() => import('~/Layout/ManageEventLayout'));
const About = lazy(() => import('~/pages/About'));
const DetailEvent = lazy(() => import('~/pages/DetailEvent'));
const EditEvent = lazy(() => import('~/pages/EditEvent'));
const Home = lazy(() => import('~/pages/Home'));
const LogIn = lazy(() => import('~/pages/Auth/LogIn'));
const SignUp = lazy(() => import('~/pages/Auth/SignUp'));
const Categories = lazy(() => import('~/pages/Categories'));
const ForgotPassword = lazy(() => import('~/pages/Auth/ForgotPassword'));
const Payment = lazy(() => import('~/pages/Payment'));
const CreateEventLayout = lazy(() => import('~/Layout/CreateEventLayout'));
const Profile = lazy(() => import('~/pages/Auth/Profile'));
const OrganizationProfile = lazy(() => import('~/pages/CreateEvent/OrganizationProfile'));
const EventManage = lazy(() => import('~/pages/CreateEvent/EventManage'));
const CreateEvent = lazy(() => import('~/pages/CreateEvent/CreateEvent'));
const Organizer = lazy(() => import('~/pages/Organizer'));
const SearchMobile = lazy(() => import('~/pages/SearchMobile'));
const Scan = lazy(() => import('~/pages/Scan/Scan'));
const PassTicket = lazy(() => import('~/pages/Auth/PassTicket'));
const Statistics = lazy(() => import('~/pages/ManageEvent/Statistics'));
const CustomersManage = lazy(() => import('~/pages/ManageEvent/CustomersManage'));
const Pr = lazy(() => import('~/pages/ManageEvent/Pr'));
const Discount = lazy(() => import('~/pages/ManageEvent/Discount'));
const MyPallet = lazy(() => import('~/pages/MyPallet/MyPallet'));
const InformationBanking = lazy(() => import('~/pages/InformationBanking/InformationBanking'));
const PrIframe = lazy(() => import('~/Layout/components/PrIframe'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* public */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event-detail/:idEvent" element={<DetailEvent />} />
          <Route path="/event-categories" element={<Categories />} />
          <Route path="/event-categories/:idCate" element={<Categories />} />
          <Route path="/event-categories-search/:keyword" element={<Categories />} />
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
          {/* verify email*/}
          <Route path="/verify" element={<VerifyEmail />} />
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
        <Route path="/organization" element={<PrivateRoute allowedRoles={['user', 'business']} />}>
          <Route element={<CreateEventLayout />}>
            <Route path="organization-profile" element={<OrganizationProfile />} />
          </Route>
        </Route>

        {/* Tạo sự kiện */}
        <Route path="/organization" element={<PrivateRoute allowedRoles={['business']} />}>
          <Route element={<CreateEventLayout />}>
            <Route path="event-list" element={<EventManage />} />
            <Route path="create-event/:step" element={<CreateEvent />} />
            <Route path="edit-event/:idEvent/:step" element={<EditEvent />} />
          </Route>
          <Route path="manage-event" element={<ManageEventLayout />}>
            <Route path="statistics/:idEvent" element={<Statistics />} />
            <Route path="customer/:idEvent" element={<CustomersManage />} />
            <Route path="pr/:idEvent" element={<Pr />} />
            <Route path="discount/:idEvent" element={<Discount />} />
            <Route path="scan-ticket/:idEvent" element={<Scan />} />
          </Route>
        </Route>
        <Route path="scan-ticket/:idEvent" element={<Scan />} />
        <Route path="/pr/:idEvent/:layout" element={<PrIframe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
