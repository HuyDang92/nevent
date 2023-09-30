/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { IconButton } from '@material-tailwind/react';
import SearchBar from '~/components/customs/SearchBar';
import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/customs/Dropdown';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ToggleDarkMode from '~/components/customs/DarkMode/DarkMode';
import { useCurrentViewportView } from '~/hooks/useViewPort';
import Icon from '~/components/customs/Icon';

import logo from '~/assets/images/logo.svg';

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const checkUser = false; //change this when login
  const { width } = useCurrentViewportView();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (width < 540) {
      setOpenNav(true);
    }
  }, [width]);

  const navList = (
    <ul className="flex items-center gap-2">
      {/* <Link to="/" className="cursor-pointer lg:hidden">
            <SearchIcon onClick={() => setOpen(!open)} />
          </Link>
           */}

      <Link to="/" className="cursor-pointer px-2 lg:hidden">
        <Icon name="search" className="text-2xl" />
      </Link>
      <Link to="/" className="cursor-pointer px-2 lg:hidden">
        <Icon name="qr-code-outline" className="text-2xl" />
      </Link>
      <Link
        to="./"
        className=" items-center rounded-lg px-2 text-cs_dark transition hover:bg-cs_dark hover:text-white hover:shadow-border-light"
      >
        <Icon name="notifications" className="text-2xl" />
      </Link>
      <Link
        to="./"
        className="hidden items-center rounded-lg px-2 text-cs_dark transition hover:bg-cs_dark hover:text-white hover:shadow-border-light sm:inline-block"
      >
        <Icon name="wallet" className="text-2xl" />
      </Link>

      <ToggleDarkMode>
        <Icon name="moon" className="text-2xl" />
      </ToggleDarkMode>
      <Link to="/" className="hidden sm:inline-block">
        <Button value="Tạo sự kiện" type="button" className="" mode="light" />
      </Link>
    </ul>
  );

  return (
    <header className={`flex items-center justify-between rounded-none py-1 sm:py-4 sm:block ${className} sm:px-5`}>
      <img src={logo} alt="logo" className="sm:hidden" />
      <div className="flex items-center justify-end lg:justify-between">
        <SearchBar className="hidden rounded-xl shadow-border-light lg:block" />
        <div className="flex items-center justify-end gap-3">
          <div className="">{navList}</div>
          <div className="">
            {checkUser ? (
              <Dropdown />
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
      </div>
    </header>
  );
};

export default Header;
