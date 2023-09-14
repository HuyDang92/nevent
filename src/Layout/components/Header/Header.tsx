import React from 'react';
import { Navbar, MobileNav, Typography, IconButton } from '@material-tailwind/react';
import SearchBar from '~/components/customs/SearchBar';
import Button from '~/components/customs/Button';
import IonIcon from '@reacticons/ionicons';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/customs/Dropdown';

const Header = () => {
  const checkUser = true; //change this when login

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to="./">
        <Button value="Tạo sự kiện" type="button" className="rounded-full border-2 border-cs_purple text-cs_purple" />
      </Link>
      <Link to="./">
        <IonIcon name="wallet-outline" className="text-3xl text-cs_purple" />
      </Link>
    </ul>
  );

  return (
    <Navbar className="mx-auto w-full rounded-none py-4">
      <div className="container mx-auto flex items-center justify-around">
        <div className="flex w-1/2 items-center gap-5">
          <Link to="./">
            <Typography className="cursor-pointer">
              <img src="./src/assets/images/Logo-desktop.png" alt="" />
            </Typography>
          </Link>
          <SearchBar />
        </div>
        <div className="flex w-1/3 items-center justify-end gap-5">
          <div className="hidden lg:block">{navList}</div>
          {checkUser ? (
            <Dropdown />
          ) : (
            <Link to="./">
              <Typography className="cursor-pointer text-lg text-cs_purple">Đăng nhập</Typography>
            </Link>
          )}
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
                className="h-6 w-6 text-cs_purple "
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cs_purple "
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
    </Navbar>
  );
};

export default Header;
