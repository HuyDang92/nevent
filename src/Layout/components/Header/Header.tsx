/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Navbar, MobileNav, Typography, IconButton } from '@material-tailwind/react';
import SearchBar from '~/components/customs/SearchBar';
import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/customs/Dropdown';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SearchIcon from '@mui/icons-material/Search';
import { Dialog } from '@material-tailwind/react';
import ToggleDarkMode from '~/components/customs/DarkMode/DarkMode';
import Icon from '~/components/customs/Icon';
import { useCurrentViewportView } from '~/hooks/useViewPort';

type HeaderProps = {
  className?: string;
};
const Header = ({ className }: HeaderProps) => {
  const checkUser = false; //change this when login
  const { width } = useCurrentViewportView();
  const [openNav, setOpenNav] = useState(false);

  //open SearchBar Mobile
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (width >= 960) {
      setOpenNav(false);
    }
  }, []);

  const navList = (
    <ul className="flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
      <Link
        to="./"
        className="hidden items-center rounded-lg px-3 py-1 pt-2 text-cs_dark transition hover:bg-cs_dark hover:text-white hover:shadow-border-light lg:block"
      >
        <Icon name="notifications" className="text-2xl" />
      </Link>
      <Link
        to="./"
        className="hidden items-center rounded-lg px-3 py-1 pt-2 text-cs_dark transition hover:bg-cs_dark hover:text-white hover:shadow-border-light lg:block"
      >
        <Icon name="wallet" className="text-2xl" />
      </Link>

      <ToggleDarkMode>
        <Icon name="moon" className="text-2xl" />
      </ToggleDarkMode>
      <Link to="/" className="">
        <Button value="Tạo sự kiện" type="button" className="hidden lg:block" mode="light" />
      </Link>
    </ul>
  );

  return (
    <header className={`rounded-none py-4 ${className} px-5`}>
      <div className="flex items-center justify-between">
        <SearchBar className="hidden rounded-xl shadow-border-light lg:inline-block" />
        <div className="flex items-center justify-end gap-3 ">
          <div className="hidden lg:block">{navList}</div>
          <Link to="/" className="cursor-pointer sm:hidden">
            <SearchIcon onClick={() => setOpen(!open)} />
          </Link>
          <Link to="/" className="cursor-pointer sm:hidden">
            <QrCodeScannerIcon className="" />
          </Link>
          <div className="hidden sm:block">
            {checkUser ? (
              <Dropdown />
            ) : (
              <Link to="/login">
                <Button value="Đăng nhập" type="button" className="hidden lg:block" mode="dark" />
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
      <Dialog open={open} handler={() => setOpen(!open)} className="inline-block bg-transparent">
        <SearchBar className="w-full" />
      </Dialog>
    </header>
  );
};

export default Header;
