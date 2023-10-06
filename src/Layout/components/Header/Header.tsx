/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import SearchBar from '~/components/customs/SearchBar';
import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import ToggleDarkMode from '~/components/customs/DarkMode/DarkMode';
import { useCurrentViewportView } from '~/hooks/useViewPort';
import Icon from '~/components/customs/Icon';
import logoDark from '~/assets/images/logoDark.png';
import logoWhite from '~/assets/images/logoWhite.png';
import { RootState } from '~/store/store';
import { useSelector } from 'react-redux';
type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { width } = useCurrentViewportView();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (width < 540) {
      setOpenNav(true);
    }
  }, [width]);

  const navList = (
    <ul className="flex items-center gap-2">
      <Link to="/" className="cursor-pointer px-2 text-cs_semi_green xl:hidden">
        <Icon name="search" className="text-2xl hover:scale-110" />
      </Link>
      <Link to="/" className="cursor-pointer px-2 text-cs_semi_green xl:hidden">
        <Icon name="qr-code-outline" className="text-2xl hover:scale-110" />
      </Link>
      <Link to="/" className=" items-center rounded-lg px-2 text-cs_semi_green transition hover:scale-110">
        <Icon name="notifications" className="text-2xl hover:scale-110" />
      </Link>
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
      <Link to="/" className="hidden sm:inline-block">
        <Button value="Tạo sự kiện" type="button" className="" mode="light" />
      </Link>
    </ul>
  );

  return (
    <header
      className={`sticky top-0 z-20 flex  items-center justify-between rounded-none bg-cs_light py-3 shadow-border-light  dark:bg-cs_lightDark  ${className} sm:px-5`}
    >
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={logoDark} alt="logo" className=" h-[20px] w-[40px] dark:hidden" />
          <img src={logoWhite} alt="logo" className=" hidden h-[20px] w-[40px] dark:block" />
          <span className="text-xl font-black text-cs_semi_green">NEVENT</span>
          <SearchBar className="ms-5 hidden rounded-xl shadow-border-light xl:block" />
        </div>
      </Link>
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
