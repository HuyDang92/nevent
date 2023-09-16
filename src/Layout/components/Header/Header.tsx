<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> b1cdfa534284af53a65697ea01252dac39a74207
import { Navbar, MobileNav, Typography, IconButton } from '@material-tailwind/react';
import SearchBar from '~/components/customs/SearchBar';
import Button from '~/components/customs/Button';
import IonIcon from '@reacticons/ionicons';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/customs/Dropdown';
<<<<<<< HEAD

type HeaderProps = {
  className?: string;
};
const Header = ({ className }: HeaderProps) => {
=======
import logo from '~/assets/images/logo.svg';
const Header = () => {
>>>>>>> b1cdfa534284af53a65697ea01252dac39a74207
  const checkUser = true; //change this when login

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
<<<<<<< HEAD

    window.addEventListener('resize', handleResize);

    // Gỡ bỏ event listener trong hàm dọn dẹp của useEffect
    return () => {
=======
    window.addEventListener('resize', handleResize);
    return () => {
      // Cleanup: remove the event listener when the component is unmounted
>>>>>>> b1cdfa534284af53a65697ea01252dac39a74207
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link to="./" className="">
        <Button value="Tạo sự kiện" type="button" className="hidden lg:block" />
        <div className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-cs_purple transition hover:bg-cs_purple hover:text-white lg:hidden">
          <IonIcon name="add-circle-outline" className="text-2xl " />
          <Typography className="cursor-pointer text-lg ">Tạo sự kiện</Typography>
        </div>
      </Link>
      <Link
        to="./"
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-cs_purple transition hover:bg-cs_purple hover:text-white"
      >
        <IonIcon name="wallet-outline" className="text-2xl " />
        <Typography className="cursor-pointer text-lg  lg:hidden">Ví của tôi</Typography>
      </Link>
    </ul>
  );

  return (
<<<<<<< HEAD
    <Navbar className={` mx-auto w-full rounded-none ${className}`}>
      <div className="flex w-full items-center justify-between">
=======
    <Navbar className=" w-full rounded-none py-1">
      <div className="flex items-center justify-between">
>>>>>>> b1cdfa534284af53a65697ea01252dac39a74207
        <div className="flex w-1/2 items-center gap-5">
          <Link to="/">
            <Typography className="cursor-pointer">
              <img src="./src/assets/svg/logo-desktop.svg" alt="" />
            </Typography>
          </Link>
          <SearchBar className="hidden lg:inline-block" />
        </div>
        <div className="flex items-center justify-end gap-5 lg:w-1/3">
          <div className="hidden lg:block">{navList}</div>
          <div className="">
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
