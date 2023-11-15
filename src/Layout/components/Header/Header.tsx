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
  const auth = useAppSelector((state) => state.auth);

  const navList = (
    <ul className="flex items-center gap-2">
      {/* <Link to="/" className="cursor-pointer px-2 text-cs_semi_green xl:hidden">
        <Icon name="search" className="text-2xl hover:scale-110" />
      </Link> */}
      {/* <Link to="/" className=" items-center rounded-lg px-2 text-cs_semi_green transition hover:scale-110">
        <Icon name="notifications" className="text-2xl hover:scale-110" />
      </Link> */}
      <Notifications />

      <Link
        to="/user/profile/1"
        className="hidden items-center rounded-lg px-2 text-cs_semi_green transition hover:scale-110 sm:inline-block"
      >
        <Icon name="ticket" className="text-2xl" />
      </Link>
      <ToggleDarkMode />

      <Link to="/user/organization-profile" className="hidden :inline-block">
        <Button value="Tạo sự kiện" type="button" className="" mode="light" />
      </Link>
    </ul>
  );

  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between rounded-none bg-cs_light px-2 py-3 shadow-border-light  dark:bg-cs_lightDark  ${className} sm:px-5`}
    >
      <div className="flex items-center gap-8">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className=" h-[20px] w-[40px] dark:hidden" />
            <img src={logoWhite} alt="logo" className=" hidden h-[20px] w-[40px] dark:block" />
            <span className="text-xl font-extrabold text-cs_semi_green dark:text-cs_light">NEVENT</span>
          </div>
        </Link>
        <SearchBar className="hidden rounded-xl border shadow-border-light xl:block" />
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
      </div>
    </header>
  );
};

export default Header;
