import { Link, Outlet } from 'react-router-dom';
import CreateEventSidebar from '../components/CreateEventSidebar';
import { useCurrentViewportView } from '~/hooks/useViewPort';
import logo from '~/assets/images/logo.png';
import logoWhite from '~/assets/images/logoWhite.png';
import notUse from '~/assets/images/notUse.png';
import Button from '~/components/customs/Button';

function CreateEventLayout() {
  const { width } = useCurrentViewportView();
  return (
    <>
      {width > 1080 ? (
        <div className="relative">
          <div className={`mx-auto flex`}>
            <CreateEventSidebar className="" />
            <main className={`w-full bg-cs_semi_green px-2 py-2 dark:bg-cs_dark`}>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <div className=" p-5">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className=" h-[20px] w-[40px] dark:hidden" />
            <img src={logoWhite} alt="logo" className=" hidden h-[20px] w-[40px] dark:block" />
            <span className="text-xl font-extrabold text-cs_semi_green dark:text-cs_light">NEVENT</span>
          </div>
          <div className="py-36 text-center">
            <img src={notUse} alt="" className="mx-auto w-[50%]" />
            <h1 className="text-center font-bold dark:text-cs_light">
              Chức năng này chưa được phát triển trên điện thoại vui lòng sử dụng trên máy tính! Xin cảm ơn
            </h1>
            <Link to="/">
              <Button value="Trở về trang chủ" type="button" className="mx-auto my-5" mode="dark" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateEventLayout;
