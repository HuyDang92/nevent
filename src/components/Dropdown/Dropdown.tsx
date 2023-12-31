import { Avatar } from '@material-tailwind/react';
import avtDefault from '~/assets/images/default-avatar.jpg';
import { motion, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Button from '../customs/Button';
import { logout, setAuthCurrentUser, setBusinessProfile } from '~/features/Auth/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import Icon from '../customs/Icon';
import useClickOutside from '~/hooks/useClickOutside';
import { useSwapRoleMutation } from '~/features/Auth/authApi.service';
import Loading from '../customs/Loading';
import { successNotify } from '../customs/Toast';
import { addUserInfor } from '~/features/Payment/paymentSlice';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
};

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const currentBusiness = useAppSelector((state) => state.auth.businessInfo);
  const auth = useAppSelector((state) => state.auth.currentUser);
  const historyUrl = useAppSelector((state) => state.auth.historyUrl);

  const [swapRole, resultSwap] = useSwapRoleMutation();

  useClickOutside(ref, () => {
    setIsOpen(false);
  });
  const handleLogOut = () => {
    dispatch(logout());
    dispatch(setBusinessProfile(null));
    dispatch(addUserInfor(null));
    navigate('/login');
  };
  const handleSwapRole = async (type: string) => {
    if (!currentBusiness && type !== 'swap') {
      navigate('/organization/organization-profile');
      return;
    }
    await swapRole({
      email: auth?.email,
      role: auth?.role?.name === 'business' ? 'user' : 'business',
    });
    // await getProfile();
  };

  useEffect(() => {
    if (resultSwap.isSuccess) {
      dispatch(setAuthCurrentUser(resultSwap.data?.data?.user));
      dispatch(setBusinessProfile(resultSwap.data?.data?.businessProfile));
      if (auth?.role?.name === 'business' && resultSwap.data?.data?.user?.role?.name === 'user') {
        successNotify('Đã chuyển sang  vai trò người dùng');
        navigate(historyUrl ?? '/');
      } else if (auth?.role?.name === 'user' && resultSwap.data?.data?.user?.role?.name === 'business') {
        successNotify('Đã chuyển sang vai trò ban tổ chức');
        navigate('/organization/event-list');
      }
    }
  }, [resultSwap.isLoading]);

  return (
    <>
      {resultSwap.isLoading && <Loading />}
      <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} className="menu relative">
        <motion.button
          ref={ref}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full border-2 border-cs_semi_green "
        >
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="h-10 w-10 cursor-pointer object-cover shadow-border-light"
            src={auth?.avatar?.url ?? avtDefault}
          />
        </motion.button>
        <motion.ul
          className="absolute right-0 top-[140%] z-20 w-[260px] space-y-2 rounded-2xl border bg-cs_light p-2 shadow-border-full dark:border dark:bg-cs_lightDark"
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <motion.li variants={itemVariants} className="space-y-2 py-2 pb-0 text-center">
            <Avatar
              variant="circular"
              alt="tania andrew"
              size="xl"
              className="cursor-pointer border-2 border-cs_semi_green object-cover shadow-border-light"
              src={auth?.avatar?.url ?? avtDefault}
            />
            <h5 className="font-semibold dark:text-cs_light">{auth?.fullName}</h5>
            <span className="text-xs text-cs_gray">{auth?.email} </span>
          </motion.li>
          <motion.li variants={itemVariants}>
            {auth?.role?.name === 'business' && (
              <p
                onClick={() => handleSwapRole('swap')}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 text-cs_lightDark transition-all hover:bg-cs_semi_green hover:text-cs_semi_green hover:shadow-border-light dark:text-cs_light"
              >
                <Icon name="ticket" className="text-cs_lightDark group-hover:text-cs_light dark:text-cs_light" />
                <span className="group-hover:text-cs_light">Vai trò người dùng</span>
              </p>
            )}
            {auth?.role?.name === 'user' && (
              <Link
                to={'/user/profile/1'}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 text-cs_lightDark transition-all hover:bg-cs_semi_green hover:text-cs_semi_green hover:shadow-border-light dark:text-cs_light"
              >
                <Icon name="ticket" className="text-cs_lightDark group-hover:text-cs_light dark:text-cs_light" />
                <span className="group-hover:text-cs_light">Vé của tôi</span>
              </Link>
            )}
          </motion.li>
          <motion.li variants={itemVariants} className="hidden lg:block">
            {auth?.role?.name === 'business' && currentBusiness ? (
              <Link
                to={'/organization/event-list'}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 text-cs_lightDark transition-all hover:bg-cs_semi_green hover:text-cs_semi_green hover:shadow-border-light dark:text-cs_light"
              >
                <Icon name="calendar" className="text-cs_lightDark group-hover:text-cs_light dark:text-cs_light" />
                <span className="group-hover:text-cs_light">Sự kiện đã tạo</span>
              </Link>
            ) : (
              <>
                {auth?.role?.name === 'user' && currentBusiness ? (
                  <div
                    onClick={() => handleSwapRole('swap')}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 text-cs_lightDark transition-all hover:bg-cs_semi_green hover:text-cs_semi_green hover:shadow-border-light dark:text-cs_light"
                  >
                    <Icon name="calendar" className="text-cs_lightDark group-hover:text-cs_light dark:text-cs_light" />
                    <span className="group-hover:text-cs_light">Vai trò ban tổ chức</span>
                  </div>
                ) : (
                  <Link
                    to={'/organization/organization-profile'}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 text-cs_lightDark transition-all hover:bg-cs_semi_green hover:text-cs_semi_green hover:shadow-border-light dark:text-cs_light"
                  >
                    <Icon name="calendar" className="text-cs_lightDark group-hover:text-cs_light dark:text-cs_light" />
                    <span className="group-hover:text-cs_light">Tạo sự kiện</span>
                  </Link>
                )}
              </>
            )}
          </motion.li>
          <motion.li variants={itemVariants}>
            {auth?.role?.name === 'business' ? (
              <Link
                to={'/organization/organization-profile'}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 text-cs_lightDark transition-all hover:bg-cs_semi_green hover:text-cs_semi_green hover:shadow-border-light dark:text-cs_light"
              >
                <Icon name="people" className="text-cs_lightDark group-hover:text-cs_light dark:text-cs_light" />
                <span className="group-hover:text-cs_light">Hồ sơ ban tổ chức</span>
              </Link>
            ) : (
              <Link
                to={'/user/profile/0'}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-2 px-4 text-cs_lightDark transition-all hover:bg-cs_semi_green hover:text-cs_semi_green hover:shadow-border-light dark:text-cs_light"
              >
                <Icon name="person" className="text-cs_lightDark group-hover:text-cs_light dark:text-cs_light" />
                <span className="group-hover:text-cs_light">Hồ sơ cá nhân</span>
              </Link>
            )}
          </motion.li>
          <motion.li variants={itemVariants} className="">
            <Button onClick={handleLogOut} value="Đăng xuất" mode="dark" className="w-full" />
          </motion.li>
        </motion.ul>
      </motion.nav>
    </>
  );
};
export default Dropdown;
