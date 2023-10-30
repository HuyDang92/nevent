import { Outlet } from 'react-router-dom';
import CreateEventSidebar from '../components/CreateEventSidebar';
// import NavbarMobile from '~/components/NavbarMobile';

function CreateEventLayout() {
  return (
    <>
      <div className="relative">
        <div className={`mx-auto flex`}>
          <CreateEventSidebar className="" />
          <main className={`w-full bg-cs_semi_green px-2 py-2 dark:bg-cs_dark`}>
            <Outlet />
          </main>
        </div>
      </div>
      {/* <NavbarMobile className="fixed bottom-0 sm:hidden" /> */}
    </>
  );
}

export default CreateEventLayout;
