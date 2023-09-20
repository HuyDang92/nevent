import IonIcon from '@reacticons/ionicons';
import { Link } from 'react-router-dom';

type NavbarMobileProps = {
  className?: string;
};

const NavbarMobile = ({ className }: NavbarMobileProps) => {
  return (
    <>
      <div
        className={`flex w-full items-center justify-around bg-white py-5 text-3xl shadow-border-full sm:hidden ${className}`}
      >
        <Link to="/">
          <IonIcon name="home-outline" className="transition hover:text-cs_purple" />
        </Link>
        <Link to="/">
          <IonIcon name="color-filter-outline" className="transition hover:text-cs_purple" />
        </Link>
        <Link to="/">
          <IonIcon name="add-circle-outline" className="transition hover:text-cs_purple" />
        </Link>
        <Link to="/">
          <IonIcon name="call-outline" className="transition hover:text-cs_purple" />
        </Link>
        <Link to="/">
          <IonIcon name="person-outline" className="transition hover:text-cs_purple" />
        </Link>
      </div>
    </>
  );
};

export default NavbarMobile;
