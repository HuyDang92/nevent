import { MouseEvent } from 'react';
import Button from '~/components/customs/Button';
import logo from '~/assets/svg/logo-white.svg';
function Home() {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
  };
  return (
    <>
      <Button
        onClick={(e) => onClick(e)}
        icon={logo}
        className="rounded-xl bg-cs_purple text-cs_light"
        value="Login Google"
      ></Button>
    </>
  );
}

export default Home;
