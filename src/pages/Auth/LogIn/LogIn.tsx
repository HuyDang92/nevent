import * as Yup from 'yup';
import { Formik, Field, useFormik } from 'formik';
import AuthImage from '~/assets/images/bgLogin.webp';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { Checkbox } from '@material-tailwind/react';
import logoWhite from '~/assets/images/logoWhite.png';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useLogInWithEmailMutation } from '~/features/Auth/authApi.service';
import { isFetchBaseQueryError } from '~/utils/helper';
import { errorNotify } from '~/components/customs/Toast';
import Loading from '~/components/customs/Loading';
import { useDispatch } from 'react-redux';
import { assignNewRefreshToken, assignNewToken, setAuthCurrentUser } from '~/features/Auth/authSlice';
interface ILogin {
  email: string;
  password: string;
}
function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [login, { data, isError, isLoading, error, isSuccess }] = useLogInWithEmailMutation();

  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email không được bỏ trống')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
      password: Yup.string().required('Mật khẩu không được bỏ trống'),
    }),
    onSubmit: async (value: ILogin) => {
      await login({ username: value.email, password: value.password });
      if (isSuccess) {
        console.log(data.data);
        dispatch(setAuthCurrentUser(data.data.user));
        dispatch(assignNewToken(data.data.token.accessToken));
        dispatch(assignNewRefreshToken(data.data.token.refreshToken));
        navigate('/');
        // resetForm();
      }
      if (isError) {
        errorNotify('Đăng nhập thất bại');
      }
    },
  });
  return (
    <>
      {isLoading && <Loading />}
      <div className="relative flex h-screen w-screen flex-row-reverse justify-between ">
        <div className="absolute left-[30px] top-[15px]">
          <Link to={'/'}>
            <div className="flex items-center gap-2 py-3">
              <img src={logoWhite} alt="logo" className="h-[20px] w-[40px]" />
              <span className="text-xl font-black text-cs_light">NEVENT</span>
            </div>
          </Link>
        </div>
        <motion.div
          initial={{ x: -400 }} // Chuyển từ bên trái vào
          animate={{ x: 0 }} // Chạy đến vị trí ban đầu
          transition={{
            duration: 0.5,
            type: 'spring', // Loại hiệu ứng rung lắc
            damping: 15, // Độ nảy của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
            stiffness: 100, // Độ cứng của rung lắc (điều chỉnh để phù hợp với mong muốn của bạn)
          }}
          className="grid w-1/2  place-content-center "
        >
          <div className="w-[400px] space-y-5">
            <div>
              <h1 className="text-center text-2xl font-extrabold text-cs_semi_green dark:text-cs_light">
                CHÀO MỪNG ĐẾN NEVENT!
              </h1>
              <p className=" py-2 text-center text-cs_blur_black">
                Đăng nhập nhanh để có thể sử dụng dịch vụ của Nevent một cách hoàn toàn miễn phí.
              </p>
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-2">
              {errorForm && (
                <small className="px-2 text-center text-[12px] text-red-600">
                  {(errorForm.data as any).message === 'Unauthorized' ? 'Sai tài khoản hoặc mật khẩu' : ''}
                </small>
              )}
              <div className="space-y-1">
                {isSubmitted && formik.errors.email && (
                  <small className="px-2 text-[12px] text-red-600">{formik.errors.email}</small>
                )}
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Username hoặc email"
                  classNameInput={`w-full ${isSubmitted && formik.errors.email && 'border border-red-400'}`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="space-y-1">
                {isSubmitted && formik.errors.password && (
                  <small className="px-2 text-[12px] text-red-600">{formik.errors.password}</small>
                )}
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  classNameInput={`w-full ${isSubmitted && formik.errors.password && 'border border-red-400'}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Checkbox crossOrigin={{}} label="Lưu đăng nhập" className="h-4 w-4" />
                <Link to="/" className="hover:underline dark:text-cs_light">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button
                type="submit"
                onClick={() => setIsSubmitted(true)}
                className="w-full font-normal "
                mode="dark"
                value="Đăng nhập"
              />
            </form>
            <div className="relative flex items-center justify-center gap-4">
              <span className="h-[1px] w-32 rounded-full bg-cs_dark dark:bg-cs_light "></span>
              <span className="dark:text-cs_light">hoặc</span>
              <span className="h-[1px] w-32 rounded-full bg-cs_dark dark:bg-cs_light "></span>
            </div>
            <div className="flex justify-center gap-1">
              <Button className="font-semibold " value="Google" icon="logo-google" />
              <Button className="" value="Facebook" icon="logo-facebook" />
            </div>
            <div className="text-center">
              <span className="text-cs_dark dark:text-cs_light">Bạn chưa có tài khoản? </span>
              <Link to="/signup" className="font-bold text-cs_semi_green hover:underline ">
                Đăng ký
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 400 }} // Chuyển từ bên phải vào
          animate={{ x: 0 }} // Chạy đến vị trí ban đầu
          transition={{ duration: 0.5 }}
          className="h-full w-1/2 p-3"
        >
          <img className="h-full w-full rounded-xl object-cover" src={AuthImage} alt="" />
        </motion.div>
      </div>
    </>
  );
}

export default LogIn;
