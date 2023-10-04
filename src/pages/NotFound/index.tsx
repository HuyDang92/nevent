import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bg from 'assets/images/background.png';
import symbol from 'assets/images/symbol.png';
// import logo from 'assets/logo/logo-fpt.png';

function NotFound() {
  // const navigate = useNavigate();

  return (
    <>
      <img src={bg} alt="" className="fixed  h-[100vh] w-[100vw] object-cover" />
      <section className="flex min-h-screen items-center justify-center dark:bg-gray-900">
        <div className="relative">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="dark:text-primary-500 mb-8 text-6xl font-black  tracking-widest text-cs_dark">404</h1>
            <img src={symbol} alt="" />
            <p className="mb-2 text-2xl font-bold tracking-tight text-cs_dark ">Trang bạn truy cập không tồn tại.</p>
            <p className="text-md mb-4 font-light text-gray-500 dark:text-gray-400">Vui lòng kiểm tra lại.</p>
            <Link
              to={'/'}
              className="focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg bg-cs_dark px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="fixed mx-auto h-[100vh] bg-black px-10 pt-5">
        <img src={logo} alt="" className="mx-auto w-40" />
        <h1 class="my-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          Hiện website chưa hỗ trợ cho phiên bản cho màn hình tablet. Vui lòng
          truy cập trên máy tính có trải nghiệm tốt nhất.
          <br />
        </h1>
        <h1 className="my-6 text-center text-3xl">😊😊😊</h1>
        <iframe
          className="mx-auto rounded-2xl"
          width="700"
          height="400"
          src="https://www.youtube.com/embed/yI3dEh0AvxE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </section> */}
    </>
  );
}

export default NotFound;
