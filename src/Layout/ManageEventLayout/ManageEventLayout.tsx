import { Outlet } from 'react-router-dom';
import ManageEventSideBar from '../components/ManageEventSideBar';
// import NavbarMobile from '~/components/NavbarMobile';

function ManageEventLayout() {
  return (
    <>
      <div className="relative">
        <div className={`mx-auto flex`}>
          <ManageEventSideBar className="" />
          <main className={`w-full bg-cs_semi_green px-2 py-2 dark:bg-cs_dark`}>
            <Outlet />
          </main>
        </div>
      </div>
      {/* <NavbarMobile className="fixed bottom-0 sm:hidden" /> */}
    </>
  );
}

export default ManageEventLayout;
