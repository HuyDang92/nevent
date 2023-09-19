/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Navbar, MobileNav, Typography, IconButton } from '@material-tailwind/react';
import SearchBar from '~/components/customs/SearchBar';
import Button from '~/components/customs/Button';
import IonIcon from '@reacticons/ionicons';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/customs/Dropdown';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SearchIcon from '@mui/icons-material/Search';

type HeaderProps = {
  className?: string;
};
const Header = ({ className }: HeaderProps) => {
  const checkUser = true; //change this when login

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      // Cleanup: remove the event listener when the component is unmounted
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to="/" className="">
        <Button value="Tạo sự kiện" type="button" className="hidden lg:block" />
      </Link>
      <Link
        to="./"
        className="hidden items-center rounded-lg px-3 py-1.5 text-cs_purple transition hover:bg-cs_purple hover:text-white lg:block"
      >
        <IonIcon name="wallet-outline" className="text-2xl" />
      </Link>
    </ul>
  );

  return (
    <header
      className={`sticky top-0 z-20 mx-auto w-full rounded-none bg-white p-1 px-[30px] shadow-border-light ${className}`}
    >
      <div className="mx-auto flex h-[70px] w-full max-w-[1728px] items-center justify-between">
        <div className="flex w-1/2 items-center gap-5">
          <Link to="/">
            <Typography className="cursor-pointer">
              <img src="./src/assets/svg/logo-desktop.svg" alt="123" className="hidden sm:block" />
              <img src="./src/assets/svg/logo-mobile.svg" alt="logo" className="sm:hidden" />
            </Typography>
          </Link>
          <SearchBar className="hidden lg:inline-block" />
        </div>
        <div className="flex items-center justify-end gap-3 lg:w-1/3">
          <div className="hidden lg:block">{navList}</div>
          <Link to="/" className="cursor-pointer sm:hidden">
            <SearchIcon />
          </Link>
          <Link to="/" className="cursor-pointer sm:hidden">
            <QrCodeScannerIcon className="" />
          </Link>
          <div className="hidden sm:block">
            {checkUser ? (
              <Dropdown />
            ) : (
              <Link to="/">
                <Typography className="cursor-pointer text-cs_purple sm:text-lg">Đăng nhập</Typography>
              </Link>
            )}
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
          </IconButton>
        </div>
      </div>

      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button> */}
        </div>
      </MobileNav>
    </header>
  );
};

export default Header;
