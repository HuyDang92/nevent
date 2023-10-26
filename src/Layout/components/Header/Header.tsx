import SearchBar from '~/components/customs/SearchBar';
import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import ToggleDarkMode from '~/components/customs/DarkMode/DarkMode';
import Icon from '~/components/customs/Icon';
import logo from '~/assets/images/logo.png';
import logoWhite from '~/assets/images/logoWhite.png';
import { useAppSelector } from '~/hooks/useActionRedux';
import Notifications from '~/components/Notifications';

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const notificationData = [
    {
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      name: 'Tania',
      desc: 'send you a message',
      time: '13 minutes',
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      name: 'Tania',
      desc: 'send you a message',
      time: '13 minutes',
    },
    {
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      name: 'Tania',
      desc: 'send you a message',
      time: '13 minutes',
    },
  ];

  const auth = useAppSelector((state) => state.auth);

  const navList = (
    <ul className="flex items-center gap-2">
      {/* <Link to="/" className="cursor-pointer px-2 text-cs_semi_green xl:hidden">
        <Icon name="search" className="text-2xl hover:scale-110" />
      </Link> */}
      <Link to="/" className="cursor-pointer px-2 text-cs_semi_green xl:hidden">
        <Icon name="qr-code-outline" className="text-2xl hover:scale-110" />
      </Link>
      {/* <Link to="/" className=" items-center rounded-lg px-2 text-cs_semi_green transition hover:scale-110">
        <Icon name="notifications" className="text-2xl hover:scale-110" />
      </Link> */}
      <Notifications data={notificationData} />

      <Link
        to="/"
        className="hidden items-center rounded-lg px-2 text-cs_semi_green transition hover:scale-110 sm:inline-block"
      >
        <Icon name="wallet" className="text-2xl" />
      </Link>

      <ToggleDarkMode>
        <p className=" hidden text-cs_semi_green dark:block">
          <Icon name="sunny" className="text-2xl hover:scale-110" />
        </p>
        <p className=" text-cs_semi_green dark:hidden">
          <Icon name="moon" className="text-2xl hover:scale-110 dark:hidden" />
        </p>
      </ToggleDarkMode>
      <Link to="/organization-profile" className="hidden sm:inline-block">
        <Button value="Tạo sự kiện" type="button" className="" mode="light" />
      </Link>
    </ul>
  );

  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between rounded-none bg-cs_light px-2 py-3 shadow-border-full  dark:bg-cs_lightDark  ${className} sm:px-5`}
    >
      <div className="flex items-center">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className=" h-[20px] w-[40px] dark:hidden" />
            <img src={logoWhite} alt="logo" className=" hidden h-[20px] w-[40px] dark:block" />
            <span className="text-xl font-extrabold text-cs_semi_green dark:text-cs_light">NEVENT</span>
          </div>
        </Link>
        <SearchBar className="ms-5 hidden rounded-xl border shadow-border-light xl:block" />
      </div>
      <div className="flex items-center justify-end gap-3">
        <div className="">{navList}</div>
        <div className="">
          {auth.loggedIn ? (
            <Dropdown auth={auth} />
          ) : (
            <Link to="/login" className="hidden sm:inline-block">
              <Button value="Đăng nhập" type="button" className="" mode="dark" />
            </Link>
          )}
        </div>
        {/* <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent sm:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6  "
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6  "
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton> */}
      </div>
      {/* <div className="flex items-center justify-between">
      </div> */}
    </header>
  );
};

export default Header;
